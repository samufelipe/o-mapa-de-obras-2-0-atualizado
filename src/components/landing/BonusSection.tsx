import { FileText, ClipboardCheck, MessageSquare } from "lucide-react";

const bonuses = [
  {
    icon: FileText,
    title: "Matriz de Sequência Ideal",
    value: "R$ 497,00",
    description: "Sua bússola técnica. O fluxo visual detalhado para você nunca mais permitir que um fornecedor entre na obra antes da hora certa.",
    release: "Liberado Pós-Live (31/01)",
  },
  {
    icon: ClipboardCheck,
    title: "Checklist de Visita Técnica",
    value: "R$ 197,00",
    description: "Um guia de conferência rápida para garantir que cada etapa do Cronograma 2.0 esteja sendo respeitada fielmente pela equipe.",
    release: "Liberado Pós-Live (31/01)",
  },
  {
    icon: MessageSquare,
    title: "Guia de Postura e Liderança",
    value: "R$ 297,00",
    description: "Scripts de comunicação para alinhar prazos e cobrar qualidade dos fornecedores com autoridade e elegância.",
    release: "Liberado Pós-Live (31/01)",
  },
];

const BonusSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase">
            Seu Pacote de Ferramentas
          </h2>
          <p className="text-muted-foreground mt-4">
            Tudo o que você precisa para aplicar o método imediatamente
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {bonuses.map((bonus, index) => (
            <div
              key={index}
              className="bg-card border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="space-y-4">
                <bonus.icon className="w-10 h-10 text-primary" />
                
                <div>
                  <h3 className="text-lg font-bold uppercase">{bonus.title}</h3>
                  <p className="text-primary text-sm font-medium mt-1">
                    Valor de Mercado: {bonus.value}
                  </p>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {bonus.description}
                </p>
                
                <div className="pt-4 border-t border-border">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {bonus.release}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
