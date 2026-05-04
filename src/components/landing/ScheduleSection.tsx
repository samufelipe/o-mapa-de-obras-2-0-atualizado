import { CheckCircle2, ArrowRight } from "lucide-react";
import { AGENDA } from "@/lib/constants";

interface AgendaItem {
  day: string;
  date: string;
  title: string;
  topics: string[];
  surprise?: {
    title: string;
    description: string;
  };
}

const ScheduleSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("registration-form");
    heroSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="schedule" className="py-20 bg-background reveal">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">Como Vai Ser a Imersão</h2>
          <p className="text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest">Um dia inteiro focado na sua transformação técnica</p>
          <div className="w-12 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-left mb-16">
          {(AGENDA as AgendaItem[]).map((item, i) => (
            <div key={i} className="bg-card p-8 md:p-10 border border-border shadow-sm hover:shadow-premium transition-all duration-300">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">{item.date}</span>
              <h3 className="text-lg md:text-xl font-bold uppercase mb-6 tracking-tight border-b border-border pb-2">{item.title}</h3>
              <ul className="space-y-4">
                {item.topics.map((topic, j) => (
                  <li key={j} className="flex gap-3 text-sm md:text-base font-bold text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> {topic}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={scrollToForm}
            className="bg-green-600 text-white px-6 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 flex items-center justify-center gap-2 group active:scale-95"
          >
            QUERO GARANTIR MINHA VAGA NO ZOOM <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-[11px] font-bold bg-primary/20 px-3 py-1 uppercase tracking-widest">Vagas Limitadas pela capacidade da sala</span>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;