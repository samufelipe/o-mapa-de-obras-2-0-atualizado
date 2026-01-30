import { Button } from "@/components/ui/button";
import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { ArrowDown } from "lucide-react";

interface MentoriaHeroProps {
  onCtaClick: () => void;
}

export default function MentoriaHero({ onCtaClick }: MentoriaHeroProps) {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left animate-fade-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Domine o gerenciamento de obra e{" "}
              <span className="text-primary">transforme sua carreira</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Transforme cada projeto em uma jornada tranquila, com menos estresse, 
              mais controle e resultados que seus clientes vão amar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                onClick={onCtaClick}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-8 py-6 animate-pulse-subtle"
              >
                Quero Entrar na Mentoria
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              ✓ 16h de conteúdo prático • ✓ Acesso por 1 ano • ✓ Garantia de 15 dias
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up animation-delay-200">
            <div className="relative">
              <img
                src={MENTORIA_IMAGES.heroMentoras}
                alt="Ingrid Zarza e Fernanda Bradaschia - Mentoras"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce">
        <span className="text-xs text-muted-foreground mb-2">Role para baixo</span>
        <ArrowDown className="h-4 w-4 text-primary" />
      </div>
    </section>
  );
}
