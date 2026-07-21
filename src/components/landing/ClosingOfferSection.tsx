import { ShieldCheck, ArrowRight, Video, Calendar } from "lucide-react";
import { useCTA } from "@/lib/cta-context";
import { NATAL_PRICE, NATAL_EVENT_DATE_LABEL, NATAL_GUARANTEE_DAYS } from "@/lib/natal-constants";

const ClosingOfferSection = () => {
  const handleCTA = useCTA();

  return (
    <section id="offer" className="py-20 bg-background reveal">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-foreground border-2 border-primary p-8 md:p-12 shadow-premium relative text-center">
          <span className="inline-block bg-primary text-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm mb-6">
            Vagas Abertas
          </span>

          <h2 className="text-background text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6">
            Sua obra pronta até o Natal começa aqui
          </h2>

          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center gap-1.5 text-background/70 text-sm font-bold uppercase tracking-wider">
              <Video className="w-4 h-4 text-primary" /> Ao Vivo · Dia Inteiro
            </div>
            <div className="flex items-center gap-1.5 text-background/70 text-sm font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-primary" /> {NATAL_EVENT_DATE_LABEL}
            </div>
          </div>

          <div className="mb-3">
            <span className="text-primary text-base md:text-lg font-bold uppercase tracking-[0.3em] block mb-1">
              INVESTIMENTO ÚNICO
            </span>
            <h3 className="text-background text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-tight animate-pulse-slow">
              APENAS R$ {NATAL_PRICE.toFixed(2).replace(".", ",")}
            </h3>
          </div>

          <p className="text-background/50 text-sm font-medium mb-2">
            Um dia inteiro ao vivo com a Ingrid e a Fernanda por menos do que custa uma única visita técnica.
          </p>
          <p className="text-background/50 text-sm font-medium mb-8">
            Menos do que o custo de uma obra atrasada em confiança e indicação.
          </p>

          <button
            onClick={handleCTA}
            className="w-full bg-green-600 text-white py-5 text-base font-bold uppercase tracking-[0.2em] hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95 group flex items-center justify-center gap-2 mb-6"
          >
            GARANTIR MINHA VAGA AGORA <ArrowRight className="inline w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 text-background/70">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm md:text-base font-medium text-left">
              Garantia de {NATAL_GUARANTEE_DAYS} dias prevista em lei: se não for para você, o reembolso é integral e sem burocracia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingOfferSection;
