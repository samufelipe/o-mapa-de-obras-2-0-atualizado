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
    { highlight: "ESCOPO DE OBRA", text: "dessa cozinha" },
    { highlight: "SEQUÊNCIA DE SERVIÇOS", text: "dessa cozinha" },
    { highlight: "O CRONOGRAMA", text: "dessa cozinha" },
  ];

  return (
    <section id="transformation" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 reveal">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight">
            Vamos te mostrar o passo a passo de como sair
          </h2>
        </div>

        {/* Before/After Images - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-14 reveal">
          {/* Before */}
          <div className="flex flex-col items-center text-center">
            <div className="relative overflow-hidden rounded-xl border-2 border-foreground shadow-hard hover:shadow-lg transition-all duration-300 w-full bg-muted">
              <div className="aspect-[3/4] flex items-center justify-center">
                <img 
                  src={cozinhaAntes} 
                  alt="Cozinha antes da reforma" 
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider text-foreground">Disso...</span>
              <p className="text-sm md:text-base text-muted-foreground max-w-xs">
                Obra sem planejamento, prazos estourados e cliente insatisfeito
              </p>
            </div>
          </div>

          {/* After */}
          <div className="flex flex-col items-center text-center">
            <div className="relative overflow-hidden rounded-xl border-2 border-primary shadow-gold hover:-translate-y-1 transition-all duration-300 w-full bg-muted">
              {/* Badge */}
              <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest py-2 text-center z-10">
                Resultado Final
              </div>
              <div className="aspect-[3/4] flex items-center justify-center">
                <img 
                  src={cozinhaDepois} 
                  alt="Cozinha depois da reforma" 
                  className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider text-primary">Para isso!</span>
              <p className="text-sm md:text-base text-muted-foreground max-w-xs">
                Projeto executado com precisão, cliente encantada e resultado digno de portfólio
              </p>
            </div>
          </div>
        </div>

        {/* Steps - Premium Dark Card */}
        <div className="bg-foreground border-2 border-primary shadow-hard rounded-xl p-6 md:p-8 mb-10 reveal">
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary font-black text-lg">•</span>
                <p className="text-sm md:text-base font-medium text-background">
                  Vamos montar o <span className="font-black text-primary uppercase">{step.highlight}</span> {step.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <button 
            onClick={scrollToForm}
            className="main-cta group flex items-center gap-3 mx-auto"
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
