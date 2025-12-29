import { Check, X } from "lucide-react";
import { QUALIFICATION } from "@/lib/constants";

const QualificationSection = () => {
  return (
    <section id="qualification" className="section-spacing bg-secondary border-y border-border reveal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl">
            Essa Imersão é Para Você?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* For Who */}
          <div className="bg-card border-2 border-foreground p-8 shadow-hard">
            <h3 className="text-lg font-display uppercase tracking-tight mb-6 text-center">
              Essa Imersão é Para Você Se...
            </h3>
            <ul className="space-y-4">
              {QUALIFICATION.for.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Not For Who */}
          <div className="bg-card border border-border p-8">
            <h3 className="text-lg font-display uppercase tracking-tight mb-6 text-center text-muted-foreground">
              Não é Para Você Se...
            </h3>
            <ul className="space-y-4">
              {QUALIFICATION.notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationSection;
