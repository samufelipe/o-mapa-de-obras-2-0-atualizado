import { Trophy, Video, Clock, Users, Star, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import PricingCardObraPronta from "./PricingCardObraPronta";

const DEADLINE = new Date("2026-08-08T23:59:59-03:00");

const heroFeatures = [
  "Imersão Ao Vivo · Sábado 08/08",
  "Aulas Preparatórias para Construir seu Cronograma de Obras de Forma Completa (acesso imediato)",
  "Modelo de Cronograma",
  "Guia de 7 Prompts de IA para Obras",
  "Acesso ao Grupo VIP",
];

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = DEADLINE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-background overflow-hidden">
      <div className="bg-grid-overlay"></div>
      <div className="bg-grain absolute inset-0 pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-foreground px-3 py-1.5 border border-primary shadow-premium mx-auto lg:mx-0">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-background uppercase tracking-wider">
                Encerra em:{" "}
                <span className="text-primary tabular-nums">
                  {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
                </span>
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              <span
                className="text-primary italic block animate-fade-in"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                Imersão Cronograma
              </span>
              <span
                className="text-primary italic block text-xl md:text-3xl lg:text-4xl animate-fade-in"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
              >
                Obra Pronta
              </span>
            </h1>

            <h2
              className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              Domine a sequência exata de uma reforma de interiores em apenas um dia.
            </h2>

            <div className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed space-y-3">
              <p>
                A virada de chave que toda arquiteta precisa para dominar suas obras com{" "}
                <strong className="text-foreground">mais autoridade, previsibilidade e valorização.</strong>
              </p>
              <p className="text-primary font-bold">
                + aulas preparatórias para construir seu cronograma de obras de forma completa, com acesso imediato para você chegar pronta.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Trophy className="w-4 h-4 text-primary" /> +250 Obras Entregues
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-primary text-xs font-bold uppercase tracking-wider shadow-premium">
                <Video className="w-4 h-4" /> AO VIVO NO ZOOM
              </div>
            </div>
          </div>

          {/* Right Pricing Card */}
          <div className="animate-fade-up">
            <PricingCardObraPronta
              variant="light"
              className="max-w-md mx-auto"
              eyebrow="Vaga Exclusiva"
              title="Imersão Ao Vivo · Sábado 08/08"
              features={heroFeatures}
              priceOriginal="R$ 503,90"
              priceFinal="R$ 29,90"
              ctaLabel="Reservar Meu Lugar"
              ctaTrackingName="hero_pricing_card"
              ctaTrackingLocation="hero_form"
            />
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-16 border-y border-border bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-foreground">
            <div className="flex items-center gap-2 font-bold text-sm md:text-base uppercase tracking-widest">
              <Users className="w-5 h-5 md:w-6 md:h-6" /> +1000 Arquitetas Impactadas
            </div>
            <div className="flex items-center gap-2 font-bold text-sm md:text-base uppercase tracking-widest">
              <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" /> Avaliação 4.9/5.0
            </div>
            <div className="flex items-center gap-2 font-bold text-sm md:text-base uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" /> Método Validado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
