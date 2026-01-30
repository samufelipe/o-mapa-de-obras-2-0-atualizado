import { useEffect } from "react";
import MentoriaHeader from "@/components/mentoria/MentoriaHeader";
import MentoriaHero from "@/components/mentoria/MentoriaHero";
import MentoriaSkills from "@/components/mentoria/MentoriaSkills";
import MentoriaAudience from "@/components/mentoria/MentoriaAudience";
import MentoriaHowItWorks from "@/components/mentoria/MentoriaHowItWorks";
import MentoriaInside from "@/components/mentoria/MentoriaInside";
import MentoriaModules from "@/components/mentoria/MentoriaModules";
import MentoriaMentors from "@/components/mentoria/MentoriaMentors";
import MentoriaRevenue from "@/components/mentoria/MentoriaRevenue";
import MentoriaPricing from "@/components/mentoria/MentoriaPricing";
import MentoriaGuarantee from "@/components/mentoria/MentoriaGuarantee";
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
        <MentoriaInside />
        <MentoriaModules />
        <MentoriaMentors />
        <MentoriaRevenue />
        <MentoriaPricing />
        <MentoriaGuarantee />
        <MentoriaFAQ />
      </main>
      <MentoriaFooter />
      <MentoriaMobileCTA onClick={scrollToPricing} />
    </div>
  );
}
