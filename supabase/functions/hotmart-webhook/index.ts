import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-hotmart-hottok",
};

// Token de segurança do webhook Hotmart (opcional)
const HOTMART_HOTTOK = Deno.env.get("HOTMART_HOTTOK");

interface HotmartWebhookPayload {
  event?: string;
  data?: {
    buyer?: {
      email?: string;
      name?: string;
      phone?: string;
    };
    product?: {
      id?: number;
      name?: string;
    };
    purchase?: {
      status?: string;
      transaction?: string;
    };
  };
  // Formato alternativo do Pluga
  buyer_email?: string;
  buyer_name?: string;
  product_name?: string;
  status?: string;
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

    // Validar token Hotmart se configurado
    if (HOTMART_HOTTOK) {
      const hottok = req.headers.get("x-hotmart-hottok");
      if (hottok !== HOTMART_HOTTOK) {
        console.warn("⚠️ Token Hotmart inválido");
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const body: HotmartWebhookPayload = await req.json();
    
    console.log("📥 Webhook Hotmart recebido:", JSON.stringify(body, null, 2));

    // Extrair dados (suporta formato direto Hotmart e Pluga)
    const email = body.data?.buyer?.email || body.buyer_email;
    const buyerName = body.data?.buyer?.name || body.buyer_name;
    const productName = body.data?.product?.name || body.product_name;
    const event = body.event || "PURCHASE_APPROVED";
    const status = body.data?.purchase?.status || body.status || "approved";

    if (!email) {
      console.warn("⚠️ Webhook sem email do comprador");
      return new Response(
        JSON.stringify({ error: "Email do comprador não encontrado" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verificar se é uma compra aprovada
    const isApproved = 
      event === "PURCHASE_APPROVED" || 
      event === "PURCHASE_COMPLETE" ||
      status === "approved" ||
      status === "complete";

    if (!isApproved) {
      console.log("ℹ️ Evento não é compra aprovada, ignorando:", event, status);
      return new Response(
        JSON.stringify({ success: true, message: "Evento ignorado" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Determinar produto baseado no nome
    let product: "imersao" | "mentoria" = "imersao";
    if (productName) {
      const nameLower = productName.toLowerCase();
      if (nameLower.includes("mentoria") || nameLower.includes("inovando")) {
        product = "mentoria";
      }
    }

    console.log("🔍 Buscando checkout intents para:", {
      email: email.toLowerCase(),
      product,
    });

    // Buscar e marcar como purchased todos os intents pendentes deste email/produto
    const { data: intents, error: selectError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .eq("product", product)
      .eq("status", "started");

    if (selectError) {
      console.error("❌ Erro ao buscar intents:", selectError);
    }

    if (intents && intents.length > 0) {
      console.log(`📝 Encontrados ${intents.length} intents para marcar como purchased`);
      
      const { error: updateError } = await supabase
        .from("checkout_intents")
        .update({ status: "purchased" })
        .eq("email", email.toLowerCase().trim())
        .eq("product", product)
        .eq("status", "started");

      if (updateError) {
        console.error("❌ Erro ao atualizar intents:", updateError);
      } else {
        console.log("✅ Intents marcados como purchased");
      }
    } else {
      console.log("ℹ️ Nenhum intent pendente encontrado para este email/produto");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Webhook processado",
        intents_updated: intents?.length || 0,
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
