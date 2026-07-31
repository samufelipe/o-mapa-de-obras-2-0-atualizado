// ============================================
// TIKTOK PIXEL TRACKING
// Funções para disparar eventos do TikTok Ads
// ============================================
//
// Espelha a estrutura de tracking.ts (Meta Pixel), em paralelo, sem tocar em
// nada do Meta/GTM existente. Escopo: só Index.tsx, /quiz e /redirecionando
// (a mesma oferta Obra Pronta), por isso o Pixel ID fica isolado aqui em vez
// de em config.ts (compartilhado com /v2, /v3 e o dominio de Natal, que nao
// usam TikTok).
//
// Pixel ID: D9MDH93C77U97D5Q3220 (snippet base carregado em index.html).

declare global {
  interface Window {
    ttq: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      [key: string]: unknown;
    };
  }
}

const isPixelAvailable = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof window.ttq !== "undefined" &&
    typeof window.ttq.track === "function"
  );
};

const logTracking = (event: string, params?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 [TikTok Pixel] ${event}`, params || "");
  }
};

/**
 * Dispara Pageview manualmente.
 * Só necessário em navegação client-side (etapas do quiz, /redirecionando):
 * no carregamento real da página, o próprio snippet base já chama ttq.page().
 */
export const trackPageView = (): void => {
  if (!isPixelAvailable()) return;

  window.ttq.page();
  logTracking("Pageview");
};

/**
 * Dispara ViewContent — mesmo ponto onde o Meta dispara trackViewContent.
 */
export const trackViewContent = (contentName: string): void => {
  if (!isPixelAvailable()) return;

  window.ttq.track("ViewContent", {
    content_name: contentName,
    content_category: "Workshop",
  });
  logTracking("ViewContent", { content_name: contentName });
};

/**
 * Equivalente ao Lead do Meta. TikTok não tem um evento padrão "Lead"; o mais
 * próximo semanticamente (qualificação concluída, sem pagamento ainda) é
 * CompleteRegistration.
 */
export const trackLead = (data: {
  value?: number;
  contentCategory?: string;
} = {}): void => {
  if (!isPixelAvailable()) return;

  const contentCategory = data.contentCategory ?? "Imersão Cronograma Obra Pronta";
  const value = data.value ?? 29.9;

  window.ttq.track("CompleteRegistration", {
    content_category: contentCategory,
    value,
    currency: "BRL",
  });
  logTracking("CompleteRegistration", { content_category: contentCategory, value });
};

/**
 * Dispara InitiateCheckout — evento padrão do TikTok, mesmo nome do Meta.
 */
export const trackInitiateCheckout = (
  value = 29.9,
  contentCategory = "Imersão Cronograma Obra Pronta"
): void => {
  if (!isPixelAvailable()) return;

  window.ttq.track("InitiateCheckout", {
    content_category: contentCategory,
    value,
    currency: "BRL",
  });
  logTracking("InitiateCheckout", { value, currency: "BRL" });
};
