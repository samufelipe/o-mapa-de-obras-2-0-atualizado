import mentorasImg from "@/assets/mentoras.png";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("registration-form");
    heroSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="about" className="py-20 bg-background reveal">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            <img
              src={mentorasImg}
              alt="Ingrid e Fernanda"
              className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 border-2 border-foreground shadow-premium block"
              loading="lazy"
            />
          </div>

          <div className="space-y-6 md:space-y-8">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] block">DE ARQUITETA PARA ARQUITETA</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
              Criamos o <span className="text-primary italic">Cronograma 2.0</span> como a <br className="hidden md:block" /> ponte prática que você precisa.
            </h2>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
              <p>
                Somos <span className="text-foreground font-bold">Ingrid Zarza e Fernanda Bradaschia</span>. Com mais de <span className="text-foreground font-bold">250 execuções entregues</span>, descobrimos que a chave do sucesso na obra não é o improviso, mas o <strong>conhecimento estratégico do fluxo de serviços</strong>.
              </p>
              <p>
                O <strong>Cronograma O Mapa de Obras 2.0</strong> é a ponte prática que a faculdade não te ensinou e não consegue alcançar em profundidade. Não entregamos apenas uma ferramenta, mas a segurança que você precisa para ser a líder técnica respeitada em cada projeto.
              </p>
              <p>
                Acreditamos que todo arquiteto deve saber de obra e que o mercado será muito mais valorizado com bons profissionais.
              </p>
            </div>
            <button
              onClick={scrollToForm}
              className="w-full md:w-auto bg-green-600 text-white px-6 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 flex items-center justify-center gap-2 group active:scale-95"
            >
              QUERO DOMINAR A EXECUÇÃO <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;