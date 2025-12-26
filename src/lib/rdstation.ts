import { CONFIG } from "./config";

// ============================================
// RD STATION MARKETING INTEGRATION
// Serviço para envio de leads para o RD Station
// ============================================

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  // Campos opcionais
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export interface RDStationResponse {
  success: boolean;
  message: string;
}

/**
 * Captura os parâmetros UTM da URL atual
 */
export const getUtmParams = (): Partial<LeadData> => {
  if (typeof window === "undefined") return {};
  
  const params = new URLSearchParams(window.location.search);
  
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
    utmTerm: params.get("utm_term") || undefined,
  };
};

/**
 * Envia os dados do lead para o RD Station via Webhook
 */
export const submitToRDStation = async (
  data: LeadData
): Promise<RDStationResponse> => {
  const { webhookUrl, conversionIdentifier, tags } = CONFIG.rdStation;
  
  // Verificar se o webhook está configurado
  if (webhookUrl === "PREENCHER_WEBHOOK_RD_STATION") {
    console.warn("⚠️ RD Station Webhook não configurado");
    // Em desenvolvimento, simular sucesso
    if (process.env.NODE_ENV === "development") {
      console.log("📤 [DEV] Simulando envio para RD Station:", data);
      return { success: true, message: "Simulação de envio (dev mode)" };
    }
    return { success: false, message: "Webhook não configurado" };
  }
  
  // Capturar UTMs da URL
  const utmParams = getUtmParams();
  
  // Montar payload para o RD Station
  const payload = {
    // Identificador da conversão
    conversion_identifier: conversionIdentifier,
    
    // Dados do lead
    name: data.name,
    email: data.email,
    personal_phone: data.phone,
    mobile_phone: data.phone,
    
    // Tags para segmentação
    tags: tags,
    
    // UTMs para rastreamento de origem
    traffic_source: utmParams.utmSource || "direct",
    traffic_medium: utmParams.utmMedium,
    traffic_campaign: utmParams.utmCampaign,
    traffic_value: utmParams.utmContent,
    
    // Campos customizados
    cf_utm_source: utmParams.utmSource,
    cf_utm_medium: utmParams.utmMedium,
    cf_utm_campaign: utmParams.utmCampaign,
    cf_utm_content: utmParams.utmContent,
    cf_utm_term: utmParams.utmTerm,
    cf_pagina_origem: typeof window !== "undefined" ? window.location.href : "",
    cf_data_inscricao: new Date().toISOString(),
  };
  
  try {
    console.log("📤 Enviando lead para RD Station...", { 
      email: data.email,
      conversion: conversionIdentifier 
    });
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // RD Station pode não aceitar CORS
      body: JSON.stringify(payload),
    });
    
    // Com no-cors não temos acesso ao status real
    // Assumimos sucesso se não houver erro
    console.log("✅ Lead enviado para RD Station com sucesso");
    
    return {
      success: true,
      message: "Lead registrado com sucesso",
    };
  } catch (error) {
    console.error("❌ Erro ao enviar para RD Station:", error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao enviar dados",
    };
  }
};

/**
 * Formata o número de telefone para o padrão do RD Station
 * Remove caracteres especiais e mantém apenas números
 */
export const formatPhoneForRD = (phone: string): string => {
  return phone.replace(/\D/g, "");
};
