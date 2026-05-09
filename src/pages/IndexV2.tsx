import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import HeroSectionV2 from "@/components/landing/HeroSectionV2";
import ProblemsSection from "@/components/landing/ProblemsSection";
import AboutSection from "@/components/landing/AboutSection";
import QualificationSection from "@/components/landing/QualificationSection";
import StepsSection from "@/components/landing/StepsSection";
import ScheduleSection from "@/components/landing/ScheduleSection";
import TransformationSection from "@/components/landing/TransformationSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BonusSection from "@/components/landing/BonusSection";
import GuaranteeSection from "@/components/landing/GuaranteeSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import { initAllTracking, trackCTAClick, trackSectionView, trackBeginCheckout } from "@/lib/gtm-tracking";
import { trackInitiateCheckout } from "@/lib/tracking";
import { CTAProvider } from "@/lib/cta-context";
import { CONFIG } from "@/lib/config";

const IndexV2 = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    initAllTracking();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("section[id]");
    const trackedSections = new Set<string>();

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("active"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          if (id && !trackedSections.has(id)) {
            trackedSections.add(id);
            trackSectionView(id);
          }
        }
      }),
      { threshold: 0.3 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    sections.forEach((el) => sectionObserver.observe(el));

    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const handleCTA = () => {
    trackInitiateCheckout(39.90);
    trackBeginCheckout();
    const url = new URL(CONFIG.hotmart.checkoutUrl);
    const currentParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((utm) => {
      const val = currentParams.get(utm);
      if (val) url.searchParams.set(utm, val);
    });
    window.location.href = url.toString();
  };

  const scrollToForm = () => {
    trackCTAClick("sticky_cta", "mobile_bottom_v2", "QUERO MINHA VAGA AGORA");
    handleCTA();
  };

  return (
    <CTAProvider value={handleCTA}>
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSectionV2 />
      <TestimonialsSection />
      <ProblemsSection />
      <AboutSection />
      <QualificationSection />
      <StepsSection />
      <ScheduleSection />
      <TransformationSection />
      <BonusSection />
      <GuaranteeSection />
      <FAQSection />
      <Footer />

      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 w-full z-[100] md:hidden transition-all duration-500 transform bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 ${showStickyCTA ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
        <button
          onClick={scrollToForm}
          className="w-full bg-green-600 text-white py-4 px-4 text-xs sm:text-sm font-black uppercase tracking-wide shadow-2xl border-2 border-green-600 flex items-center justify-between group active:scale-95 hover:bg-green-700 transition-colors duration-300"
        >
          <span>QUERO MINHA VAGA AGORA</span>
          <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    </CTAProvider>
  );
};

export default IndexV2;