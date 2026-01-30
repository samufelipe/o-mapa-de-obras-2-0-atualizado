import { MENTORIA_IMAGES, MENTORIA_MENTORS_BIO } from "@/lib/mentoria-constants";

export default function MentoriaMentors() {
  return (
    <section className="py-16 md:py-20 bg-[#f5f0e8]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-12 animate-fade-up">
          Quem somos nós?
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
          {/* Bio Text */}
          <div className="animate-fade-up animation-delay-100">
            <div className="space-y-4">
              {MENTORIA_MENTORS_BIO.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground text-sm md:text-base leading-relaxed">
                  {paragraph.split(/(Ingrid Zarza e Fernanda Bradaschia|INOVANDO ARQUITETURA|@inovandonasuaobra|Mentoria Inovando na Sua Obra|já concluímos mais de 250 obras|compartilhamos experiências reais de obra, dicas valiosas e estratégias práticas|Em 2024)/).map((part, i) => {
                    const boldPhrases = [
                      "Ingrid Zarza e Fernanda Bradaschia",
                      "INOVANDO ARQUITETURA",
                      "@inovandonasuaobra",
                      "Mentoria Inovando na Sua Obra",
                      "já concluímos mais de 250 obras",
                      "compartilhamos experiências reais de obra, dicas valiosas e estratégias práticas",
                      "Em 2024"
                    ];
                    if (boldPhrases.includes(part)) {
                      return <strong key={i}>{part}</strong>;
                    }
                    return part;
                  })}
                </p>
              ))}
            </div>
          </div>

          {/* Mentors Image */}
          <div className="animate-fade-up animation-delay-200 flex justify-center">
            <img
              src={MENTORIA_IMAGES.mentors}
              alt="Ingrid Zarza e Fernanda Bradaschia"
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
