import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemsSection from "@/components/landing/ProblemsSection";
import AboutSection from "@/components/landing/AboutSectionObraPronta";
import QualificationSection from "@/components/landing/QualificationSection";
import StepsSection from "@/components/landing/StepsSectionObraPronta";
import ScheduleSection from "@/components/landing/ScheduleSectionObraPronta";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BonusSection from "@/components/landing/BonusSectionObraPronta";
import GuaranteeSection from "@/components/landing/GuaranteeSectionObraPronta";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import { initAllTracking, trackCTAClick, trackSectionView, trackBeginCheckout } from "@/lib/gtm-tracking";
import { trackInitiateCheckout } from "@/lib/tracking";
import { CTAProvider } from "@/lib/cta-context";
import { FAQ_ITEMS_OBRA_PRONTA, OBRA_PRONTA_CHECKOUT_URL } from "@/lib/constants-obra-pronta";

// Lockup de texto temporário (sem imagem de logo): a logo oficial da Natal
// tem "ATÉ O NATAL" escrito na própria imagem, incompatível com o novo nome
// "Imersão Cronograma Obra Pronta". Troca por uma logo de verdade quando
// existir uma sem elementos natalinos.
const HeaderTextLogo = () => (
  <span className="flex flex-col items-start leading-none">
    <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-foreground/70">Imersão</span>
    <span className="block -ml-0.5 md:-ml-1 text-lg md:text-2xl font-bold tracking-tight uppercase text-primary">Cronograma</span>
    <span className="block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-foreground/70">Obra Pronta</span>
  </span>
);

const FooterTextLogo = () => (
  <div className="text-center">
    <span className="block text-xs font-bold tracking-[0.3em] uppercase text-foreground/70">Imersão</span>
    <span className="block text-3xl md:text-4xl font-bold tracking-tight uppercase text-primary">Cronograma</span>
    <span className="block text-xs font-bold tracking-[0.3em] uppercase text-foreground/70">Obra Pronta</span>
  </div>
);

const Index = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Initialize GTM tracking on mount
  useEffect(() => {
    initAllTracking();
  }, []);

  // Título da aba: novo nome, sem menção a Natal. Favicon fica intocado de
  // propósito (mantém o que já existe em inscricao.imersao...).
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Imersão Cronograma Obra Pronta | Inovando na Sua Obra";
    return () => {
      document.title = originalTitle;
    };
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

  // CTA unico da pagina: sem formulario de nome/telefone, todo clique vai
  // direto para o checkout do Hotmart, preservando UTMs/fbclid da URL atual
  // para nao perder atribuicao de campanha.
  const handleCTA = () => {
    trackInitiateCheckout(29.90);
    trackBeginCheckout(29.90, "Imersão Cronograma Obra Pronta");
    const url = new URL(OBRA_PRONTA_CHECKOUT_URL);
    const currentParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((param) => {
      const val = currentParams.get(param);
      if (val) url.searchParams.set(param, val);
    });
    window.location.href = url.toString();
  };

  const handleStickyCTA = () => {
    trackCTAClick("sticky_cta", "mobile_bottom", "QUERO MINHA VAGA AGORA");
    handleCTA();
  };

  return (
    <CTAProvider value={handleCTA}>
    <div className="natal-theme cta-green min-h-screen bg-background text-foreground">
      <Header logoNode={<HeaderTextLogo />} />
      <HeroSection />
      <TestimonialsSection />
      <ProblemsSection />
      <AboutSection />
      <QualificationSection />
      <StepsSection />
      <ScheduleSection />
      <BonusSection />
      <GuaranteeSection />
      <FAQSection items={FAQ_ITEMS_OBRA_PRONTA} />
      <Footer productLabel="Imersão Cronograma Obra Pronta" logoNode={<FooterTextLogo />} />

      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 w-full z-[100] md:hidden transition-all duration-500 transform bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 ${showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <button
          onClick={handleStickyCTA}
          className="w-full bg-green-600 text-white py-4 px-6 text-sm font-black uppercase tracking-widest shadow-2xl border-2 border-green-600 flex items-center justify-between group active:scale-95 hover:bg-green-700 transition-colors duration-300"
        >
          <span>QUERO MINHA VAGA AGORA</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    </CTAProvider>
  );
};

export default Index;
