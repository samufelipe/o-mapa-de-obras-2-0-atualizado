import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CONFIG } from "@/lib/config";

type Product = "imersao" | "mentoria";

interface CheckoutUrls {
  imersao: string;
  mentoria: {
    default: string;
    boleto: string;
  };
}

const CHECKOUT_URLS: CheckoutUrls = {
  imersao: CONFIG.hotmart.checkoutUrl,
  mentoria: {
    default: "https://pay.hotmart.com/Y93975016X?off=22jnl093&bid=1759350326376",
    boleto: "https://pay.hotmart.com/Y93975016X?off=et69m72o&bid=1759350383011"
  }
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
        // Registrar checkout intent via Edge Function (síncrono com timeout)
        console.log("📤 Registrando checkout intent...", { email, product: validProduct });
        
        // Timeout de 3 segundos para não bloquear muito
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );
        
        const invokePromise = supabase.functions.invoke("log-checkout-intent", {
          body: {
            product: validProduct,
            email: email.toLowerCase().trim(),
            name: name?.trim() || null,
            phone: phone?.replace(/\D/g, "") || null,
            ...utmData,
            page_url: window.location.href,
          },
        });

        try {
          const { data, error: fnError } = await Promise.race([invokePromise, timeoutPromise]) as { data: unknown; error: Error | null };
          
          if (fnError) {
            console.error("❌ Erro ao registrar intent:", fnError);
          } else {
            console.log("✅ Checkout intent registrado:", data);
          }
        } catch (timeoutErr) {
          console.warn("⏱️ Timeout no registro (sweeper vai pegar):", timeoutErr);
        }

        // Montar URL do checkout com parâmetros
        const paymentMethod = searchParams.get("payment");
        let baseCheckoutUrl: string;
        
        if (validProduct === "mentoria") {
          baseCheckoutUrl = paymentMethod === "boleto" 
            ? CHECKOUT_URLS.mentoria.boleto 
            : CHECKOUT_URLS.mentoria.default;
        } else {
          baseCheckoutUrl = CHECKOUT_URLS.imersao;
        }
        
        const checkoutUrl = new URL(baseCheckoutUrl);
        
        // Adicionar dados para pré-preenchimento se configurado
        if (CONFIG.hotmart.preFillCheckout) {
          if (email) checkoutUrl.searchParams.set("email", email);
          if (name) checkoutUrl.searchParams.set("name", name);
          if (phone) {
            const cleanPhone = phone.replace(/\D/g, "");
            if (cleanPhone.length >= 10) {
              const ddd = cleanPhone.substring(0, 2);
              const number = cleanPhone.substring(2);
              checkoutUrl.searchParams.set("phoneac", ddd);
              checkoutUrl.searchParams.set("phonenumber", number);
            }
          }
        }

        // Passar UTMs para o checkout
        if (utmData.utm_source) checkoutUrl.searchParams.set("utm_source", utmData.utm_source);
        if (utmData.utm_medium) checkoutUrl.searchParams.set("utm_medium", utmData.utm_medium);
        if (utmData.utm_campaign) checkoutUrl.searchParams.set("utm_campaign", utmData.utm_campaign);
        if (utmData.utm_content) checkoutUrl.searchParams.set("utm_content", utmData.utm_content);
        if (utmData.utm_term) checkoutUrl.searchParams.set("utm_term", utmData.utm_term);

        setStatus("redirecting");

        // Redirecionar imediatamente após registro
        console.log("🔗 Redirecionando para:", checkoutUrl.toString());
        window.location.href = checkoutUrl.toString();

      } catch (err) {
        console.error("❌ Erro no processamento:", err);
        // Tentar redirecionar mesmo com erro
        setStatus("redirecting");
        let fallbackUrl: string;
        if (validProduct === "mentoria") {
          fallbackUrl = CHECKOUT_URLS.mentoria.default;
        } else {
          fallbackUrl = CHECKOUT_URLS.imersao;
        }
        setTimeout(() => {
          window.location.href = fallbackUrl;
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
          {status === "loading" ? "Abrindo página de pagamento..." : "Redirecionando para checkout..."}
        </h1>
        <p className="text-muted-foreground mb-2">
          {productName}
        </p>
        <p className="text-sm text-primary font-semibold">
          Falta só o último passo para garantir sua vaga!
        </p>
      </div>
    </div>
  );
}
