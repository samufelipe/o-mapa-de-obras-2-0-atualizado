import { MENTORIA_SKILLS } from "@/lib/mentoria-constants";
import { ArrowRight } from "lucide-react";

export default function MentoriaSkills() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-12 animate-fade-up">
          O que você vai aprender?
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Habilidades Técnicas */}
            <div className="animate-fade-up animation-delay-100">
              <div className="bg-[#f5f5f5] rounded-xl p-6 border-2 border-foreground/10">
                <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6 uppercase tracking-wide">
                  Habilidades Técnicas
                </h3>
                <ul className="space-y-3">
                  {MENTORIA_SKILLS.technical.map((skill, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-4 h-4 text-foreground" />
                      </div>
                      <span className="text-foreground text-base md:text-lg">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Plus sign between cards */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <span className="text-5xl font-bold text-foreground bg-white px-2">+</span>
            </div>

            {/* Habilidades Comportamentais */}
            <div className="animate-fade-up animation-delay-200">
              <div className="bg-[#f5f5f5] rounded-xl p-6 border-2 border-foreground/10">
                <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-6 uppercase tracking-wide">
                  Habilidades Comportamentais
                </h3>
                <ul className="space-y-3">
                  {MENTORIA_SKILLS.behavioral.map((skill, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-4 h-4 text-foreground" />
                      </div>
                      <span className="text-foreground text-base md:text-lg">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Plus sign for mobile */}
          <div className="flex md:hidden items-center justify-center -mt-4 -mb-4 relative z-10">
            <span className="text-3xl font-bold text-foreground bg-white px-4">+</span>
          </div>
        </div>
      </div>
    </section>
  );
}
