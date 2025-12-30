import { CONFIG } from "./config";

// ============================================
// RD STATION MARKETING INTEGRATION
// Usando API de Conversões (método oficial)
// Documentação: https://developers.rdstation.com/reference/conversao
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
 * Envia os dados do lead para o RD Station via API de Conversões
 */
export const submitToRDStation = async (
  data: LeadData
): Promise<RDStationResponse> => {
  const { apiKey, conversionIdentifier } = CONFIG.rdStation;
  
  // Verificar se a API Key está configurada
  if (apiKey === "PREENCHER_API_KEY_RD_STATION") {
    console.warn("⚠️ RD Station API Key não configurada");
    // Em desenvolvimento, simular sucesso
    if (import.meta.env.DEV) {
      console.log("📤 [DEV] Simulando envio para RD Station:", data);
      return { success: true, message: "Simulação de envio (dev mode)" };
    }
    return { success: false, message: "API Key não configurada" };
  }
  
  // Capturar UTMs da URL
  const utmParams = getUtmParams();
  
  // Montar payload no formato da API de Conversões do RD Station
  const payload = {
    event_type: "CONVERSION",
    event_family: "CDP",
    payload: {
      conversion_identifier: conversionIdentifier,
      name: data.name,
      email: data.email,
      personal_phone: formatPhoneForRD(data.phone),
      mobile_phone: formatPhoneForRD(data.phone),
      
      // Campos customizados para UTMs
      cf_utm_source: utmParams.utmSource || "direct",
      cf_utm_medium: utmParams.utmMedium || "",
      cf_utm_campaign: utmParams.utmCampaign || "",
      cf_utm_content: utmParams.utmContent || "",
      cf_utm_term: utmParams.utmTerm || "",
      cf_pagina_origem: typeof window !== "undefined" ? window.location.href : "",
      cf_data_inscricao: new Date().toISOString(),
    },
  };
  
  const apiUrl = `https://api.rd.services/platform/conversions?api_key=${apiKey}`;
  
  try {
    console.log("📤 Enviando lead para RD Station...", { 
      email: data.email,
      conversion: conversionIdentifier 
    });
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (response.ok) {
      console.log("✅ Lead enviado para RD Station com sucesso");
      return {
        success: true,
        message: "Lead registrado com sucesso",
      };
    }
    
    // Tratar erros da API
    const errorData = await response.json().catch(() => ({}));
    console.error("❌ Erro da API do RD Station:", response.status, errorData);
    
    if (response.status === 401) {
      return { success: false, message: "API Key inválida" };
    }
    
    if (response.status === 400 || response.status === 422) {
      return { success: false, message: "Dados inválidos enviados para RD Station" };
    }
    
    return { success: false, message: `Erro ${response.status} ao enviar dados` };
    
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
