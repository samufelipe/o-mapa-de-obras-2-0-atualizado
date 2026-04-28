import logoFooter from "@/assets/logo-footer.svg";
import { Instagram, ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Início", sectionId: "hero" },
  { label: "O Problema", sectionId: "problems" },
  { label: "Sobre", sectionId: "about" },
  { label: "Para Quem É", sectionId: "qualification" },
  { label: "Como Funciona", sectionId: "steps" },
  { label: "Programação", sectionId: "schedule" },
  { label: "Bônus", sectionId: "bonus" },
  { label: "Garantia", sectionId: "guarantee" },
  { label: "Dúvidas", sectionId: "faq" },
];

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo-mobile.png"
            alt="Cronograma 2.0: O Mapa da Obra"
            className="h-20 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-10">

          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-primary">
              Navegação
            </h4>
            <nav className="grid grid-cols-3 gap-x-4 gap-y-3">
              {footerLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300 text-left py-1 hover:translate-x-1 transform"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-primary">
              Siga-nos
            </h4>

            <div className="flex justify-center md:justify-end gap-4 mb-5">
              <a
                href="https://instagram.com/inovandonasuaobra"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background hover:bg-primary hover:text-foreground transition-all duration-300 shadow-sm hover:shadow-premium hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm text-foreground/70 font-medium">
              @inovandonasuaobra
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <p className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/60 text-center md:text-left">
              Imersão Cronograma 2.0 © {new Date().getFullYear()} • Todos os direitos reservados
            </p>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              <span className="uppercase tracking-[0.15em] font-medium">Voltar ao Topo</span>
              <div className="border border-primary/30 group-hover:border-primary group-hover:bg-primary/10 p-2 rounded transition-all duration-300">
                <ArrowUp className="w-4 h-4 text-primary group-hover:text-primary group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;