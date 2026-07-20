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

const HeroSectionV3 = () => {
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
    trackCTAClick("hero_cta_v3", "hero_form_v3", "QUERO MINHA VAGA");
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-7 md:space-y-10 text-center lg:text-left animate-fade-up">

            {/* Countdown badge */}
            <div className="inline-flex items-center gap-2 bg-foreground px-4 py-2 border border-primary shadow-premium mx-auto lg:mx-0">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-bold text-background uppercase tracking-wider">
                Encerra em:{" "}
                <span className="text-primary tabular-nums">
                  {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
                </span>
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              <span
                className="text-primary italic block animate-fade-in"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                Arquiteta, nunca mais se sinta perdida
              </span>
              <span
                className="text-primary italic block text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-fade-in"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
              >
                quando o projeto sai do papel
              </span>
            </h1>

            {/* H2 */}
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-muted-foreground animate-fade-in leading-snug"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              1 sábado ao vivo para dominar a execução dos seus projetos com método, confiança e autoridade.
              Do início à entrega das chaves.
            </h2>

            {/* Body */}
            <div className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed space-y-4">
              <p>
                Com a Ingrid e a Fernanda, que já entregaram mais de 250 obras de interiores, você sai com{" "}
                <strong className="text-foreground">
                  método claro, segurança para liderar qualquer equipe e seu cronograma pronto para aplicar na semana seguinte.
                </strong>
              </p>
              <p className="text-primary font-bold text-lg md:text-xl">
                Mais 8 aulas preparatórias com acesso imediato. Chegue no sábado já preparada.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Trophy className="w-4 h-4 text-primary flex-shrink-0" /> +250 Obras Entregues
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Users className="w-4 h-4 text-primary flex-shrink-0" /> Quase 500 Arquitetas
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-foreground text-primary text-sm font-bold uppercase tracking-wider shadow-premium">
                <Video className="w-4 h-4 flex-shrink-0" /> Ao Vivo no Zoom
              </div>
            </div>
          </div>

          {/* Right CTA Card */}
          <div id="registration-form" className="scroll-mt-24 animate-fade-up">
            <div className="bg-card border-2 border-foreground p-6 sm:p-8 md:p-10 shadow-premium max-w-md mx-auto">

              {/* Card header */}
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Vaga Exclusiva</h2>
                <p className="text-base font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  Imersão Ao Vivo · Sábado 30/05
                </p>
              </div>

              {/* Value stack */}
              <div className="mb-6 bg-secondary border border-border p-5 space-y-2">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Incluso na sua vaga:
                </p>
                {valueItems.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="space-y-5">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground font-medium">
                      Valor total:{" "}
                      <span className="line-through">R$ 583,90</span>
                    </span>
                    <span className="text-4xl font-bold tracking-tighter animate-pulse-slow">R$ 39,90</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-primary bg-foreground px-2 py-1 uppercase tracking-widest shadow-premium">
                      ENCERRA 30/05
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">
                      Faltam {timeLeft.d} dias
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCTAClick}
                  className="w-full bg-green-600 text-white py-5 flex items-center justify-center gap-2 text-sm sm:text-base font-bold tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 uppercase group active:scale-95"
                  data-track="cta_button_v3"
                  data-track-location="hero_card_v3"
                >
                  QUERO MINHA VAGA · R$ 39,90
                  <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-sm text-muted-foreground font-medium">
                  Acesso imediato às 8 aulas preparatórias · Imersão ao vivo 30/05
                </p>
              </div>

              <p className="mt-5 text-center text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-1">
                <Lock className="w-4 h-4" /> Pagamento 100% Seguro via Hotmart
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-16 border-y border-border bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-14 text-foreground">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" /> +1000 Arquitetas Impactadas
            </div>
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 fill-current" /> Avaliação 4.9/5.0
            </div>
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base md:text-lg uppercase tracking-wide">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" /> Método Validado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionV3;
