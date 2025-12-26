import { Check } from "lucide-react";

const morningTopics = [
  "A Engrenagem Perfeita: A sequência de serviços que evita o retrabalho e economiza até 20% do orçamento final.",
  "Proteção do Design: Como o Cronograma O Mapa de Obras 2.0 garante que o acabamento de luxo não sofra danos de fornecedores anteriores.",
  "O Pulo do Gato Técnico: A realidade sobre o tempo real de cura e secagem que dita o ritmo saudável de qualquer reforma.",
];

const afternoonTopics = [
  "Posicionamento de Autoridade: Como usar o Cronograma O Mapa de Obras 2.0 para comandar a equipe com segurança técnica absoluta.",
  "Gerenciamento Sem Estresse: O fluxo para acompanhar projetos simultâneos sem perder a qualidade ou a sanidade mental.",
  "Execução em Prática: Como apresentar o Cronograma O Mapa de Obras 2.0 ao cliente para valorizar seus honorários de acompanhamento.",
];

const ScheduleSection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl uppercase">
            Dinâmica da Imersão
          </h2>
          <p className="text-muted-foreground mt-4 text-sm">
            Um dia inteiro focado na sua transformação técnica
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Morning Block */}
          <div className="bg-card border border-border p-8">
            <div className="mb-8">
              <span className="text-primary text-xs font-medium uppercase tracking-widest">
                Sábado 31/01 • 09:00 - 12:00
              </span>
              <h3 className="text-xl font-display uppercase mt-3">
                A Logística da Execução
              </h3>
            </div>
            
            <ul className="space-y-4">
              {morningTopics.map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Afternoon Block */}
          <div className="bg-card border border-border p-8">
            <div className="mb-8">
              <span className="text-primary text-xs font-medium uppercase tracking-widest">
                Sábado 31/01 • 14:00 - 18:00
              </span>
              <h3 className="text-xl font-display uppercase mt-3">
                Liderança e Lucratividade
              </h3>
            </div>
            
            <ul className="space-y-4">
              {afternoonTopics.map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
