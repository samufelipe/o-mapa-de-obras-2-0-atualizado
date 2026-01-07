import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import cozinhaAntes from "@/assets/cozinha-antes.jpg";
import cozinhaDepois from "@/assets/cozinha-depois.jpg";
import { trackCTAClick } from "@/lib/gtm-tracking";

const TransformationSection = () => {
  const [showAfter, setShowAfter] = useState(false);

  const scrollToForm = () => {
    trackCTAClick("transformation_cta", "transformation_section", "QUERO PARTICIPAR DA IMERSÃO");
    const el = document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    { highlight: "ESCOPO DE OBRA", text: "DESSA COZINHA" },
    { highlight: "SEQUÊNCIA DE SERVIÇOS", text: "DESSA COZINHA" },
    { highlight: "O CRONOGRAMA", text: "DESSA COZINHA" },
  ];

  return (
    <section id="transformation" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 reveal">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight">
            Vamos te mostrar o passo a passo de como sair
          </h2>
        </div>

        {/* Interactive Slider */}
        <div className="relative mb-12 reveal">
          {/* Images Container */}
          <div className="relative overflow-hidden border-2 border-foreground shadow-hard mx-auto max-w-3xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: showAfter ? 'translateX(-50%)' : 'translateX(0)' }}
            >
              {/* Before Image */}
              <div className="w-full flex-shrink-0 relative">
                <img 
                  src={cozinhaAntes} 
                  alt="Cozinha antes da reforma" 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 to-transparent p-4 md:p-6">
                  <span className="text-background text-lg md:text-2xl font-black uppercase tracking-widest">
                    Disso...
                  </span>
                  <p className="text-background/80 text-xs md:text-sm mt-1">
                    Obra sem planejamento, prazos estourados, retrabalho
                  </p>
                </div>
              </div>

              {/* After Image */}
              <div className="w-full flex-shrink-0 relative">
                <img 
                  src={cozinhaDepois} 
                  alt="Cozinha depois da reforma" 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 to-transparent p-4 md:p-6">
                  <span className="text-primary text-lg md:text-2xl font-black uppercase tracking-widest">
                    Para isso! ✨
                  </span>
                  <p className="text-background/80 text-xs md:text-sm mt-1">
                    Resultado impecável, cliente satisfeita, obra entregue no prazo
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setShowAfter(false)}
              className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/90 border-2 border-foreground p-2 md:p-3 transition-all duration-300 ${!showAfter ? 'opacity-30 cursor-default' : 'hover:bg-primary shadow-hard'}`}
              disabled={!showAfter}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => setShowAfter(true)}
              className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/90 border-2 border-foreground p-2 md:p-3 transition-all duration-300 ${showAfter ? 'opacity-30 cursor-default' : 'hover:bg-primary shadow-hard'}`}
              disabled={showAfter}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            <button 
              onClick={() => setShowAfter(false)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-foreground transition-all duration-300 ${!showAfter ? 'bg-foreground text-background shadow-hard' : 'bg-background hover:bg-muted'}`}
            >
              Antes
            </button>
            <button 
              onClick={() => setShowAfter(true)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-foreground transition-all duration-300 ${showAfter ? 'bg-primary text-foreground shadow-hard' : 'bg-background hover:bg-muted'}`}
            >
              Depois
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-background border-2 border-foreground shadow-hard p-6 md:p-8 mb-10 reveal">
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">•</span>
                <p className="text-sm md:text-base font-medium uppercase tracking-wide">
                  Vamos montar um <span className="font-black text-primary">{step.highlight}</span> {step.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <button 
            onClick={scrollToForm}
            className="group bg-primary text-foreground py-4 px-8 text-xs font-black uppercase tracking-widest border-2 border-foreground shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <span>QUERO PARTICIPAR DA IMERSÃO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
