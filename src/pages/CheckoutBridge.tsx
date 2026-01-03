import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CONFIG } from "@/lib/config";

type Product = "imersao" | "mentoria";

interface CheckoutUrls {
  imersao: string;
  mentoria: string;
}

const CHECKOUT_URLS: CheckoutUrls = {
  imersao: CONFIG.hotmart.checkoutUrl,
  mentoria: "https://pay.hotmart.com/K103578257F?checkoutMode=10&bid=1767049086095", // URL da mentoria
};

const PRODUCT_NAMES: Record<Product, string> = {
  imersao: "Imersão Cronograma 2.0",
  mentoria: "Mentoria Inovando na sua Obra",
};

export default function CheckoutBridge() {
  const { product } = useParams<{ product: string }>();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "redirecting" | "error">("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const processCheckout = async () => {
      // Validar produto
      if (!product || !["imersao", "mentoria"].includes(product)) {
        setError("Produto inválido");
        setStatus("error");
        return;
      }

      const validProduct = product as Product;

      // Capturar dados dos parâmetros
      const email = searchParams.get("email");
      const name = searchParams.get("name");
      const phone = searchParams.get("phone");

      // Validar email obrigatório
      if (!email) {
        setError("Email é obrigatório");
        setStatus("error");
        return;
      }

      // Capturar UTMs
      const utmData = {
        utm_source: searchParams.get("utm_source") || "direct",
        utm_medium: searchParams.get("utm_medium") || "",
        utm_campaign: searchParams.get("utm_campaign") || "",
        utm_content: searchParams.get("utm_content") || "",
        utm_term: searchParams.get("utm_term") || "",
      };

      try {
        // Registrar checkout intent via Edge Function
        console.log("📤 Registrando checkout intent...", { email, product: validProduct });
        
        const { data, error: fnError } = await supabase.functions.invoke("log-checkout-intent", {
          body: {
            product: validProduct,
            email: email.toLowerCase().trim(),
            name: name?.trim() || null,
            phone: phone?.replace(/\D/g, "") || null,
            ...utmData,
            page_url: window.location.href,
          },
        });

        if (fnError) {
          console.error("❌ Erro ao registrar intent:", fnError);
          // Continuar mesmo com erro - não bloquear checkout
        } else {
          console.log("✅ Checkout intent registrado:", data);
        }

        // Montar URL do checkout com parâmetros
        const checkoutUrl = new URL(CHECKOUT_URLS[validProduct]);
        
        // Adicionar dados para pré-preenchimento se configurado
        if (CONFIG.hotmart.preFillCheckout) {
          if (email) checkoutUrl.searchParams.set("email", email);
          if (name) checkoutUrl.searchParams.set("name", name);
          if (phone) checkoutUrl.searchParams.set("phone", phone.replace(/\D/g, ""));
        }

        // Passar UTMs para o checkout
        if (utmData.utm_source) checkoutUrl.searchParams.set("utm_source", utmData.utm_source);
        if (utmData.utm_medium) checkoutUrl.searchParams.set("utm_medium", utmData.utm_medium);
        if (utmData.utm_campaign) checkoutUrl.searchParams.set("utm_campaign", utmData.utm_campaign);
        if (utmData.utm_content) checkoutUrl.searchParams.set("utm_content", utmData.utm_content);
        if (utmData.utm_term) checkoutUrl.searchParams.set("utm_term", utmData.utm_term);

        setStatus("redirecting");

        // Aguardar um momento para garantir que o registro foi feito
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Redirecionar para o checkout
        console.log("🔗 Redirecionando para:", checkoutUrl.toString());
        window.location.href = checkoutUrl.toString();

      } catch (err) {
        console.error("❌ Erro no processamento:", err);
        // Tentar redirecionar mesmo com erro
        setStatus("redirecting");
        const checkoutUrl = CHECKOUT_URLS[validProduct];
        setTimeout(() => {
          window.location.href = checkoutUrl;
        }, 1000);
      }
    };

    processCheckout();
  }, [product, searchParams]);

  const productName = product && ["imersao", "mentoria"].includes(product) 
    ? PRODUCT_NAMES[product as Product] 
    : "Produto";

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <div className="text-destructive text-xl mb-4">⚠️ {error}</div>
          <p className="text-muted-foreground">
            Por favor, volte e tente novamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {status === "loading" ? "Preparando seu acesso..." : "Redirecionando para pagamento seguro..."}
        </h1>
        <p className="text-muted-foreground">
          {productName}
        </p>
      </div>
    </div>
  );
}
