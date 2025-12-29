import { Zap, MessageCircle, Calendar, Gift, ArrowRight } from "lucide-react";

const steps = [
  { 
    icon: Zap, 
    title: "01. ACESSO IMEDIATO", 
    desc: "Confirmação instantânea por e-mail com as boas-vindas e primeiros passos." 
  },
  { 
    icon: MessageCircle, 
    title: "02. GRUPO VIP", 
    desc: "Entrada no grupo exclusivo de WhatsApp para receber avisos e lembretes." 
  },
  { 
    icon: Calendar, 
    title: "03. IMERSÃO (31/01)", 
    desc: "Dia inteiro de workshop ao vivo no Zoom com aplicação direta do método." 
  },
  { 
    icon: Gift, 
    title: "04. ENTREGA DO TESOURO", 
    desc: "Liberação de todos os bônus exclusivos logo após o encerramento da live." 
  }
];

const StepsSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-secondary border-y border-border overflow-hidden reveal">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <div className="mb-16 space-y-4">
          <span className="text-primary font-black text-[9px] uppercase tracking-[0.4em] block">CLAREZA ABSOLUTA</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">O Caminho da sua Transformação</h2>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Veja o que acontece no minuto seguinte à sua inscrição</p>
          <div className="w-12 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 md:gap-8 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="bg-card p-8 border border-border relative group hover:border-primary transition-all shadow-sm">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-foreground text-primary flex items-center justify-center font-black text-[10px] rounded-full border border-primary">
                {i + 1}
              </div>
              <div className="mb-6 flex justify-center text-primary">
                <step.icon className="w-6 h-6" />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-widest mb-3">{step.title}</h4>
              <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={scrollToForm}
            className="bg-primary text-foreground px-6 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-foreground hover:text-primary transition-all border-2 border-foreground shadow-hard flex items-center justify-center gap-2 group active:scale-95"
          >
            QUERO MEU ACESSO IMEDIATO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Inscrição confirmada via Hotmart</p>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
