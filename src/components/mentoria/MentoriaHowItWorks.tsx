import { MENTORIA_HOW_IT_WORKS } from "@/lib/mentoria-constants";
import { ArrowRight } from "lucide-react";

export default function MentoriaHowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-12 animate-fade-up">
          Como funciona a<br />
          <span className="text-foreground not-italic">Mentoria Inovando na sua Obra?</span>
        </h2>

        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {MENTORIA_HOW_IT_WORKS.map((item, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-4 h-4 text-foreground" />
                </div>
                <p className="text-foreground text-base md:text-lg">
                  <span className="font-bold">{item.bold}</span>
                  {item.text && ` ${item.text}`}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
