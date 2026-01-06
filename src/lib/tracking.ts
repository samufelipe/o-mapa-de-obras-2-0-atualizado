import { CONFIG } from "./config";

// ============================================
// META PIXEL TRACKING
// Funções para disparar eventos do Facebook/Instagram Ads
// ============================================

// Tipos para o Meta Pixel
declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

// Verifica se o pixel está disponível e habilitado
const isPixelAvailable = (): boolean => {
  return (
    CONFIG.metaPixel.enabled &&
    CONFIG.metaPixel.pixelId !== "PREENCHER_PIXEL_ID" &&
    typeof window !== "undefined" &&
    typeof window.fbq === "function"
  );
};

// Log de debug para tracking
const logTracking = (event: string, params?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 [Meta Pixel] ${event}`, params || "");
  }
};

/**
 * Dispara evento de visualização de página
 * Já é disparado automaticamente pelo script do pixel no index.html
 */
export const trackPageView = (): void => {
  if (!isPixelAvailable()) return;
  
  window.fbq("track", "PageView");
  logTracking("PageView");
};

/**
 * Dispara evento de visualização de conteúdo
 * Use quando o usuário visualizar seções importantes da página
 */
export const trackViewContent = (contentName: string): void => {
  if (!isPixelAvailable()) return;
  
  window.fbq("track", "ViewContent", {
    content_name: contentName,
    content_category: "Workshop",
  });
  logTracking("ViewContent", { content_name: contentName });
};

/**
 * Dispara evento de Lead
 * Use quando o formulário for submetido com sucesso
 */
export const trackLead = (data: {
  name: string;
  email: string;
  phone: string;
}): void => {
  if (!isPixelAvailable()) return;
  
  window.fbq("track", "Lead", {
    content_name: CONFIG.rdStation.conversionIdentifier,
    content_category: "Imersão Cronograma 2.0",
    // Dados hasheados para melhor match rate
    value: 29.90,
    currency: "BRL",
  });
  logTracking("Lead", { content_name: CONFIG.rdStation.conversionIdentifier });
};

/**
 * Dispara evento de início de checkout
 * Use quando o usuário for redirecionado para o Hotmart
 */
export const trackInitiateCheckout = (value: number = 29.90): void => {
  if (!isPixelAvailable()) return;
  
  window.fbq("track", "InitiateCheckout", {
    content_name: CONFIG.rdStation.conversionIdentifier,
    content_category: "Imersão Cronograma 2.0",
    value: value,
    currency: "BRL",
    num_items: 1,
  });
  logTracking("InitiateCheckout", { value, currency: "BRL" });
};

/**
 * Dispara evento customizado
 * Use para tracking de ações específicas
 */
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (!isPixelAvailable()) return;
  
  window.fbq("trackCustom", eventName, params);
  logTracking(eventName, params);
};

/**
 * Dispara evento de scroll até seção
 * Use para medir engajamento com a página
 */
export const trackScrollToSection = (sectionName: string): void => {
  trackCustomEvent("ScrollToSection", { section: sectionName });
};
