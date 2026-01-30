import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MENTORIA_FAQ } from "@/lib/mentoria-constants";

export default function MentoriaFAQ() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary mb-12 animate-fade-up">
          Perguntas Frequentes
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {MENTORIA_FAQ.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-foreground/20 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-4">
                  <span className="flex items-center gap-2">
                    <span className="text-primary font-bold">»</span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
