import { ArrowRight } from "lucide-react";

const problems = [
  {
    title: "Maior Faturamento",
    description: "É o domínio da obra, sequência de serviços, cronograma e planejamento, que permite projetar melhor, evitar erros, passar segurança ao cliente e, principalmente, oferecer serviços muito mais lucrativos, como acompanhamento e gerenciamento de obra.",
  },
  {
    title: "Fim do Retrabalho",
    description: "Não saber a sequência de serviços gera retrabalho e prejuízo na obra. Quando a ordem de execução não é clara, um fornecedor chega precisando de algo que não foi antecipado, serviços precisam ser refeitos e materiais já instalados acabam sendo danificados por equipes que entram no momento errado.",
  },
  {
    title: "Autoridade e Segurança",
    description: "Nunca mais sinta aquele 'frio na barriga' ao ser questionado pela equipe de obra. Ao dominar a sequência técnica, você responde com precisão, conquista o respeito dos prestadores de serviço e a confiança total do seu cliente.",
  },
  {
    title: "Gestão Inteligente",
    description: "Pare de 'apagar incêndios' e comece a prever o futuro. Use a Inteligência Artificial para criar um planejamento que trabalha por você, transformando a exaustão diária em uma rotina de acompanhamento organizada e previsível.",
  },
];

const ProblemsSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="problems" className="py-20 bg-foreground text-background reveal">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center md:text-left mb-12 space-y-4">
          <span className="text-primary font-black text-[9px] uppercase tracking-[0.3em] block">PROJETOS INCRÍVEIS NÃO SOBREVIVEM A OBRA SEM MÉTODO.</span>
          <h2 className="text-lg md:text-xl font-medium tracking-tight leading-relaxed text-background/80">
            Entenda por que dominar o cronograma e entender de obra é o que separa arquitetos profissionais dos amadores que vivem no prejuízo.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="bg-foreground/50 border-l-2 border-primary p-6 hover:bg-foreground/80 transition-colors"
              style={{ backgroundColor: 'rgba(24, 24, 27, 0.5)' }}
            >
              <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-3 text-background">{problem.title}</h3>
              <p className="text-sm md:text-base font-medium text-background/60 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={scrollToForm}
            className="bg-primary text-foreground px-6 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-background hover:text-foreground transition-all border-2 border-foreground shadow-hard flex items-center justify-center gap-2 group active:scale-95"
          >
            QUERO DOMINAR O MEU CRONOGRAMA E ELIMINAR O CAOS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
