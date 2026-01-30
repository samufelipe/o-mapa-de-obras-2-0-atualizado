import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("E-mail inválido").max(255),
});

interface MentoriaHeroProps {
  onCtaClick: () => void;
}

export default function MentoriaHero({ onCtaClick }: MentoriaHeroProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
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
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-[#f5f0e8]">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={MENTORIA_IMAGES.logo}
            alt="Mentoria Inovando na sua Obra"
            className="h-16 md:h-20 w-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="text-center md:text-left animate-fade-up">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
              Domine o gerenciamento de obra de interiores de maneira{" "}
              <span className="text-primary">lucrativa e eficiente</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Transforme cada projeto em uma jornada inesquecível para seus clientes, desde o
              primeiro contato até a entrega final.
            </p>

            {/* Form in Hero */}
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto md:mx-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="hero-name" className="text-foreground text-sm font-medium">
                    Seu nome completo
                  </Label>
                  <Input
                    id="hero-name"
                    type="text"
                    placeholder="Digite seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`mt-1 ${errors.name ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="hero-email" className="text-foreground text-sm font-medium">
                    Seu melhor e-mail
                  </Label>
                  <Input
                    id="hero-email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`mt-1 ${errors.email ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#9ACD32] hover:bg-[#8BC52A] text-foreground font-bold text-base py-6 uppercase tracking-wide"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Quero entrar na mentoria
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up animation-delay-200 flex justify-center md:justify-end">
            <img
              src={MENTORIA_IMAGES.heroMentoras}
              alt="Ingrid Zarza e Fernanda Bradaschia - Mentoras"
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
