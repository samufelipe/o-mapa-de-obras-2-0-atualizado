import { RefreshCw, DollarSign, VolumeX, Flame } from "lucide-react";

const problems = [
  {
    icon: RefreshCw,
    title: "O Ralo do Retrabalho",
    description: "A falta de uma sequência lógica faz serviços serem refeitos porque o fornecedor seguinte precisava de algo que não foi antecipado.",
  },
  {
    icon: DollarSign,
    title: "Prejuízo em Materiais",
    description: "Acabamentos nobres danificados por equipes que entram na obra no momento errado do fluxo de execução.",
  },
  {
    icon: VolumeX,
    title: "Silêncio Técnico",
    description: "A insegurança de ser questionada pela equipe e não saber o que responder, perdendo o respeito profissional perante o cliente.",
  },
  {
    icon: Flame,
    title: "Estresse Constante",
    description: "A exaustão de viver 'apagando incêndios' em problemas que seriam previsíveis com o Cronograma O Mapa de Obras 2.0.",
  },
];

const ProblemsSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            O Custo da Falta de Método
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase mt-4">
            Sua Autoridade Não Pode Depender{" "}
            <span className="text-primary italic block">Apenas de Desenhos Bonitos.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="gold-border-left bg-card p-6 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={scrollToForm}
            className="bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Quero Eliminar o Retrabalho na Minha Obra
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
