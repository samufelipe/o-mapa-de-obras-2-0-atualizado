import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import HeroSectionNatal from "@/components/landing/HeroSectionNatal";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PainMechanismSection from "@/components/landing/PainMechanismSection";
import ClosingOfferSection from "@/components/landing/ClosingOfferSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import { initAllTracking, trackCTAClick, trackSectionView, trackBeginCheckout } from "@/lib/gtm-tracking";
import { trackInitiateCheckout } from "@/lib/tracking";
import { CTAProvider } from "@/lib/cta-context";
import {
  NATAL_CHECKOUT_URL,
  NATAL_PRICE,
  NATAL_PRODUCT_NAME,
  NATAL_FAQ,
  NATAL_FOOTER_LINKS,
} from "@/lib/natal-constants";

const NATAL_FAVICONS: Array<{ rel: string; sizes?: string; href: string }> = [
  { rel: "icon", sizes: "16x16", href: "/brand-natal/favicon-16.png" },
  { rel: "icon", sizes: "32x32", href: "/brand-natal/favicon-32.png" },
  { rel: "icon", sizes: "48x48", href: "/brand-natal/favicon-48.png" },
  { rel: "icon", sizes: "64x64", href: "/brand-natal/favicon-64.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/brand-natal/apple-touch-icon-180.png" },
];

const NatalLogo = () => (
  <div className="flex items-center gap-2.5">
    <img src="/brand-natal/simbolo.png" alt="" className="h-10 md:h-12 w-auto object-contain" />
    <span className="font-display font-bold normal-case leading-none text-foreground text-sm md:text-base tracking-tight">
      Cronograma
      <span className="block text-[0.65em] font-bold tracking-[0.15em] uppercase text-muted-foreground">
        Obra Pronta pro Natal
      </span>
    </span>
  </div>
);

const NatalLanding = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    initAllTracking();
  }, []);

  // Troca favicon/apple-touch-icon so pra essa LP, restaurando ao sair (SPA navigation)
  useEffect(() => {
    const originalTitle = document.title;
    const createdOrChanged: Array<{ el: HTMLLinkElement; prevHref: string | null; created: boolean }> = [];

    NATAL_FAVICONS.forEach(({ rel, sizes, href }) => {
      let el = document.querySelector<HTMLLinkElement>(
        sizes ? `link[rel="${rel}"][sizes="${sizes}"]` : `link[rel="${rel}"]`
      );
      let created = false;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        if (sizes) el.setAttribute("sizes", sizes);
        document.head.appendChild(el);
        created = true;
      }
      createdOrChanged.push({ el, prevHref: created ? null : el.href, created });
      el.href = href;
    });

    document.title = "Imersão Cronograma Especial de Natal | Inovando na Sua Obra";

    return () => {
      document.title = originalTitle;
      createdOrChanged.forEach(({ el, prevHref, created }) => {
        if (created) {
          el.remove();
        } else if (prevHref) {
          el.href = prevHref;
        }
      });
    };
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
    trackInitiateCheckout(NATAL_PRICE, "inscricao-cronograma-natal", NATAL_PRODUCT_NAME);
    trackBeginCheckout(NATAL_PRICE, NATAL_PRODUCT_NAME);
    const url = new URL(NATAL_CHECKOUT_URL);
    const currentParams = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach((param) => {
      const val = currentParams.get(param);
      if (val) url.searchParams.set(param, val);
    });
    window.location.href = url.toString();
  };

  const scrollToForm = () => {
    trackCTAClick("sticky_cta", "mobile_bottom_natal", "GARANTIR MINHA VAGA");
    handleCTA();
  };

  return (
    <CTAProvider value={handleCTA}>
    <div className="natal-theme min-h-screen bg-background text-foreground">
      <Header logoNode={<NatalLogo />} />
      <HeroSectionNatal />
      <TestimonialsSection />
      <PainMechanismSection />
      <ClosingOfferSection />
      <FAQSection items={NATAL_FAQ} title="Dúvidas Sobre a Imersão de Natal" />
      <Footer links={NATAL_FOOTER_LINKS} productLabel={NATAL_PRODUCT_NAME} logoNode={<NatalLogo />} />

      {/* Sticky Mobile CTA */}
      <div className={`fixed bottom-0 left-0 w-full z-[100] md:hidden transition-all duration-500 transform bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 ${showStickyCTA ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
        <button
          onClick={scrollToForm}
          className="w-full bg-green-600 text-white py-4 px-4 text-xs sm:text-sm font-black uppercase tracking-wide shadow-2xl border-2 border-green-600 flex items-center justify-between group active:scale-95 hover:bg-green-700 transition-colors duration-300"
        >
          <span>GARANTIR MINHA VAGA</span>
          <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    </CTAProvider>
  );
};

export default NatalLanding;
