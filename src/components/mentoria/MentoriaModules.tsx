import { MENTORIA_MODULES } from "@/lib/mentoria-constants";
import { ArrowRight } from "lucide-react";

export default function MentoriaModules() {
  return (
    <section className="py-16 md:py-20 bg-[#f5f0e8]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-16 animate-fade-up">
          Como é a mentoria por dentro?
        </h2>

        <div className="max-w-5xl mx-auto space-y-8">
          {MENTORIA_MODULES.map((module, index) => (
            <div
              key={module.number}
              className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-primary/20 animate-fade-up relative ${
                index % 2 === 1 ? "md:ml-12" : "md:mr-12"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Module icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary italic">
                  Módulo 0{module.number} – {module.title}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Topics */}
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ArrowRight className="w-3 h-3 text-foreground" />
                        </div>
                        <span className="text-foreground text-sm md:text-base">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Module Image */}
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="relative">
                    <img
                      src={module.image}
                      alt={`Módulo ${module.number} - ${module.title}`}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    {/* Laptop frame effect */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-2 bg-gray-400 rounded-b-lg" />
                  </div>
                </div>
              </div>

              {/* Connector arrow for flow */}
              {index < MENTORIA_MODULES.length - 1 && (
                <div className="hidden md:block absolute -bottom-6 right-8 text-primary">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                    <path
                      d="M2 2C10 2 20 12 38 22"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M30 16L38 22L32 22"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
