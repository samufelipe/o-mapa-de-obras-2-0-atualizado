import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Configurações
const ABANDONMENT_THRESHOLD_MINUTES = 15; // Considerar abandonado após 15 minutos
const RD_STATION_API_KEY = Deno.env.get("RD_STATION_API_KEY");
const MAX_RD_ATTEMPTS = 3;

// Identificadores de conversão no RD Station
const CONVERSION_IDENTIFIERS = {
  imersao: "carrinho-abandonado-imersao",
  mentoria: "carrinho-abandonado-mentoria",
};

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

async function sendToRDStation(intent: CheckoutIntent): Promise<{ success: boolean; response?: unknown; error?: string }> {
  if (!RD_STATION_API_KEY) {
    console.warn("⚠️ RD_STATION_API_KEY não configurada");
    return { success: false, error: "API Key não configurada" };
  }

  const conversionIdentifier = CONVERSION_IDENTIFIERS[intent.product];
  
  const payload = {
    event_type: "CONVERSION",
    event_family: "CDP",
    payload: {
      conversion_identifier: conversionIdentifier,
      email: intent.email,
      name: intent.name || "",
      personal_phone: intent.phone || "",
      mobile_phone: intent.phone || "",
      cf_utm_source: intent.utm_source || "direct",
      cf_utm_medium: intent.utm_medium || "",
      cf_utm_campaign: intent.utm_campaign || "",
      cf_utm_content: intent.utm_content || "",
      cf_utm_term: intent.utm_term || "",
      cf_produto: intent.product,
      cf_status_carrinho: "abandonado",
      cf_data_abandono: new Date().toISOString(),
    },
  };

  console.log("📤 Enviando para RD Station:", {
    email: intent.email,
    conversion: conversionIdentifier,
    product: intent.product,
  });

  try {
    const response = await fetch(
      `https://api.rd.services/platform/conversions?api_key=${RD_STATION_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Enviado para RD Station com sucesso");
      return { success: true, response: data };
    }

    const errorData = await response.json().catch(() => ({}));
    console.error("❌ Erro da API RD Station:", response.status, errorData);
    return { success: false, error: `Erro ${response.status}`, response: errorData };

  } catch (error) {
    console.error("❌ Erro ao enviar para RD Station:", error);
    return { success: false, error: error instanceof Error ? error.message : "Erro desconhecido" };
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("🔍 Iniciando varredura de abandonos...");

    // Calcular threshold de tempo
    const thresholdTime = new Date();
    thresholdTime.setMinutes(thresholdTime.getMinutes() - ABANDONMENT_THRESHOLD_MINUTES);

    // Buscar intents que:
    // 1. Status = 'started'
    // 2. Criados há mais de X minutos
    // 3. Ainda não enviados ao RD ou com menos de MAX tentativas
    const { data: intents, error: selectError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("status", "started")
      .lt("created_at", thresholdTime.toISOString())
      .or(`sent_to_rd_at.is.null,rd_attempts.lt.${MAX_RD_ATTEMPTS}`)
      .order("created_at", { ascending: true })
      .limit(50); // Processar em lotes

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

      // Verificar se já foi comprado (double-check)
      const { data: currentIntent } = await supabase
        .from("checkout_intents")
        .select("status")
        .eq("id", intent.id)
        .single();

      if (currentIntent?.status === "purchased") {
        console.log("ℹ️ Intent já foi marcado como purchased, pulando");
        continue;
      }

      // Enviar para RD Station
      const rdResult = await sendToRDStation(intent);

      // Atualizar registro
      const updateData: Record<string, unknown> = {
        rd_attempts: (intent.rd_attempts || 0) + 1,
        rd_response: rdResult.response || { error: rdResult.error },
      };

      if (rdResult.success) {
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
        message: `Processados ${processed} abandonos com ${errors} erros` 
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
