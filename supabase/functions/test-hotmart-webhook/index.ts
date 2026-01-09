import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RD_STATION_API_KEY = Deno.env.get("RD_STATION_API_KEY");

// Identificadores de conversão para compra no RD Station
const PURCHASE_CONVERSION_IDENTIFIERS: Record<string, string> = {
  imersao: "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
  mentoria: "mentoria-inovando-na-sua-obra-compra-aprovada",
};

interface TestRequest {
  email: string;
  product?: "imersao" | "mentoria";
  name?: string;
  simulate_only?: boolean; // Se true, não salva no banco nem envia para RD
}

serve(async (req: Request) => {
  console.log("\n========== TEST HOTMART WEBHOOK ==========");
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Apenas POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: TestRequest = await req.json();
    
    console.log("📥 Test request:", JSON.stringify(body, null, 2));

    const { email, product = "imersao", name = "Teste", simulate_only = false } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Campo 'email' é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const transactionId = `TEST-${Date.now()}`;
    
    const result: Record<string, unknown> = {
      test_mode: true,
      simulate_only,
      email: normalizedEmail,
      product,
      transaction_id: transactionId,
    };

    if (simulate_only) {
      console.log("🔍 Modo simulação - apenas verificando dados existentes");
      
      // Buscar intents existentes
      const { data: intents, error } = await supabase
        .from("checkout_intents")
        .select("*")
        .eq("email", normalizedEmail)
        .eq("product", product)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("❌ Erro ao buscar intents:", error);
        result.db_error = error.message;
      } else {
        result.existing_intents = intents?.map(i => ({
          id: i.id,
          status: i.status,
          created_at: i.created_at,
          purchased_at: i.purchased_at,
        })) || [];
        result.pending_intents_count = intents?.filter(i => i.status === "started").length || 0;
      }

      result.message = "Simulação concluída - nenhuma alteração feita";
      
    } else {
      console.log("🚀 Modo execução - processando como compra real");
      
      // 1. Buscar e atualizar intents pendentes
      const { data: intents, error: selectError } = await supabase
        .from("checkout_intents")
        .select("*")
        .eq("email", normalizedEmail)
        .eq("product", product)
        .eq("status", "started");

      if (selectError) {
        console.error("❌ Erro ao buscar intents:", selectError);
        result.db_select_error = selectError.message;
      }

      let updatedIntentIds: string[] = [];
      
      if (intents && intents.length > 0) {
        console.log(`📝 Encontrados ${intents.length} intents pendentes`);
        result.intents_found = intents.length;
        
        const { data: updated, error: updateError } = await supabase
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
          console.error("❌ Erro ao atualizar intents:", updateError);
          result.db_update_error = updateError.message;
        } else {
          updatedIntentIds = updated?.map(i => i.id) || [];
          result.intents_updated = updatedIntentIds.length;
          console.log("✅ Intents atualizados:", updatedIntentIds);
        }
      } else {
        console.log("⚠️ Nenhum intent pendente encontrado, criando registro de auditoria");
        result.intents_found = 0;
        
        const { data: newIntent, error: insertError } = await supabase
          .from("checkout_intents")
          .insert({
            email: normalizedEmail,
            product,
            name,
            status: "purchased",
            purchased_at: new Date().toISOString(),
            hotmart_transaction_id: transactionId,
            page_url: "test-webhook",
          })
          .select("id")
          .single();

        if (insertError) {
          console.error("❌ Erro ao criar registro:", insertError);
          result.db_insert_error = insertError.message;
        } else {
          updatedIntentIds = newIntent ? [newIntent.id] : [];
          result.new_intent_created = newIntent?.id;
          console.log("✅ Novo registro criado:", newIntent?.id);
        }
      }

      // 2. Enviar para RD Station
      if (RD_STATION_API_KEY) {
        const conversionIdentifier = PURCHASE_CONVERSION_IDENTIFIERS[product];
        
        const rdPayload = {
          event_type: "CONVERSION",
          event_family: "CDP",
          payload: {
            conversion_identifier: conversionIdentifier,
            email: normalizedEmail,
            name: name,
            cf_produto: product,
            cf_status_carrinho: "comprado",
            cf_data_compra: new Date().toISOString(),
            cf_transacao_hotmart: transactionId,
            cf_teste: "true",
          },
        };

        console.log("📤 Enviando para RD Station:", {
          email: normalizedEmail,
          conversion: conversionIdentifier,
        });

        try {
          const rdResponse = await fetch(
            `https://api.rd.services/platform/conversions?api_key=${RD_STATION_API_KEY}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify(rdPayload),
            }
          );

          const rdResponseData = await rdResponse.json().catch(() => ({}));
          
          if (rdResponse.ok) {
            console.log("✅ RD Station sucesso:", rdResponseData);
            result.rd_station_success = true;
            result.rd_station_response = rdResponseData;
          } else {
            console.error("❌ RD Station erro:", rdResponse.status, rdResponseData);
            result.rd_station_success = false;
            result.rd_station_error = rdResponseData;
          }
        } catch (rdError) {
          console.error("❌ Erro na requisição RD:", rdError);
          result.rd_station_success = false;
          result.rd_station_error = String(rdError);
        }

        // Atualizar auditoria
        if (updatedIntentIds.length > 0) {
          await supabase
            .from("checkout_intents")
            .update({
              purchase_sent_to_rd_at: new Date().toISOString(),
              purchase_rd_success: result.rd_station_success as boolean,
            })
            .in("id", updatedIntentIds);
        }
      } else {
        console.warn("⚠️ RD_STATION_API_KEY não configurada");
        result.rd_station_success = false;
        result.rd_station_error = "API key não configurada";
      }

      result.message = "Teste executado com sucesso";
    }

    console.log("✅ Resultado do teste:", result);
    console.log("========== FIM TEST WEBHOOK ==========\n");

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("❌ Erro interno:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
