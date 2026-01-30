import { MENTORIA_DOCUMENTS, MENTORIA_BONUS_EXPERTS } from "@/lib/mentoria-constants";
import { ArrowRight } from "lucide-react";

export default function MentoriaDocuments() {
  return (
    <section className="py-16 md:py-20 bg-[#f5f0e8]">
      <div className="container mx-auto px-4">
        {/* Documents Pack */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-12 animate-fade-up">
          Pack de documentos que você vai<br />receber:
        </h2>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-up animation-delay-100">
              <ul className="space-y-3">
                {MENTORIA_DOCUMENTS.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-3 h-3 text-foreground" />
                    </div>
                    <span className="text-foreground text-sm md:text-base">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-up animation-delay-200 flex justify-center">
              {/* Illustration placeholder - checklist illustration */}
              <div className="w-48 h-48 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-6xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Experts */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-4 animate-fade-up">
          Aulas Bônus exclusivas!
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-12 animate-fade-up animation-delay-100">
          Time de Especialistas
        </h3>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto mb-8">
          {MENTORIA_BONUS_EXPERTS.map((expert, index) => (
            <div
              key={index}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/30 border-4 border-primary mx-auto mb-3 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <span className="text-4xl">👩‍💼</span>
                </div>
              </div>
              <p className="text-primary font-bold text-sm md:text-base">{expert.name}</p>
              <p className="text-foreground text-xs md:text-sm italic max-w-[140px]">{expert.topic}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-primary italic text-base md:text-lg animate-fade-up">
          + aulas bônus de impermeabilização, divulgação de<br />
          projeto e aulas surpresas
        </p>
      </div>
    </section>
  );
}
