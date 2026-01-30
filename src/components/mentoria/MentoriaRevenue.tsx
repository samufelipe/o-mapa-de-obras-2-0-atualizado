import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaRevenue() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-up">
          Como você pode <span className="text-primary">faturar mais?</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
          Veja as projeções de faturamento com a metodologia Inovando.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="animate-fade-up animation-delay-200">
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={MENTORIA_IMAGES.revenue1}
                alt="Projeção de Faturamento 1"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="animate-fade-up animation-delay-300">
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={MENTORIA_IMAGES.revenue2}
                alt="Projeção de Faturamento 2"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
