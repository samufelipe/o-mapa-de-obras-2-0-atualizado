import { MENTORIA_MODULES } from "@/lib/mentoria-constants";

export default function MentoriaModules() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-up">
          <span className="text-primary">4 Módulos</span> Completos
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
          16 horas de conteúdo organizado em 4 módulos práticos e objetivos.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENTORIA_MODULES.map((module, index) => (
            <div
              key={module.number}
              className="group animate-fade-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="bg-secondary/50 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={module.image}
                    alt={`Módulo ${module.number}: ${module.title}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    {module.number}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
