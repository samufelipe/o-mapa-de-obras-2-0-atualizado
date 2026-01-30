import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaHowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-up">
          Como funciona a <span className="text-primary">Mentoria?</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
          Um método estruturado para você dominar o gerenciamento de obras em poucos meses.
        </p>

        <div className="max-w-5xl mx-auto animate-fade-up animation-delay-200">
          <img
            src={MENTORIA_IMAGES.howItWorks}
            alt="Como funciona a Mentoria"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
