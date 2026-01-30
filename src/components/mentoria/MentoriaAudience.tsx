import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaAudience() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-up">
          Para <span className="text-primary">quem é</span> a Mentoria?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
          Se você é profissional da área de construção e quer organizar seus processos, 
          essa mentoria é para você.
        </p>

        <div className="max-w-4xl mx-auto animate-fade-up animation-delay-200">
          {/* Desktop Image */}
          <img
            src={MENTORIA_IMAGES.audienceDesktop}
            alt="Para quem é a Mentoria"
            className="hidden md:block w-full h-auto rounded-2xl shadow-lg"
          />
          {/* Mobile Image */}
          <img
            src={MENTORIA_IMAGES.audienceMobile}
            alt="Para quem é a Mentoria"
            className="md:hidden w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
