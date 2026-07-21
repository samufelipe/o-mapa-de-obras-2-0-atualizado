import { CheckCircle2 } from "lucide-react";
import { NATAL_MECHANISM_POINTS } from "@/lib/natal-constants";

const PainMechanismSection = () => {
  return (
    <section id="mechanism" className="py-20 bg-secondary reveal">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="space-y-4 text-base md:text-lg text-muted-foreground font-medium leading-relaxed mb-12">
          <p className="text-xl md:text-3xl font-bold text-foreground leading-tight">
            Falta um mês para virar agosto. E o Natal não espera.
          </p>
          <p>
            Se a obra atrasar, quem carrega a culpa é você. Não importa se o fornecedor furou o prazo, se o cliente
            demorou para aprovar o orçamento ou se a marcenaria mudou a data de entrega três vezes. Para o cliente
            leigo, atraso é sinônimo de incompetência.
          </p>
          <p>
            E o pior: muita arquiteta acredita nisso também. Aceita o prazo que o cliente impõe por medo de
            decepcionar, não sabe precificar o gerenciamento até o fim do ano e, quando a obra atrasa, sente que a
            culpa é dela.
          </p>
          <p className="text-foreground font-bold">
            Não é. Cada obra tem um prazo diferente, dependendo da complexidade e dos fornecedores envolvidos. O que
            muda o jogo não é trabalhar mais rápido. É saber montar o cronograma certo e conduzir o cliente dentro
            dele.
          </p>
          <p>
            Tentar resolver isso sozinha numa planilha, ou perguntar pra colega no grupo do WhatsApp, funciona até um
            ponto. O que muda de verdade é ter alguém que já entregou dezenas de obras te guiando ao vivo, na sua
            obra específica, no seu prazo real.
          </p>
        </div>

        <div className="mb-10 text-center">
          <p className="text-sm md:text-base font-bold uppercase tracking-widest text-primary mb-3">
            Para arquitetas e designers que gerenciam obra de interiores e reforma
          </p>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Num dia inteiro ao vivo, você abre o calendário com a gente e sai sabendo:
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="bg-card border border-border shadow-sm p-6 md:p-10">
          <ul className="space-y-5">
            {NATAL_MECHANISM_POINTS.map((point, i) => (
              <li key={i} className="flex gap-3 text-base md:text-lg font-bold text-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /> {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PainMechanismSection;
