import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { trackLead } from "@/lib/tracking";
import { NATAL_CHECKOUT_URL, NATAL_PRICE, NATAL_PRODUCT_NAME } from "@/lib/natal-constants";

// Página rápida de transição entre o clique no CTA da LP principal e o
// checkout da Hotmart. Existe só pra dar um ponto de URL própria onde o
// Pixel do Meta dispara o evento Lead (intenção forte de compra), antes
// do hop final pro checkout.
const REDIRECT_DELAY_MS = 900;

const NatalRedirect = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    trackLead({
      contentName: NATAL_PRODUCT_NAME,
      contentCategory: "Imersão Cronograma Especial de Natal",
      value: NATAL_PRICE,
    });

    const timer = setTimeout(() => {
      const url = new URL(NATAL_CHECKOUT_URL);
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((param) => {
        const val = searchParams.get(param);
        if (val) url.searchParams.set(param, val);
      });
      window.location.href = url.toString();
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="natal-theme min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center p-8">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
        <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2">Garantindo sua vaga...</h1>
        <p className="text-muted-foreground font-medium mb-6">Imersão Cronograma Especial de Natal</p>
        <p className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-1">
          <Lock className="w-3.5 h-3.5" /> Pagamento seguro via Hotmart
        </p>
      </div>
    </div>
  );
};

export default NatalRedirect;
