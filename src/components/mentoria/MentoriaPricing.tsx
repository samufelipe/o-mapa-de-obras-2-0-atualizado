import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MENTORIA_PRICING } from "@/lib/mentoria-constants";
import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
});

export default function MentoriaPricing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent, isBoleto: boolean = false) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const checkoutUrl = new URL("/checkout/mentoria", window.location.origin);
      checkoutUrl.searchParams.set("email", formData.email.toLowerCase().trim());
      checkoutUrl.searchParams.set("name", formData.name.trim());
      
      if (isBoleto) {
        checkoutUrl.searchParams.set("payment", "boleto");
      }

      const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      utmParams.forEach((param) => {
        const value = searchParams.get(param);
        if (value) {
          checkoutUrl.searchParams.set(param, value);
        }
      });

      navigate(checkoutUrl.pathname + checkoutUrl.search);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao processar",
        description: "Tente novamente em alguns segundos.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#5D4037] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 animate-fade-up italic">
          E quanto é o investimento mais importante do<br />seu ano?
        </h2>

        <div className="max-w-md mx-auto">
          {/* Price Card */}
          <div className="bg-[#f5f0e8] rounded-2xl p-8 text-foreground animate-fade-up animation-delay-100">
            <div className="text-center mb-6">
              <p className="text-primary font-bold text-lg uppercase mb-2">
                Oportunidade única e<br />exclusiva pra vocês!!!
              </p>
              
              {/* Price display */}
              <div className="bg-primary text-foreground inline-block px-6 py-4 rounded-lg mb-2">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg">12x</span>
                  <span className="text-sm">R$</span>
                  <span className="text-5xl font-bold">{MENTORIA_PRICING.installmentValue}</span>
                  <span className="text-2xl">,{MENTORIA_PRICING.installmentCents}</span>
                </div>
                <p className="text-xs mt-1">Apenas</p>
              </div>
              
              <p className="text-sm text-muted-foreground">
                ou {MENTORIA_PRICING.fullPrice}<br />à vista
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <div>
                <Label htmlFor="pricing-name" className="text-foreground text-sm">
                  Seu nome completo
                </Label>
                <Input
                  id="pricing-name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`mt-1 bg-white ${errors.name ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="pricing-email" className="text-foreground text-sm">
                  Seu melhor e-mail
                </Label>
                <Input
                  id="pricing-email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`mt-1 bg-white ${errors.email ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#9ACD32] hover:bg-[#8BC52A] text-foreground font-bold text-base py-6 uppercase"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    Quero meu acesso agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full border-foreground text-foreground hover:bg-foreground/10 font-bold text-base py-6 uppercase"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
              >
                Boleto parcelado
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
