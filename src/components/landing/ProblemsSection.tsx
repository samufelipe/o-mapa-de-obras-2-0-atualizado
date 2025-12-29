import { ArrowRight } from "lucide-react";

const problems = [
  {
    title: "O Ralo do Retrabalho",
    description: "A falta de saber a sequência de serviços da obra faz serviços ocasiona em muitos retrabalhos porque o fornecedor seguinte precisava de algo que não foi antecipado.",
  },
  {
    title: "Prejuízo em Materiais",
    description: "Acabamentos nobres danificados por equipes que entram na obra no momento errado do fluxo de execução.",
  },
  {
    title: "Silêncio Técnico",
    description: "A insegurança de ser questionada pela equipe e não saber o que responder, perdendo o respeito profissional perante o cliente.",
  },
  {
    title: "Estresse Constante",
    description: "A exaustão de viver 'apagando incêndios' em problemas que seriam previsíveis com o Cronograma",
  },
];

const ProblemsSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-foreground text-background reveal">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center md:text-left mb-12 space-y-4">
          <span className="text-primary font-black text-[9px] uppercase tracking-[0.3em] block">O CUSTO DE NÃO SABER DE OBRA</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-background">
            Sua Autoridade Não Pode Depender <br className="hidden md:block"/>
            <span className="text-primary italic">Apenas de Desenhos Bonitos.</span>
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
            QUERO ELIMINAR O RETRABALHO NA MINHA OBRA <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
