import { Button } from "@/components/ui/button";
import { MENTORIA_WHATSAPP } from "@/lib/mentoria-constants";
import { MessageCircle } from "lucide-react";

export default function MentoriaGuarantee() {
  return (
    <section className="py-16 md:py-20 bg-[#f5f0e8]">
      <div className="container mx-auto px-4">
        {/* Guarantee */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-2xl md:text-4xl font-bold text-primary italic mb-4">
            Risco Zero para você
          </h2>
          <p className="text-foreground mb-6 max-w-2xl mx-auto">
            Confiamos tanto no nosso conteúdo que damos uma{" "}
            <span className="font-bold">garantia incondicional de 15 dias</span> pra você.
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-bold text-2xl md:text-3xl uppercase">
              Garantia<br />Incondicional
            </span>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
              <span className="text-xl md:text-2xl font-bold text-foreground text-center leading-tight">15<br/>DIAS</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Compra 100% segura pela plataforma HOTMART.<br />
            Se em 15 dias não gostar, você pode pedir seu reembolso e tem 100% do seu dinheiro de volta.
          </p>
        </div>

        {/* Support CTA */}
        <div className="text-center animate-fade-up animation-delay-200">
          <h3 className="text-xl md:text-3xl font-bold text-foreground mb-6">
            Ficou com alguma dúvida?
          </h3>
          <Button
            asChild
            size="lg"
            className="bg-[#9ACD32] hover:bg-[#8BC52A] text-foreground font-bold text-base px-8 py-6 uppercase"
          >
            <a href={MENTORIA_WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com o suporte
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
