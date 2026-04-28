import { FileSpreadsheet, ClipboardList, FileText, Clock, Plus, ArrowRight, PlayCircle } from "lucide-react";
import { BONUSES, PRICING_ITEMS } from "@/lib/constants";

const bonusIcons = [PlayCircle, FileSpreadsheet, ClipboardList, FileText];

const BonusSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="bonus" className="py-20 bg-background border-t border-border reveal">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">Seu Pacote de Ferramentas</h2>
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-12">Tudo o que você precisa para aplicar o método imediatamente</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {BONUSES.map((bonus, idx) => {
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
                <h3 className="text-[13px] font-bold uppercase mb-1 tracking-widest text-center">{bonus.title}</h3>
                <span className="text-sm font-bold bg-primary/10 px-3 py-1 uppercase tracking-tighter mb-4">
                  Valor: {bonus.value}
                </span>
                <p className="text-sm text-muted-foreground mb-6 font-medium leading-relaxed text-center">{bonus.description}</p>
                <div className="mt-auto pt-4 border-t border-border w-full">
                  <span className={`text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 ${isImmediate ? 'text-primary' : 'text-muted-foreground'}`}>
                    <Clock className="w-4 h-4" /> {bonus.release}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Stack */}
        <div className="max-w-xl mx-auto bg-foreground border-2 border-primary p-8 md:p-12 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-foreground px-4 py-1 text-xs font-bold uppercase tracking-widest transform rotate-45 translate-x-8 translate-y-4">
            OFERTA ATIVA
          </div>

          <div className="space-y-3 mb-8 text-left border-b border-background/20 pb-8">
            {PRICING_ITEMS.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-background/60 text-sm font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  {index > 0 && <Plus className="inline w-4 h-4 mr-1" />}
                  {item.name}
                </span>
                <span className={item.price === "Incluso" ? "text-primary bg-primary/10 px-2 py-0.5" : "text-background/40"}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-8 text-center">
            <div className="inline-block bg-primary text-foreground px-4 py-1 text-xs font-bold uppercase tracking-widest mb-4">
              ⚡ PRÉ-LANÇAMENTO · Apenas até 04/05
            </div>
            <p className="text-background/60 text-xs font-bold uppercase tracking-widest mb-1">
              Preço total se comprado separadamente: <span className="line-through text-background/40">R$ 583,90</span>
            </p>

            <div className="mb-2">
              <span className="text-primary text-[13px] font-bold uppercase tracking-[0.3em] block mb-1">INVESTIMENTO ÚNICO</span>
              <h3 className="text-background text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-tight animate-pulse-slow">
                APENAS R$ 29,90
              </h3>
              <p className="text-background/50 text-xs font-bold uppercase tracking-widest mt-2">
                Após 04/05 o valor volta para <span className="line-through">R$ 39,90</span>
              </p>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="w-full bg-green-600 text-white py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95 group flex items-center justify-center gap-2"
          >
            GARANTIR MINHA VAGA AGORA <ArrowRight className="inline w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;