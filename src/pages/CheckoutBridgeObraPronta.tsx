import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { OBRA_PRONTA_CHECKOUT_URL } from "@/lib/constants-obra-pronta";
import { trackLead, trackPageView as trackMetaPageView, trackViewContent } from "@/lib/tracking";
import {
  trackLead as trackLeadTikTok,
  trackPageView as trackTikTokPageView,
  trackViewContent as trackViewContentTikTok,
} from "@/lib/tiktok-tracking";
import { trackPageView as trackGtmPageView, trackLeadGenerated } from "@/lib/gtm-tracking";

// Delay curto so pra garantir que os disparos de tracking feitos no clique
// do CTA (trackInitiateCheckout/trackBeginCheckout, em Index.tsx) terminem
// de sair antes da navegacao externa pro Hotmart cortar a conexao.
const REDIRECT_DELAY = 800;

const BRIDGE_PAGE_NAME = "Quiz Obra Pronta - Redirecionando";

const CheckoutBridgeObraPronta = () => {
  const [status, setStatus] = useState<"loading" | "redirecting">("loading");

  // Chega aqui sempre via navegacao client-side (nunca um carregamento de
  // pagina novo), entao o PageView automatico do script do Pixel no
  // index.html nao dispara de novo pra essa rota — disparado manualmente
  // aqui, no mesmo padrao usado em cada etapa do quiz.
  useEffect(() => {
    trackMetaPageView();
    trackViewContent(BRIDGE_PAGE_NAME);
    trackTikTokPageView();
    trackViewContentTikTok(BRIDGE_PAGE_NAME);
    trackGtmPageView(BRIDGE_PAGE_NAME);
  }, []);

  // Sem formulario de nome/telefone, esse e o unico ponto por onde todo
  // visitante que vai pro checkout obrigatoriamente passa. Mapeia o evento
  // de Lead aqui (Meta Pixel + GTM + TikTok), sem dados pessoais.
  useEffect(() => {
    trackLead({ value: 29.90, contentCategory: "Imersão Cronograma Obra Pronta" });
    trackLeadTikTok({ value: 29.90, contentCategory: "Imersão Cronograma Obra Pronta" });
    trackLeadGenerated("checkout_redirect_obra_pronta");
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Redirecionando para pagamento... | Imersão Cronograma Obra Pronta";

    const timer = setTimeout(() => {
      setStatus("redirecting");

      const url = new URL(OBRA_PRONTA_CHECKOUT_URL);
      const currentParams = new URLSearchParams(window.location.search);
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "ttclid"].forEach((param) => {
        const val = currentParams.get(param);
        if (val) url.searchParams.set(param, val);
      });

      window.location.href = url.toString();
    }, REDIRECT_DELAY);

    return () => {
      clearTimeout(timer);
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="natal-theme min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center p-8 max-w-sm">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-6" />
        <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2">
          {status === "loading" ? "Confirmando sua vaga..." : "Abrindo página de pagamento..."}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-4">
          Imersão Cronograma Obra Pronta
        </p>
        <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 flex-shrink-0" /> Ambiente 100% Seguro via Hotmart
        </p>
      </div>
    </div>
  );
};

export default CheckoutBridgeObraPronta;
