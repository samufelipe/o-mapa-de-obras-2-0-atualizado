import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MENTORIA_IMAGES, MENTORIA_PRICING } from "@/lib/mentoria-constants";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
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
  const [preferBoleto, setPreferBoleto] = useState(
    searchParams.get("payment") === "boleto"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
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
      // Build checkout URL with all parameters
      const checkoutUrl = new URL("/checkout/mentoria", window.location.origin);
      checkoutUrl.searchParams.set("email", formData.email.toLowerCase().trim());
      checkoutUrl.searchParams.set("name", formData.name.trim());
      
      if (preferBoleto) {
        checkoutUrl.searchParams.set("payment", "boleto");
      }

      // Preserve UTMs from current URL
      const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      utmParams.forEach((param) => {
        const value = searchParams.get(param);
        if (value) {
          checkoutUrl.searchParams.set(param, value);
        }
      });

      // Navigate to checkout bridge
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
    <section id="pricing" className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 animate-fade-up">
          Seu <span className="text-primary">Investimento</span>
        </h2>
        <p className="text-center text-background/70 mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
          Acesso completo à Mentoria Inovando na sua Obra
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Pricing Image */}
          <div className="animate-fade-up animation-delay-200">
            <img
              src={MENTORIA_IMAGES.pricing}
              alt="Investimento Mentoria"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* Form */}
          <div className="animate-fade-up animation-delay-300">
            <div className="bg-background text-foreground rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-1">Por apenas</p>
                <p className="text-4xl font-bold text-foreground">
                  {MENTORIA_PRICING.installments}
                </p>
                <p className="text-sm text-muted-foreground">
                  ou {MENTORIA_PRICING.fullPrice} à vista
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {MENTORIA_PRICING.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Seu nome completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Seu melhor e-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="boleto"
                    checked={preferBoleto}
                    onCheckedChange={(checked) => setPreferBoleto(checked === true)}
                    disabled={isSubmitting}
                  />
                  <Label
                    htmlFor="boleto"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Prefiro pagar com boleto parcelado
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg py-6"
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
              </form>

              <p className="text-xs text-center text-muted-foreground mt-4">
                🔒 Seus dados estão seguros e não serão compartilhados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
