import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaInside() {
  const screenshots = [
    { src: MENTORIA_IMAGES.inside1, alt: "Plataforma - Visão Geral" },
    { src: MENTORIA_IMAGES.inside2, alt: "Plataforma - Aulas" },
    { src: MENTORIA_IMAGES.inside3, alt: "Plataforma - Materiais" },
    { src: MENTORIA_IMAGES.inside4, alt: "Plataforma - Ferramentas" },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-up">
          Como é <span className="text-primary">por dentro?</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
          Conheça a plataforma exclusiva Cronograma Inteligente onde você terá acesso a todo o conteúdo.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="animate-fade-up overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
