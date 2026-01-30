import { useEffect } from "react";
import MentoriaHeader from "@/components/mentoria/MentoriaHeader";
import MentoriaHero from "@/components/mentoria/MentoriaHero";
import MentoriaSkills from "@/components/mentoria/MentoriaSkills";
import MentoriaAudience from "@/components/mentoria/MentoriaAudience";
import MentoriaHowItWorks from "@/components/mentoria/MentoriaHowItWorks";
import MentoriaModules from "@/components/mentoria/MentoriaModules";
import MentoriaDocuments from "@/components/mentoria/MentoriaDocuments";
import MentoriaRevenue from "@/components/mentoria/MentoriaRevenue";
import MentoriaPricing from "@/components/mentoria/MentoriaPricing";
import MentoriaTestimonials from "@/components/mentoria/MentoriaTestimonials";
import MentoriaGuarantee from "@/components/mentoria/MentoriaGuarantee";
import MentoriaMentors from "@/components/mentoria/MentoriaMentors";
import MentoriaFAQ from "@/components/mentoria/MentoriaFAQ";
import MentoriaFooter from "@/components/mentoria/MentoriaFooter";
import MentoriaMobileCTA from "@/components/mentoria/MentoriaMobileCTA";

export default function MentoriaLanding() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = "Mentoria Inovando na sua Obra | Cronograma Inteligente";
  }, []);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MentoriaHeader onCtaClick={scrollToPricing} />
      <main>
        <MentoriaHero onCtaClick={scrollToPricing} />
        <MentoriaSkills />
        <MentoriaAudience />
        <MentoriaHowItWorks />
        <MentoriaModules />
        <MentoriaDocuments />
        <MentoriaRevenue />
        <MentoriaPricing />
        <MentoriaTestimonials onCtaClick={scrollToPricing} />
        <MentoriaGuarantee />
        <MentoriaMentors />
        <MentoriaFAQ />
      </main>
      <MentoriaFooter />
      <MentoriaMobileCTA onClick={scrollToPricing} />
    </div>
  );
}
