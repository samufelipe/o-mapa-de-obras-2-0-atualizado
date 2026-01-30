import { MENTORIA_IMAGES, MENTORIA_SKILLS } from "@/lib/mentoria-constants";
import { CheckCircle } from "lucide-react";

export default function MentoriaSkills() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-up">
          O que você vai <span className="text-primary">aprender?</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
          Habilidades técnicas e comportamentais para você dominar o gerenciamento de obras
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Technical Skills */}
          <div className="animate-fade-up animation-delay-200">
            <div className="bg-secondary/50 rounded-2xl p-6 md:p-8 h-full border border-border/50 hover:border-primary/30 transition-colors">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Habilidades Técnicas
              </h3>
              <div className="mb-6">
                <img
                  src={MENTORIA_IMAGES.skillsTechnical}
                  alt="Habilidades Técnicas"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <ul className="space-y-3">
                {MENTORIA_SKILLS.technical.map((skill, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Behavioral Skills */}
          <div className="animate-fade-up animation-delay-300">
            <div className="bg-secondary/50 rounded-2xl p-6 md:p-8 h-full border border-border/50 hover:border-primary/30 transition-colors">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Habilidades Comportamentais
              </h3>
              <div className="mb-6">
                <img
                  src={MENTORIA_IMAGES.skillsBehavioral}
                  alt="Habilidades Comportamentais"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <ul className="space-y-3">
                {MENTORIA_SKILLS.behavioral.map((skill, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
