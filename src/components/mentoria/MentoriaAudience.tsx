import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaAudience() {
  return (
    <section className="py-16 md:py-20 bg-[#f5f0e8]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-4 animate-fade-up">
          Para quem é?
        </h2>
        <p className="text-center text-foreground mb-8 max-w-3xl mx-auto animate-fade-up animation-delay-100">
          Para arquitetas, designers de interiores e engenheiras que queiram aprender
          a organizar obras de forma eficiente e previsível.
        </p>

        <h3 className="text-xl md:text-3xl font-bold text-center text-primary italic mb-8 animate-fade-up animation-delay-150">
          A mentoria é para você que ...
        </h3>

        <div className="max-w-5xl mx-auto animate-fade-up animation-delay-200">
          <img
            src={MENTORIA_IMAGES.audienceSteps}
            alt="Para quem é a mentoria"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
