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

    // Tentar inserir ou atualizar (upsert baseado em email+produto+data)
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
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        intent_id: data.id,
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
