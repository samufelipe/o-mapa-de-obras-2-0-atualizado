import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ABANDONMENT_THRESHOLD_MINUTES = 10;
const MAX_REPORTANA_ATTEMPTS = 3;
const REPORTANA_WEBHOOK_URL = Deno.env.get("REPORTANA_WEBHOOK_URL");

interface CheckoutIntent {
  id: string;
  product: "imersao" | "mentoria";
  email: string;
  name: string | null;
  phone: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  status: string;
  created_at: string;
  rd_attempts: number;
}

async function sendToReportana(intent: CheckoutIntent): Promise<{ success: boolean; response?: unknown; error?: string }> {
  if (!REPORTANA_WEBHOOK_URL) {
    console.warn("⚠️ REPORTANA_WEBHOOK_URL não configurada");
    return { success: false, error: "URL do Reportana não configurada" };
  }

  const productName = intent.product === "imersao"
    ? "Imersão Cronograma 2.0 - O Mapa da Obra de Interiores"
    : "Mentoria Inovando na Sua Obra";

  const payload = {
    event: "PURCHASE_ABANDONED",
    data: {
      buyer: {
        email: intent.email,
        name: intent.name || "",
        phone: intent.phone || "",
      },
      product: {
        name: productName,
      },
      purchase: {
        status: "abandoned",
      },
    },
  };

  console.log("📤 Enviando para Reportana:", {
    email: intent.email,
    product: intent.product,
    phone: intent.phone ? "presente" : "ausente",
  });

  try {
    const response = await fetch(REPORTANA_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let responseData: unknown;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (response.ok) {
      console.log("✅ Enviado para Reportana com sucesso");
      return { success: true, response: responseData };
    }

    console.error("❌ Erro do Reportana:", response.status, responseData);
    return { success: false, error: `Erro ${response.status}`, response: responseData };

  } catch (error) {
    console.error("❌ Erro ao enviar para Reportana:", error);
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" };
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      console.warn("⚠️ Requisição sem autenticação rejeitada");
      return new Response(
        JSON.stringify({ error: "Unauthorized - Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("🔍 Iniciando varredura de abandonos...");

    const thresholdTime = new Date();
    thresholdTime.setMinutes(thresholdTime.getMinutes() - ABANDONMENT_THRESHOLD_MINUTES);

    const { data: intents, error: selectError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("status", "started")
      .lt("created_at", thresholdTime.toISOString())
      .or(`sent_to_rd_at.is.null,rd_attempts.lt.${MAX_REPORTANA_ATTEMPTS}`)
      .order("created_at", { ascending: true })
      .limit(50);

    if (selectError) {
      console.error("❌ Erro ao buscar intents:", selectError);
      return new Response(
        JSON.stringify({ error: "Erro ao buscar intents", details: selectError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!intents || intents.length === 0) {
      console.log("✅ Nenhum abandono para processar");
      return new Response(
        JSON.stringify({ success: true, processed: 0, message: "Nenhum abandono para processar" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`📝 Encontrados ${intents.length} intents para processar`);

    let processed = 0;
    let errors = 0;

    for (const intent of intents as CheckoutIntent[]) {
      console.log(`\n--- Processando intent ${intent.id} ---`);
      console.log(`Email: ${intent.email}, Produto: ${intent.product}, Tentativas: ${intent.rd_attempts}`);

      // Double-check: pode ter comprado entre a query e agora
      const { data: currentIntent } = await supabase
        .from("checkout_intents")
        .select("status")
        .eq("id", intent.id)
        .single();

      if (currentIntent?.status === "purchased") {
        console.log("ℹ️ Intent já foi marcado como purchased, pulando");
        continue;
      }

      const reportanaResult = await sendToReportana(intent);

      const updateData: Record<string, unknown> = {
        rd_attempts: (intent.rd_attempts || 0) + 1,
        rd_response: reportanaResult.response || { error: reportanaResult.error },
      };

      if (reportanaResult.success) {
        updateData.status = "abandoned";
        updateData.sent_to_rd_at = new Date().toISOString();
        processed++;
      } else {
        errors++;
      }

      const { error: updateError } = await supabase
        .from("checkout_intents")
        .update(updateData)
        .eq("id", intent.id);

      if (updateError) {
        console.error("❌ Erro ao atualizar intent:", updateError);
      }
    }

    console.log(`\n✅ Varredura concluída: ${processed} processados, ${errors} erros`);

    return new Response(
      JSON.stringify({
        success: true,
        processed,
        errors,
        total: intents.length,
        message: `Processados ${processed} abandonos com ${errors} erros`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("❌ Erro interno:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});