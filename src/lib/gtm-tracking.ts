// ============================================
// GOOGLE TAG MANAGER - TRACKING EVENTS
// Sistema completo de rastreamento para GTM
// ============================================

// Tipos para o dataLayer
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

// Inicializar dataLayer
if (typeof window !== "undefined") {
  window.dataLayer = window.dataLayer || [];
}

/**
 * Push genérico para o dataLayer
 */
export const pushToDataLayer = (data: Record<string, unknown>): void => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(data);
    console.log("📊 [GTM]", data);
  }
};

// ============================================
// EVENTOS DE FORMULÁRIO
// ============================================

/**
 * Evento quando o usuário foca em um campo do formulário
 */
export const trackFormFieldFocus = (fieldName: string): void => {
  pushToDataLayer({
    event: "form_field_focus",
    form_name: "lead_form",
    field_name: fieldName,
  });
};

/**
 * Evento quando o usuário preenche um campo do formulário
 */
export const trackFormFieldComplete = (fieldName: string): void => {
  pushToDataLayer({
    event: "form_field_complete",
    form_name: "lead_form",
    field_name: fieldName,
  });
};

/**
 * Evento quando o usuário inicia o preenchimento do formulário
 */
export const trackFormStart = (): void => {
  pushToDataLayer({
    event: "form_start",
    form_name: "lead_form",
  });
};

/**
 * Evento quando o formulário é submetido com sucesso
 */
export const trackFormSubmit = (data: {
  name: string;
  email: string;
  phone: string;
}): void => {
  pushToDataLayer({
    event: "form_submit",
    form_name: "lead_form",
    form_status: "success",
    // Não enviar dados sensíveis completos - apenas indicadores
    has_name: !!data.name,
    has_email: !!data.email,
    has_phone: !!data.phone,
  });
};

/**
 * Evento quando há erro de validação no formulário
 */
export const trackFormError = (errors: Record<string, string>): void => {
  pushToDataLayer({
    event: "form_error",
    form_name: "lead_form",
    error_fields: Object.keys(errors),
    error_count: Object.keys(errors).length,
  });
};

// ============================================
// EVENTOS DE CLIQUE
// ============================================

/**
 * Evento de clique em CTA (Call-to-Action)
 */
export const trackCTAClick = (
  ctaName: string,
  ctaLocation: string,
  ctaText?: string
): void => {
  pushToDataLayer({
    event: "cta_click",
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_text: ctaText,
  });
};

/**
 * Evento de clique em link de navegação
 */
export const trackNavClick = (linkName: string, linkHref: string): void => {
  pushToDataLayer({
    event: "nav_click",
    link_name: linkName,
    link_href: linkHref,
  });
};

/**
 * Evento de clique em elemento do FAQ
 */
export const trackFAQClick = (question: string, isOpen: boolean): void => {
  pushToDataLayer({
    event: "faq_interaction",
    faq_question: question,
    faq_action: isOpen ? "open" : "close",
  });
};

// ============================================
// EVENTOS DE SCROLL E VISUALIZAÇÃO
// ============================================

/**
 * Evento quando uma seção entra na viewport
 */
export const trackSectionView = (sectionName: string): void => {
  pushToDataLayer({
    event: "section_view",
    section_name: sectionName,
  });
};

/**
 * Evento de profundidade de scroll
 */
export const trackScrollDepth = (percentage: number): void => {
  pushToDataLayer({
    event: "scroll_depth",
    scroll_percentage: percentage,
  });
};

// ============================================
// EVENTOS DE CONVERSÃO
// ============================================

/**
 * Evento de lead gerado
 */
export const trackLeadGenerated = (source: string): void => {
  pushToDataLayer({
    event: "generate_lead",
    lead_source: source,
    currency: "BRL",
    value: 39.90,
  });
};

/**
 * Evento de início de checkout
 */
export const trackBeginCheckout = (
  value: number = 39.90,
  itemName: string = "Cronograma O Mapa de Obras 2.0"
): void => {
  pushToDataLayer({
    event: "begin_checkout",
    currency: "BRL",
    value,
    items: [{
      item_name: itemName,
      item_category: "Workshop",
      price: value,
      quantity: 1,
    }],
  });
};

/**
 * Evento de visualização de conteúdo (página)
 */
export const trackPageView = (pageName: string): void => {
  pushToDataLayer({
    event: "page_view",
    page_name: pageName,
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_title: typeof document !== "undefined" ? document.title : "",
  });
};

// ============================================
// EVENTOS DE ENGAJAMENTO
// ============================================

/**
 * Evento de tempo na página
 */
export const trackTimeOnPage = (seconds: number): void => {
  pushToDataLayer({
    event: "time_on_page",
    time_seconds: seconds,
  });
};

/**
 * Evento de interação com vídeo (se houver)
 */
export const trackVideoInteraction = (
  action: "play" | "pause" | "complete",
  videoName: string,
  currentTime?: number
): void => {
  pushToDataLayer({
    event: "video_interaction",
    video_action: action,
    video_name: videoName,
    video_current_time: currentTime,
  });
};

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Rastrear cliques em elementos com data-track attribute
 */
export const initClickTracking = (): void => {
  if (typeof document === "undefined") return;

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const trackableElement = target.closest("[data-track]");
    
    if (trackableElement) {
      const trackData = trackableElement.getAttribute("data-track");
      const trackLocation = trackableElement.getAttribute("data-track-location") || "unknown";
      const trackText = trackableElement.textContent?.trim() || "";
      
      if (trackData) {
        trackCTAClick(trackData, trackLocation, trackText);
      }
    }
  });
};

/**
 * Rastrear scroll depth (25%, 50%, 75%, 100%)
 */
export const initScrollTracking = (): void => {
  if (typeof window === "undefined") return;

  const thresholds = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const checkScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
};

/**
 * Rastrear tempo na página (30s, 60s, 120s, 300s)
 */
export const initTimeTracking = (): void => {
  if (typeof window === "undefined") return;

  const timeThresholds = [30, 60, 120, 300];
  let startTime = Date.now();

  timeThresholds.forEach((seconds) => {
    setTimeout(() => {
      trackTimeOnPage(seconds);
    }, seconds * 1000);
  });
};

/**
 * Inicializar todos os rastreamentos automáticos
 */
export const initAllTracking = (): void => {
  initClickTracking();
  initScrollTracking();
  initTimeTracking();
  trackPageView("Landing Page - Mapa de Obras");
};
