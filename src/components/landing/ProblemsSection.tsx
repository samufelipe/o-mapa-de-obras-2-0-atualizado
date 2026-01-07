import { ArrowRight } from "lucide-react";

const ProblemsSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="problems" className="py-20 bg-foreground text-background reveal">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Seção: Fim do Retrabalho */}
        <div className="mb-16">
          <span className="text-primary font-black text-[9px] uppercase tracking-[0.3em] block mb-4">FIM DO RETRABALHO</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-background mb-4">
            Não saber a sequência de serviços gera <span className="text-primary italic">retrabalho e prejuízo na obra.</span>
          </h2>
          <p className="text-sm md:text-base font-medium text-background/70 leading-relaxed max-w-3xl">
            Quando a ordem de execução não é clara, um fornecedor chega precisando de algo que não foi antecipado, serviços precisam ser refeitos e materiais já instalados acabam sendo danificados por equipes que entram no momento errado.
          </p>
        </div>

        {/* Seção: Autoridade e Segurança */}
        <div className="mb-16 bg-background/5 border-l-4 border-primary p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3 text-primary">
            AUTORIDADE E SEGURANÇA:
          </h3>
          <p className="text-sm md:text-base font-medium text-background/80 leading-relaxed">
            Nunca mais sinta aquele "frio na barriga" ao ser questionado pela equipe de obra. Ao dominar a sequência técnica, você responde com precisão, conquista o respeito dos prestadores de serviço e a confiança total do seu cliente.
          </p>
        </div>

        {/* CTA Principal */}
        <div className="flex justify-center mb-16">
          <button 
            onClick={scrollToForm}
            className="bg-primary text-foreground px-6 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-all border-2 border-foreground shadow-hard flex items-center justify-center gap-2 group active:scale-95"
          >
            QUERO DOMINAR O MEU CRONOGRAMA E ELIMINAR O CAOS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Seção: Gestão Inteligente */}
        <div className="bg-background/5 border-l-4 border-primary p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3 text-primary">
            GESTÃO INTELIGENTE:
          </h3>
          <p className="text-sm md:text-base font-medium text-background/80 leading-relaxed">
            Pare de "apagar incêndios" e comece a prever o futuro. Use a Inteligência Artificial para criar um planejamento que trabalha por você, transformando a exaustão diária em uma rotina de acompanhamento organizada e previsível.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ProblemsSection;
