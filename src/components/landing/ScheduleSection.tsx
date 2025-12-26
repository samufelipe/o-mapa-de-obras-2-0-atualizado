import { CheckCircle2, ArrowRight } from "lucide-react";
import { AGENDA } from "@/lib/constants";

const ScheduleSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-background reveal">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="mb-16 space-y-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Dinâmica da Imersão</h2>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Um dia inteiro focado na sua transformação técnica</p>
          <div className="w-12 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 text-left mb-16">
          {AGENDA.map((item, i) => (
            <div key={i} className="bg-card p-8 border border-border shadow-sm hover:shadow-hard transition-all">
              <span className="text-[8px] font-black text-primary uppercase tracking-widest block mb-2">{item.date}</span>
              <h3 className="text-lg font-black uppercase mb-6 tracking-tight border-b border-border pb-2">{item.title}</h3>
              <ul className="space-y-4">
                {item.topics.map((topic, j) => (
                  <li key={j} className="flex gap-3 text-[11px] font-bold text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={scrollToForm}
            className="bg-primary text-foreground px-6 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-foreground hover:text-primary transition-all border-2 border-foreground shadow-hard flex items-center justify-center gap-2 group active:scale-95"
          >
            QUERO GARANTIR MINHA VAGA NO ZOOM <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[8px] font-black bg-primary/20 px-3 py-1 uppercase tracking-widest">Vagas Limitadas pela capacidade da sala</span>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
