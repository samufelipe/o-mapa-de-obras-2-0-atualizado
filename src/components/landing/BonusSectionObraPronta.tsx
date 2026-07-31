import { ClipboardList, FileText, Clock, PlayCircle } from "lucide-react";
import { BONUSES_OBRA_PRONTA, PRICING_ITEMS_OBRA_PRONTA } from "@/lib/constants-obra-pronta";
import PricingCardObraPronta from "./PricingCardObraPronta";

const bonusIcons = [PlayCircle, ClipboardList, FileText];

const BonusSectionObraPronta = () => {
  return (
    <section id="bonus" className="py-20 bg-background border-t border-border reveal">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">Seu Pacote de Ferramentas</h2>
        <p className="text-base md:text-lg font-bold text-muted-foreground uppercase tracking-widest mb-12">Tudo o que você precisa para aplicar o método imediatamente</p>

        <div className="grid md:grid-cols-3 gap-6 mb-16 relative">
          {BONUSES_OBRA_PRONTA.map((bonus, idx) => {
            const Icon = bonusIcons[idx];
            const isImmediate = bonus.release === "ACESSO IMEDIATO";
            return (
              <div key={idx} className={`bg-card border-2 p-8 flex flex-col items-center group relative shadow-premium hover:shadow-premium-gold hover:-translate-y-1 transition-all duration-300 ${isImmediate ? 'border-primary' : 'border-foreground'}`}>
                {isImmediate && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
                    LIBERADO NA HORA
                  </div>
                )}
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold uppercase mb-1 tracking-widest text-center">{bonus.title}</h3>
                <span className="text-sm font-bold bg-primary/10 px-3 py-1 uppercase tracking-tighter mb-4">
                  Valor: {bonus.value}
                </span>
                <p className="text-base text-muted-foreground mb-6 font-medium leading-relaxed text-center">{bonus.description}</p>
                <div className="mt-auto pt-4 border-t border-border w-full">
                  <span className={`text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1 ${isImmediate ? 'text-primary' : 'text-muted-foreground'}`}>
                    <Clock className="w-4 h-4" /> {bonus.release}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Stack */}
        <PricingCardObraPronta
          variant="dark"
          className="max-w-xl mx-auto text-left"
          badgeLabel="Oferta Ativa"
          title="Investimento Único"
          description="Tudo o que você precisa para aplicar o método imediatamente"
          features={PRICING_ITEMS_OBRA_PRONTA.map((item) => ({ label: item.name, price: item.price }))}
          priceFinal="R$ 29,90"
          ctaLabel="Garantir Minha Vaga Agora"
          ctaTrackingName="bonus_pricing_card"
          ctaTrackingLocation="bonus_section"
        />
      </div>
    </section>
  );
};

export default BonusSectionObraPronta;
