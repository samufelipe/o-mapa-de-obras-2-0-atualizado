import mentorasImg from "@/assets/mentoras.png";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            <img 
              src={mentorasImg} 
              alt="Ingrid e Fernanda" 
              className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 border-2 border-foreground shadow-hard block" 
              loading="lazy"
            />
          </div>
          
          <div className="space-y-6">
            <span className="text-primary font-black text-[9px] uppercase tracking-[0.3em] block">DE ARQUITETA PARA ARQUITETA</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Criamos o <span className="text-primary italic">Cronograma 2.0</span> como a <br className="hidden md:block"/> ponte prática que você precisa.
            </h2>
            <div className="space-y-4 text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">
              <p>
                Somos <span className="text-foreground font-bold">Ingrid Zarza e Fernanda Bradaschia</span>. Com mais de <span className="text-foreground font-bold">250 execuções entregues</span>, descobrimos que a chave do sucesso na obra não é o improviso, mas o <strong>conhecimento estratégico do fluxo de serviços</strong>.
              </p>
              <p>
                O <strong>Cronograma O Mapa de Obras 2.0</strong> é a ponte prática que a formação acadêmica não consegue alcançar em profundidade. Não entregamos apenas uma ferramenta, mas a segurança que você precisa para ser a líder técnica respeitada em cada projeto.
              </p>
            </div>
            <button 
              onClick={scrollToForm}
              className="w-full md:w-auto bg-primary text-foreground px-6 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-foreground hover:text-primary transition-all border-2 border-foreground shadow-hard flex items-center justify-center gap-2 group active:scale-95"
            >
              QUERO DOMINAR A EXECUÇÃO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
