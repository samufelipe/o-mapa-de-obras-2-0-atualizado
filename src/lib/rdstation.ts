import { supabase } from "@/integrations/supabase/client";

// ============================================
// RD STATION MARKETING INTEGRATION
// Os leads são enviados via edge function (server-side)
// para proteger a API key
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
 * Envia os dados do lead para o RD Station via edge function
 * A API key é mantida segura no backend
 */
export const submitToRDStation = async (
  data: LeadData
): Promise<RDStationResponse> => {
  // Capturar UTMs da URL
  const utmParams = getUtmParams();
  
  try {
    console.log("📤 Enviando lead via edge function...", { 
      email: data.email,
    });
    
    const { data: response, error } = await supabase.functions.invoke('log-checkout-intent', {
      body: {
        product: "imersao", // Default product
        email: data.email,
        name: data.name,
        phone: data.phone,
        utm_source: utmParams.utmSource || "direct",
        utm_medium: utmParams.utmMedium,
        utm_campaign: utmParams.utmCampaign,
        utm_content: utmParams.utmContent,
        utm_term: utmParams.utmTerm,
        page_url: typeof window !== "undefined" ? window.location.href : "",
      }
    });
    
    if (error) {
      console.error("❌ Erro ao enviar lead:", error);
      return {
        success: false,
        message: error.message || "Erro ao enviar dados",
      };
    }
    
    console.log("✅ Lead registrado com sucesso");
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
