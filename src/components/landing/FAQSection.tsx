import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { trackFAQClick } from "@/lib/gtm-tracking";

const FAQSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleFaqClick = (idx: number, question: string) => {
    const isOpening = openFaqIndex !== idx;
    setOpenFaqIndex(isOpening ? idx : null);
    trackFAQClick(question, isOpening);
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 uppercase tracking-widest">Dúvidas Frequentes</h2>
        <div className="space-y-3 mt-8">
          {FAQ_ITEMS.map((faq, idx) => (
            <div key={idx} className="bg-card border border-border overflow-hidden shadow-sm">
              <button
                onClick={() => handleFaqClick(idx, faq.question)}
                className="w-full flex justify-between items-center px-6 py-5 text-left group"
                data-track="faq_item"
                data-track-location="faq_section"
              >
                <span className="font-bold text-sm md:text-base uppercase tracking-wider group-hover:text-primary transition-colors">{faq.question}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
              </button>
              {openFaqIndex === idx && (
                <div className="px-6 pb-6 text-muted-foreground text-sm md:text-base font-medium leading-relaxed border-t border-border pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;