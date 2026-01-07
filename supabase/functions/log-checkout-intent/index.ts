import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutIntentRequest {
  product: "imersao" | "mentoria";
  email: string;
  name?: string;
  phone?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  page_url?: string;
}

// Envia lead para RD Station
async function sendToRDStation(data: CheckoutIntentRequest): Promise<{ success: boolean; response?: any; error?: string }> {
  const rdApiKey = Deno.env.get("RD_STATION_API_KEY");
  
  if (!rdApiKey) {
    console.warn("⚠️ RD_STATION_API_KEY não configurada");
    return { success: false, error: "API key não configurada" };
  }

  const conversionIdentifier = data.product === "imersao" 
    ? "checkout-imersao" 
    : "checkout-mentoria";

  const payload = {
    event_type: "CONVERSION",
    event_family: "CDP",
    payload: {
      conversion_identifier: conversionIdentifier,
      email: data.email.toLowerCase().trim(),
      name: data.name || undefined,
      mobile_phone: data.phone || undefined,
      cf_produto: data.product,
      traffic_source: data.utm_source || "direct",
      traffic_medium: data.utm_medium || undefined,
      traffic_campaign: data.utm_campaign || undefined,
      traffic_value: data.utm_content || undefined,
      tags: [`checkout-${data.product}`, "carrinho-abandonado-potencial"],
    },
  };

  try {
    console.log("📤 Enviando para RD Station:", { 
      email: data.email, 
      conversion: conversionIdentifier 
    });

    const response = await fetch(
      `https://api.rd.services/platform/conversions?api_key=${rdApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (!response.ok) {
      console.error("❌ RD Station erro:", response.status, responseData);
      return { success: false, error: `Status ${response.status}`, response: responseData };
    }

    console.log("✅ RD Station sucesso:", responseData);
    return { success: true, response: responseData };
  } catch (error) {
    console.error("❌ RD Station exception:", error);
    return { success: false, error: String(error) };
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

    const body: CheckoutIntentRequest = await req.json();
    
    console.log("📥 Recebendo checkout intent:", {
      email: body.email,
      product: body.product,
      utm_source: body.utm_source,
    });

    // Validações
    if (!body.email || !body.product) {
      return new Response(
        JSON.stringify({ error: "Email e produto são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!["imersao", "mentoria"].includes(body.product)) {
      return new Response(
        JSON.stringify({ error: "Produto inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Enviar para RD Station primeiro
    const rdResult = await sendToRDStation(body);

    // Salvar no banco de dados
    const today = new Date().toISOString().split("T")[0];
    
    const { data, error } = await supabase
      .from("checkout_intents")
      .upsert(
        {
          email: body.email.toLowerCase().trim(),
          product: body.product,
          name: body.name || null,
          phone: body.phone || null,
          utm_source: body.utm_source || "direct",
          utm_medium: body.utm_medium || null,
          utm_campaign: body.utm_campaign || null,
          utm_content: body.utm_content || null,
          utm_term: body.utm_term || null,
          page_url: body.page_url || null,
          intent_date: today,
          status: "started",
          sent_to_rd_at: rdResult.success ? new Date().toISOString() : null,
          rd_response: rdResult.response || rdResult.error || null,
          rd_attempts: 1,
        },
        {
          onConflict: "email,product,intent_date",
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (error) {
      console.error("❌ Erro ao inserir checkout intent:", error);
      return new Response(
        JSON.stringify({ error: "Erro ao registrar intent", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Checkout intent registrado:", {
      id: data.id,
      email: data.email,
      product: data.product,
      status: data.status,
      rd_sent: rdResult.success,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        intent_id: data.id,
        rd_station: rdResult.success,
        message: "Checkout intent registrado com sucesso" 
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
