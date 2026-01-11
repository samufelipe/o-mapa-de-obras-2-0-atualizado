import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RD_STATION_API_KEY = Deno.env.get("RD_STATION_API_KEY");

interface Buyer {
  email: string;
  name: string;
  phone?: string;
  transaction_id?: string;
}

interface SyncResult {
  success: string[];
  failed: string[];
  skipped: string[];
  errors: { email: string; error: string }[];
}

serve(async (req: Request) => {
  const requestId = crypto.randomUUID().slice(0, 8);
  console.log(`[${requestId}] 🔄 Sync Purchases to RD Station - Iniciando`);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificar autorização simples (header secreto)
    const authHeader = req.headers.get("x-sync-key");
    if (authHeader !== "sync-imersao-2025") {
      console.error(`[${requestId}] ❌ Chave de autorização inválida`);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verificar se RD Station API Key está configurada
    if (!RD_STATION_API_KEY) {
      console.error(`[${requestId}] ❌ RD_STATION_API_KEY não configurada`);
      return new Response(
        JSON.stringify({ error: "RD Station API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Criar cliente Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Receber lista de compradores
    const { buyers }: { buyers: Buyer[] } = await req.json();
    
    if (!buyers || !Array.isArray(buyers) || buyers.length === 0) {
      return new Response(
        JSON.stringify({ error: "Lista de compradores vazia ou inválida" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[${requestId}] 📋 Processando ${buyers.length} compradores`);

    const results: SyncResult = {
      success: [],
      failed: [],
      skipped: [],
      errors: [],
    };

    // Processar cada comprador
    for (const buyer of buyers) {
      const email = buyer.email?.toLowerCase().trim();
      
      if (!email) {
        console.warn(`[${requestId}] ⚠️ Email inválido, pulando:`, buyer);
        results.failed.push("email_invalido");
        continue;
      }

      try {
        console.log(`[${requestId}] 📤 Processando: ${email}`);

        // Verificar se já existe no banco
        const { data: existing, error: selectError } = await supabase
          .from("checkout_intents")
          .select("*")
          .eq("email", email)
          .eq("product", "imersao")
          .maybeSingle();

        if (selectError) {
          console.error(`[${requestId}] ❌ Erro ao buscar ${email}:`, selectError);
          results.errors.push({ email, error: selectError.message });
          results.failed.push(email);
          continue;
        }

        // Se já foi enviado ao RD, pular
        if (existing?.purchase_sent_to_rd_at) {
          console.log(`[${requestId}] ⏭️ Já enviado ao RD: ${email}`);
          results.skipped.push(email);
          continue;
        }

        // Enviar para RD Station
        console.log(`[${requestId}] 📨 Enviando para RD Station: ${email}`);
        
        const rdPayload = {
          event_type: "CONVERSION",
          event_family: "CDP",
          payload: {
            conversion_identifier: "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
            email: email,
            name: buyer.name || undefined,
            mobile_phone: buyer.phone || undefined,
            cf_produto: "imersao",
            tags: ["compra-aprovada", "imersao", "sync-manual"],
          },
        };

        const rdResponse = await fetch(
          `https://api.rd.services/platform/conversions?api_key=${RD_STATION_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rdPayload),
          }
        );

        const rdSuccess = rdResponse.ok;
        let rdResponseText = "";
        
        try {
          rdResponseText = await rdResponse.text();
        } catch (e) {
          rdResponseText = "Erro ao ler resposta";
        }

        console.log(`[${requestId}] RD Response for ${email}: ${rdResponse.status} - ${rdResponseText}`);

        if (!rdSuccess) {
          console.error(`[${requestId}] ❌ Erro RD Station para ${email}: ${rdResponse.status}`);
          results.errors.push({ email, error: `RD Station: ${rdResponse.status} - ${rdResponseText}` });
          results.failed.push(email);
          continue;
        }

        // Atualizar ou criar registro no banco
        const now = new Date().toISOString();
        
        if (existing) {
          // Atualizar registro existente
          const { error: updateError } = await supabase
            .from("checkout_intents")
            .update({
              status: "purchased",
              purchased_at: existing.purchased_at || now,
              purchase_sent_to_rd_at: now,
              purchase_rd_success: true,
              name: buyer.name || existing.name,
              phone: buyer.phone || existing.phone,
              hotmart_transaction_id: buyer.transaction_id || existing.hotmart_transaction_id,
            })
            .eq("id", existing.id);

          if (updateError) {
            console.error(`[${requestId}] ❌ Erro ao atualizar ${email}:`, updateError);
            results.errors.push({ email, error: `DB Update: ${updateError.message}` });
            // Não adiciona a failed pois já foi enviado ao RD com sucesso
          }
        } else {
          // Criar novo registro
          const { error: insertError } = await supabase
            .from("checkout_intents")
            .insert({
              email: email,
              name: buyer.name || "",
              phone: buyer.phone || "",
              product: "imersao",
              status: "purchased",
              purchased_at: now,
              purchase_sent_to_rd_at: now,
              purchase_rd_success: true,
              hotmart_transaction_id: buyer.transaction_id || null,
              utm_source: "hotmart_sync",
            });

          if (insertError) {
            console.error(`[${requestId}] ❌ Erro ao inserir ${email}:`, insertError);
            results.errors.push({ email, error: `DB Insert: ${insertError.message}` });
            // Não adiciona a failed pois já foi enviado ao RD com sucesso
          }
        }

        console.log(`[${requestId}] ✅ Sucesso: ${email}`);
        results.success.push(email);

        // Pequeno delay para não sobrecarregar a API do RD
        await new Promise((resolve) => setTimeout(resolve, 200));

      } catch (error) {
        console.error(`[${requestId}] ❌ Erro inesperado para ${email}:`, error);
        results.errors.push({ email, error: error instanceof Error ? error.message : "Erro desconhecido" });
        results.failed.push(email);
      }
    }

    // Resumo final
    console.log(`[${requestId}] 📊 RESUMO:`);
    console.log(`[${requestId}]   ✅ Sucesso: ${results.success.length}`);
    console.log(`[${requestId}]   ⏭️ Pulados (já enviados): ${results.skipped.length}`);
    console.log(`[${requestId}]   ❌ Falhas: ${results.failed.length}`);

    return new Response(
      JSON.stringify({
        message: "Sincronização concluída",
        summary: {
          total: buyers.length,
          success: results.success.length,
          skipped: results.skipped.length,
          failed: results.failed.length,
        },
        details: results,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error(`[${requestId}] ❌ Erro fatal:`, error);
    return new Response(
      JSON.stringify({ 
        error: "Erro interno", 
        details: error instanceof Error ? error.message : "Erro desconhecido" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
