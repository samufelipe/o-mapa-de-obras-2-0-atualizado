import { useEffect } from "react";
import NatalQuizFunnel from "@/components/landing/NatalQuizFunnel";
import { initAllTracking, trackBeginCheckout } from "@/lib/gtm-tracking";
import { trackInitiateCheckout } from "@/lib/tracking";
import { CTAProvider } from "@/lib/cta-context";
import { NATAL_CHECKOUT_URL, NATAL_PRICE, NATAL_PRODUCT_NAME } from "@/lib/natal-constants";

const NATAL_FAVICONS: Array<{ rel: string; sizes?: string; type?: string; href: string }> = [
  { rel: "icon", type: "image/svg+xml", href: "/brand-natal/favicon.svg" },
  { rel: "icon", sizes: "16x16", type: "image/png", href: "/brand-natal/favicon-16.png" },
  { rel: "icon", sizes: "32x32", type: "image/png", href: "/brand-natal/favicon-32.png" },
  { rel: "icon", sizes: "48x48", type: "image/png", href: "/brand-natal/favicon-48.png" },
  { rel: "icon", sizes: "64x64", type: "image/png", href: "/brand-natal/favicon-64.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/brand-natal/apple-touch-icon-180.png" },
];

// V2: variação em formato de quiz de qualificação (mini-funil de tela
// única, sem rolagem longa) — ver NatalQuizFunnel.tsx pra estrutura.
const NatalLandingV2 = () => {
  useEffect(() => {
    initAllTracking("Landing Page - Imersão de Natal V2 Quiz");
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    const createdOrChanged: Array<{ el: HTMLLinkElement; prevHref: string | null; created: boolean }> = [];

    NATAL_FAVICONS.forEach(({ rel, sizes, type, href }) => {
      const selector = sizes
        ? `link[rel="${rel}"][sizes="${sizes}"]`
        : type
        ? `link[rel="${rel}"][type="${type}"]`
        : `link[rel="${rel}"]`;
      let el = document.querySelector<HTMLLinkElement>(selector);
      let created = false;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        if (sizes) el.setAttribute("sizes", sizes);
        if (type) el.type = type;
        document.head.appendChild(el);
        created = true;
      }
      createdOrChanged.push({ el, prevHref: created ? null : el.href, created });
      el.href = href;
    });

    document.title = "Imersão Cronograma Especial de Natal | Inovando na Sua Obra";

    return () => {
      document.title = originalTitle;
      createdOrChanged.forEach(({ el, prevHref, created }) => {
        if (created) {
          el.remove();
        } else if (prevHref) {
          el.href = prevHref;
        }
      });
    };
  }, []);

  const handleCTA = () => {
    trackInitiateCheckout(NATAL_PRICE, "inscricao-cronograma-natal", NATAL_PRODUCT_NAME);
    trackBeginCheckout(NATAL_PRICE, NATAL_PRODUCT_NAME);
    const url = new URL(NATAL_CHECKOUT_URL);
    const currentParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((param) => {
      const val = currentParams.get(param);
      if (val) url.searchParams.set(param, val);
    });
    window.location.href = url.toString();
  };

  return (
    <CTAProvider value={handleCTA}>
      <NatalQuizFunnel />
    </CTAProvider>
  );
};

export default NatalLandingV2;
