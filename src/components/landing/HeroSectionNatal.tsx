import { Lock, Clock, Users, Star, ArrowRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { trackInitiateCheckout } from "@/lib/tracking";
import { trackBeginCheckout, trackCTAClick } from "@/lib/gtm-tracking";
import {
  NATAL_CHECKOUT_URL,
  NATAL_PRICE,
  NATAL_PRODUCT_NAME,
  NATAL_EVENT_DATE,
  NATAL_EVENT_DATE_LABEL,
} from "@/lib/natal-constants";

const valueItems = [
  "Ao vivo no Zoom · 08/08",
  "Imersão de um dia · 09h às 17h",
  "Você monta seu cronograma, ao vivo, comigo",
];

const HeroSectionNatal = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = NATAL_EVENT_DATE.getTime() - now.getTime();
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
    trackCTAClick("hero_cta_natal", "hero_card_natal", "GARANTIR MINHA VAGA");
    trackInitiateCheckout(NATAL_PRICE, "inscricao-cronograma-natal", NATAL_PRODUCT_NAME);
    trackBeginCheckout(NATAL_PRICE, NATAL_PRODUCT_NAME);

    const url = new URL(NATAL_CHECKOUT_URL);
    const currentParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((param) => {
      const val = currentParams.get(param);
      if (val) url.searchParams.set(param, val);
    });

    window.location.href = url.toString();
  };

  return (
    <section id="hero" className="relative pt-24 pb-12 md:pt-40 md:pb-24 bg-background overflow-hidden">
      <div className="bg-grid-overlay"></div>
      <div className="bg-grain absolute inset-0 pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-3 md:space-y-6 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-foreground px-3 py-1.5 border border-primary shadow-premium mx-auto lg:mx-0">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-background uppercase tracking-wider">
                Faltam para a imersão:{" "}
                <span className="text-primary tabular-nums">
                  {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
                </span>
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
              A obra precisa ficar pronta até o Natal.
              <span className="text-primary italic block mt-1">O cronograma decide se isso é possível.</span>
            </h1>

            <p className="hidden md:block text-base md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Na Imersão Cronograma Especial de Natal você planeja os próximos meses da obra, define prioridades,
              escolhe fornecedores e conduz o cliente com segurança, sem aceitar prazos impossíveis nem perder
              credibilidade. Tudo isso ao vivo, comigo, no dia 08/08.
            </p>
            <p className="md:hidden text-base text-muted-foreground max-w-lg mx-auto font-medium leading-relaxed">
              Planeje os próximos meses, escolha fornecedores certos e conduza o cliente sem aceitar prazo impossível.
              Ao vivo, comigo, no dia 08/08.
            </p>
          </div>

          {/* Right CTA Card */}
          <div id="registration-form" className="scroll-mt-24 animate-fade-up">
            <div className="bg-card border-2 border-foreground p-4 sm:p-8 md:p-10 shadow-premium max-w-md mx-auto">
              <div className="mb-4 text-center lg:text-left">
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Vaga para a Imersão de Natal</h2>
                <p className="text-base md:text-lg font-bold text-muted-foreground uppercase tracking-widest">
                  Ao Vivo · {NATAL_EVENT_DATE_LABEL}
                </p>
              </div>

              <div className="mb-4 bg-secondary border border-border p-3 space-y-1.5">
                {valueItems.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground font-medium">Investimento único:</span>
                  <span className="text-4xl font-bold tracking-tighter animate-pulse-slow">
                    R$ {NATAL_PRICE.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  onClick={handleCTAClick}
                  className="w-full bg-green-600 text-white py-4 flex items-center justify-center gap-2 text-sm sm:text-base font-bold tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 uppercase group active:scale-95"
                  data-track="cta_button_natal"
                  data-track-location="hero_card_natal"
                >
                  GARANTIR MINHA VAGA · R$ {NATAL_PRICE.toFixed(2).replace(".", ",")}
                  <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-sm text-muted-foreground font-medium flex items-center justify-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Pagamento seguro via Hotmart · Vaga confirmada na hora
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-8 md:mt-16 border-y border-border bg-secondary">
        <div className="container mx-auto px-4 py-5 md:py-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-14 text-foreground">
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" /> +1000 Arquitetas na Comunidade Inovando
            </div>
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0 fill-current" /> Avaliação 4.9/5.0 nas Imersões
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionNatal;
