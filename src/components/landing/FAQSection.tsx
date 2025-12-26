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
        <h2 className="text-xl font-black text-center mb-4 uppercase tracking-widest">Dúvidas Frequentes</h2>
        <div className="space-y-2 mt-8">
          {FAQ_ITEMS.map((faq, idx) => (
            <div key={idx} className="bg-card border border-border overflow-hidden shadow-sm">
              <button 
                onClick={() => handleFaqClick(idx, faq.question)} 
                className="w-full flex justify-between items-center px-5 py-4 text-left group"
                data-track="faq_item"
                data-track-location="faq_section"
              >
                <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider group-hover:text-primary transition-colors">{faq.question}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-3.5 h-3.5 text-primary" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 text-muted-foreground text-[11px] font-medium leading-relaxed border-t border-border pt-4">
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
