import { ReactNode } from "react";
import logoIcon from "@/assets/logo-cronograma-icon.svg";
import { useCTA } from "@/lib/cta-context";

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  logoNode?: ReactNode;
}

const Header = ({ logoSrc = "/logo-mobile.png", logoAlt = "Cronograma 2.0", logoNode }: HeaderProps) => {
  const handleCTA = useCTA();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border py-2" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
        <button
          onClick={scrollToTop}
          aria-label="Voltar ao início da página"
          className="flex items-center gap-3 min-w-0 shrink"
        >
          {logoNode ?? (
            <img
              src={logoSrc}
              alt={logoAlt}
              className="h-20 md:h-24 w-auto object-contain"
            />
          )}
        </button>

        <button
          onClick={handleCTA}
          className="bg-green-600 text-white px-3 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-all duration-300 border border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95 whitespace-nowrap shrink-0"
        >
          Inscrever-se
        </button>
      </div>
    </header>
  );
};

export default Header;