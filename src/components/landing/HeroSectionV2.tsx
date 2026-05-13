import { Trophy, Video, Lock, Clock, Users, Star, ShieldCheck, ArrowRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { CONFIG } from "@/lib/config";
import { trackInitiateCheckout } from "@/lib/tracking";
import { trackBeginCheckout, trackCTAClick } from "@/lib/gtm-tracking";

const DEADLINE = new Date("2026-05-30T23:59:59-03:00");

const valueItems = [
  "Imersão Ao Vivo · Sábado 30/05",
  "8 Aulas Preparatórias (acesso imediato)",
  "Planilha Cronograma Completa",
  "Roteiro de Serviços",
  "Guia de Fornecedores",
];

const HeroSectionV2 = () => {
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

  const handleCTAClick = () => {
    trackCTAClick("hero_cta_v2", "hero_form_v2", "QUERO MINHA VAGA");
    trackInitiateCheckout(39.90);
    trackBeginCheckout();

    const url = new URL(CONFIG.hotmart.checkoutUrl);
    const currentParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((param) => {
      const val = currentParams.get(param);
      if (val) url.searchParams.set(param, val);
    });

    window.location.href = url.toString();
  };

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
                Quando entra a marcenaria?
              </span>
              <span
                className="text-primary italic block text-xl md:text-3xl lg:text-4xl animate-fade-in"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
              >
                E o piso? E o eletricista?
              </span>
            </h1>

            <h2
              className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              Arquiteta, se você ainda busca essas respostas, a Imersão Cronograma 2.0 foi feita para você.
            </h2>

            <div className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed space-y-3">
              <p>
                1 dia ao vivo para dominar a sequência completa da sua obra de interiores com{" "}
                <strong className="text-foreground">mais autoridade, previsibilidade e valorização.</strong>
              </p>
              <p className="text-primary font-bold">
                + 8 aulas preparatórias com acesso imediato para você chegar pronta.
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

          {/* Right CTA Card */}
          <div id="registration-form" className="scroll-mt-24 animate-fade-up">
            <div className="bg-card border-2 border-foreground p-5 sm:p-8 md:p-10 shadow-premium max-w-md mx-auto">
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-xl font-bold uppercase tracking-tight">Vaga Exclusiva</h2>
                <p className="text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest">
                  Imersão Ao Vivo · Sábado 30/05
                </p>
              </div>

              {/* Value stack */}
              <div className="mb-6 bg-secondary border border-border p-4 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Incluso na sua vaga:
                </p>
                {valueItems.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-medium">
                      Valor total:{" "}
                      <span className="line-through">R$ 583,90</span>
                    </span>
                    <span className="text-3xl font-bold tracking-tighter animate-pulse-slow">R$ 39,90</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-primary bg-foreground px-2 py-1 uppercase tracking-widest shadow-premium">
                      ENCERRA 30/05
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      Faltam {timeLeft.d} dias
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCTAClick}
                  className="w-full bg-green-600 text-white py-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 uppercase group active:scale-95"
                  data-track="cta_button_v2"
                  data-track-location="hero_card_v2"
                >
                  QUERO MINHA VAGA · R$ 39,90
                  <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-xs text-muted-foreground font-medium">
                  Acesso imediato às 8 aulas preparatórias · Imersão ao vivo 30/05
                </p>
              </div>

              <p className="mt-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Pagamento 100% Seguro via Hotmart
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-16 border-y border-border bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-14 text-foreground">
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" /> +1000 Arquitetas Impactadas
            </div>
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 fill-current" /> Avaliação 4.9/5.0
            </div>
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" /> Método Validado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionV2;