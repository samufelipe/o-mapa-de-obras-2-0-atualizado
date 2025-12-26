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

const Index = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
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
