import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-hotmart-hottok",
};

const HOTMART_HOTTOK = Deno.env.get("HOTMART_HOTTOK");
const DEBUG_MODE = Deno.env.get("HOTMART_DEBUG_MODE") === "true";

interface HotmartWebhookPayload {
  event?: string;
  data?: {
    buyer?: { email?: string; name?: string; phone?: string };
    product?: { id?: number; name?: string };
    purchase?: { status?: string; transaction?: string; order_date?: string };
  };
  buyer?: { email?: string; name?: string };
  product?: { id?: number; name?: string };
  purchase?: { status?: string; transaction?: string };
  buyer_email?: string;
  buyer_name?: string;
  product_name?: string;
  status?: string;
  transaction?: string;
  hottok?: string;
}

serve(async (req: Request) => {
  const requestId = crypto.randomUUID().slice(0, 8);
  console.log(`\n========== [${requestId}] HOTMART WEBHOOK RECEBIDO ==========`);
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = key.toLowerCase().includes("hottok") ? "***REDACTED***" : value;
    });
    console.log(`[${requestId}] 📋 Headers:`, JSON.stringify(headers, null, 2));

    const rawBody = await req.text();
    console.log(`[${requestId}] 📦 Raw body length: ${rawBody.length} chars`);

    let body: HotmartWebhookPayload;
    try {
      body = JSON.parse(rawBody);
      console.log(`[${requestId}] 📥 Payload parsed:`, JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error(`[${requestId}] ❌ Erro ao parsear JSON:`, parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const headerHottok = req.headers.get("x-hotmart-hottok");
    const bodyHottok = body.hottok;
    const receivedHottok = headerHottok || bodyHottok;

    if (DEBUG_MODE) {
      console.warn(`[${requestId}] ⚠️ DEBUG MODE ATIVO - aceitando sem validar token`);
    } else {
      if (!HOTMART_HOTTOK) {
        console.error(`[${requestId}] ❌ HOTMART_HOTTOK não configurado`);
        return new Response(
          JSON.stringify({ error: "Webhook não configurado corretamente" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!receivedHottok || receivedHottok !== HOTMART_HOTTOK) {
        console.warn(`[${requestId}] ⚠️ Token Hotmart inválido ou ausente`);
        return new Response(
          JSON.stringify({ error: "Unauthorized - Invalid or missing Hotmart token" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.log(`[${requestId}] ✅ Token Hotmart válido`);
    }

    const email =
      body.data?.buyer?.email ||
      body.buyer?.email ||
      body.buyer_email;

    const buyerName =
      body.data?.buyer?.name ||
      body.buyer?.name ||
      body.buyer_name;

    const productName =
      body.data?.product?.name ||
      body.product?.name ||
      body.product_name;

    const event = body.event || "PURCHASE_APPROVED";

    const status =
      body.data?.purchase?.status ||
      body.purchase?.status ||
      body.status ||
      "approved";

    const transactionId =
      body.data?.purchase?.transaction ||
      body.purchase?.transaction ||
      body.transaction ||
      null;

    console.log(`[${requestId}] 📊 Dados extraídos:`, {
      email: email || "NÃO ENCONTRADO",
      buyerName: buyerName || "não informado",
      productName: productName || "não informado",
      event,
      status,
      transactionId: transactionId || "não informado",
    });

    if (!email) {
      console.error(`[${requestId}] ❌ Email do comprador não encontrado no payload`);
      return new Response(
        JSON.stringify({ error: "Email do comprador não encontrado" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const approvedEvents = ["PURCHASE_APPROVED", "PURCHASE_COMPLETE", "PURCHASE_BILLET_PRINTED"];
    const approvedStatuses = ["approved", "complete", "completed", "paid"];

    const isApproved =
      approvedEvents.includes(event.toUpperCase()) ||
      approvedStatuses.includes(status.toLowerCase());

    if (!isApproved) {
      console.log(`[${requestId}] ℹ️ Evento não é compra aprovada, ignorando:`, { event, status });
      return new Response(
        JSON.stringify({ success: true, message: "Evento ignorado", event, status }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[${requestId}] ✅ Evento de compra aprovada identificado`);

    let product: "imersao" | "mentoria" = "imersao";
    if (productName) {
      const nameLower = productName.toLowerCase();
      if (nameLower.includes("mentoria") || nameLower.includes("inovando")) {
        product = "mentoria";
      }
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log(`[${requestId}] 🔍 Buscando checkout intents para:`, { email: normalizedEmail, product });

    const { data: intents, error: selectError } = await supabase
      .from("checkout_intents")
      .select("*")
      .eq("email", normalizedEmail)
      .eq("product", product)
      .eq("status", "started");

    if (selectError) {
      console.error(`[${requestId}] ❌ Erro ao buscar intents:`, selectError);
    }

    let updatedIntentIds: string[] = [];
    let intentFound = false;

    if (intents && intents.length > 0) {
      intentFound = true;
      console.log(`[${requestId}] 📝 Encontrados ${intents.length} intents para marcar como purchased`);

      const { data: updatedIntents, error: updateError } = await supabase
        .from("checkout_intents")
        .update({
          status: "purchased",
          purchased_at: new Date().toISOString(),
          hotmart_transaction_id: transactionId,
        })
        .eq("email", normalizedEmail)
        .eq("product", product)
        .eq("status", "started")
        .select("id");

      if (updateError) {
        console.error(`[${requestId}] ❌ Erro ao atualizar intents:`, updateError);
      } else {
        console.log(`[${requestId}] ✅ Intents marcados como purchased`);
        updatedIntentIds = updatedIntents?.map((i: { id: string }) => i.id) || [];
      }
    } else {
      console.log(`[${requestId}] ⚠️ Nenhum intent pendente — criando registro de auditoria`);

      const { data: newIntent, error: insertError } = await supabase
        .from("checkout_intents")
        .insert({
          email: normalizedEmail,
          product,
          name: buyerName || null,
          status: "purchased",
          purchased_at: new Date().toISOString(),
          hotmart_transaction_id: transactionId,
          page_url: "hotmart-webhook-direct",
        })
        .select("id")
        .single();

      if (insertError) {
        console.error(`[${requestId}] ❌ Erro ao criar registro de auditoria:`, insertError);
      } else {
        console.log(`[${requestId}] ✅ Registro de auditoria criado:`, newIntent?.id);
        updatedIntentIds = newIntent ? [newIntent.id] : [];
      }
    }

    const result = {
      success: true,
      request_id: requestId,
      message: "Webhook processado com sucesso",
      email: normalizedEmail,
      product,
      intent_found: intentFound,
      intents_updated: updatedIntentIds.length,
      transaction_id: transactionId,
    };

    console.log(`[${requestId}] ✅ WEBHOOK PROCESSADO:`, result);
    console.log(`========== [${requestId}] FIM ==========\n`);

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error(`[${requestId}] ❌ Erro interno:`, error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor", request_id: requestId }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});