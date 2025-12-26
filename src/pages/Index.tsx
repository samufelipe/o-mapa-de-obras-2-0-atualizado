import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemsSection from "@/components/landing/ProblemsSection";
import AboutSection from "@/components/landing/AboutSection";
import QualificationSection from "@/components/landing/QualificationSection";
import StepsSection from "@/components/landing/StepsSection";
import ScheduleSection from "@/components/landing/ScheduleSection";
import BonusSection from "@/components/landing/BonusSection";
import GuaranteeSection from "@/components/landing/GuaranteeSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import { initAllTracking, trackCTAClick, trackSectionView } from "@/lib/gtm-tracking";

const Index = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Initialize GTM tracking on mount
  useEffect(() => {
    initAllTracking();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal effect + section tracking
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section[id]');
    const trackedSections = new Set<string>();

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && !trackedSections.has(sectionId)) {
            trackedSections.add(sectionId);
            trackSectionView(sectionId);
          }
        }
      });
    }, { threshold: 0.3 });

    revealElements.forEach(el => revealObserver.observe(el));
    sections.forEach(el => sectionObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const scrollToForm = () => {
    trackCTAClick("sticky_cta", "mobile_bottom", "QUERO MINHA VAGA AGORA");
    const el = document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ProblemsSection />
      <AboutSection />
      <QualificationSection />
      <StepsSection />
      <ScheduleSection />
      <BonusSection />
      <GuaranteeSection />
      <FAQSection />
      <Footer />

      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 w-full p-4 z-[100] md:hidden transition-all duration-500 transform ${showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <button 
          onClick={scrollToForm}
          className="w-full bg-primary text-foreground py-4 px-6 text-[10px] font-black uppercase tracking-widest shadow-2xl border-2 border-foreground flex items-center justify-between group active:scale-95"
        >
          <span>QUERO MINHA VAGA AGORA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Index;
