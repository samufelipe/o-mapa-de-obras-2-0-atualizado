import { ArrowRight } from "lucide-react";
import cozinhaAntes from "@/assets/cozinha-antes.jpg";
import cozinhaDepois from "@/assets/cozinha-depois.jpg";
import { trackCTAClick } from "@/lib/gtm-tracking";

const TransformationSection = () => {
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

        {/* Before/After Images - Side by Side */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12 reveal">
          {/* Before */}
          <div className="flex flex-col items-center">
            <div className="relative overflow-hidden border-2 border-foreground shadow-hard">
              <img 
                src={cozinhaAntes} 
                alt="Cozinha antes da reforma" 
                className="w-64 md:w-80 h-48 md:h-60 object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <span className="mt-4 text-lg md:text-xl font-black uppercase tracking-widest">Disso</span>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center py-4 md:py-0">
            <div className="bg-primary p-3 md:p-4 rounded-full border-2 border-foreground shadow-hard">
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-foreground rotate-90 md:rotate-0" />
            </div>
          </div>

          {/* After */}
          <div className="flex flex-col items-center">
            <div className="relative overflow-hidden border-2 border-foreground shadow-hard">
              <img 
                src={cozinhaDepois} 
                alt="Cozinha depois da reforma" 
                className="w-64 md:w-80 h-48 md:h-60 object-cover"
              />
            </div>
            <span className="mt-4 text-lg md:text-xl font-black uppercase tracking-widest">Para isso</span>
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
