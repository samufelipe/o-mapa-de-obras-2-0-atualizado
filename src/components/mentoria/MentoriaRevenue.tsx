import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaRevenue() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-12 animate-fade-up">
          Como você pode faturar mais?
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Testimonial 1 */}
          <div className="animate-fade-up animation-delay-100">
            <div className="text-center mb-4">
              <p className="text-lg md:text-xl text-primary italic">
                Com único contrato ela
              </p>
              <p className="text-2xl md:text-3xl text-primary font-bold">
                já <span className="text-foreground">faturou 7x</span>
              </p>
              <p className="text-lg md:text-xl text-primary italic">
                o valor da mentoria
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={MENTORIA_IMAGES.revenue1}
                alt="Depoimento - Faturou 7x"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="animate-fade-up animation-delay-200">
            <div className="text-center mb-4">
              <p className="text-lg md:text-xl text-primary italic">
                Com único contrato ela
              </p>
              <p className="text-2xl md:text-3xl text-primary font-bold">
                já <span className="text-foreground">faturou 9x</span>
              </p>
              <p className="text-lg md:text-xl text-primary italic">
                o valor da mentoria
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={MENTORIA_IMAGES.revenue2}
                alt="Depoimento - Faturou 9x"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
