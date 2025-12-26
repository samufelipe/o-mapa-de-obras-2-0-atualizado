import { Mail, Users, Video, Gift } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Mail,
    title: "Acesso Imediato",
    description: "Confirmação instantânea por e-mail com as boas-vindas e primeiros passos.",
  },
  {
    number: "02",
    icon: Users,
    title: "Grupo VIP",
    description: "Entrada na comunidade exclusiva de WhatsApp para Networking e avisos.",
  },
  {
    number: "03",
    icon: Video,
    title: "Imersão (31/01)",
    description: "Dia inteiro de workshop ao vivo no Zoom com aplicação direta do método.",
  },
  {
    number: "04",
    icon: Gift,
    title: "Entrega do Tesouro",
    description: "Liberação de todos os bônus exclusivos logo após o encerramento da live.",
  },
];

const StepsSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-spacing bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-medium uppercase tracking-widest">
            Clareza Absoluta
          </span>
          <h2 className="text-3xl md:text-4xl uppercase mt-4">
            O Caminho da sua Transformação
          </h2>
          <p className="text-muted-foreground mt-4 text-sm">
            Veja o que acontece no minuto seguinte à sua inscrição
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-card border border-border p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              
              <div className="pt-6 space-y-4">
                <step.icon className="w-8 h-8 text-primary mx-auto" />
                <h3 className="text-xs font-display uppercase tracking-wider">
                  {step.number}. {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button
            onClick={scrollToForm}
            className="bg-primary text-primary-foreground px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            Quero Iniciar Minha Jornada
          </button>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
