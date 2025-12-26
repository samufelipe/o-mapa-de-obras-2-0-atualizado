import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemsSection from "@/components/landing/ProblemsSection";
import AboutSection from "@/components/landing/AboutSection";
import StepsSection from "@/components/landing/StepsSection";
import ScheduleSection from "@/components/landing/ScheduleSection";
import BonusSection from "@/components/landing/BonusSection";
import PricingSection from "@/components/landing/PricingSection";
import GuaranteeSection from "@/components/landing/GuaranteeSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ProblemsSection />
      <AboutSection />
      <StepsSection />
      <ScheduleSection />
      <BonusSection />
      <PricingSection />
      <GuaranteeSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
