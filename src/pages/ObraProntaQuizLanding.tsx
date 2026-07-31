import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ObraProntaQuizFunnel from "@/components/landing/ObraProntaQuizFunnel";
import { initAllTracking, trackBeginCheckout } from "@/lib/gtm-tracking";
import { trackInitiateCheckout } from "@/lib/tracking";
import { trackInitiateCheckout as trackInitiateCheckoutTikTok } from "@/lib/tiktok-tracking";
import { CTAProvider } from "@/lib/cta-context";

// Quiz de qualificação da LP oficial (Index.tsx). Mesma mecânica do quiz
// /natal-v2 (NatalLandingV2.tsx + NatalQuizFunnel.tsx), copy própria em
// obra-pronta-quiz-content.ts. Favicon e domínio ficam os mesmos da LP
// oficial (sem override), por ser a mesma oferta.
const ObraProntaQuizLanding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    initAllTracking("Landing Page - Imersão Obra Pronta Quiz");
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Imersão Cronograma Obra Pronta | Quiz";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Mesmo fluxo de checkout da LP oficial: dispara o tracking de conversão e
  // navega pra pagina intermediaria de redirecionamento (/redirecionando),
  // que so entao manda pro checkout externo do Hotmart, preservando
  // UTMs/fbclid.
  const handleCTA = () => {
    trackInitiateCheckout(29.90);
    trackInitiateCheckoutTikTok(29.90, "Imersão Cronograma Obra Pronta");
    trackBeginCheckout(29.90, "Imersão Cronograma Obra Pronta");
    const currentParams = new URLSearchParams(window.location.search);
    navigate(`/redirecionando?${currentParams.toString()}`);
  };

  return (
    <CTAProvider value={handleCTA}>
      <ObraProntaQuizFunnel />
    </CTAProvider>
  );
};

export default ObraProntaQuizLanding;
