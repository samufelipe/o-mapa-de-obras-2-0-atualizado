import logoIcon from "@/assets/logo-icon.svg";
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
    <footer className="bg-foreground text-background py-16 border-t border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Logo e Navegação */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Coluna 1 - Logo e Descrição */}
          <div className="text-center md:text-left space-y-4">
            <img 
              src={logoIcon} 
              alt="Cronograma O Mapa de Obras 2.0" 
              className="w-20 h-20 mx-auto md:mx-0 object-contain" 
            />
            <p className="text-sm text-background/60 leading-relaxed">
              A imersão definitiva para arquitetas que querem dominar a execução de obras de interiores.
            </p>
          </div>
          
          {/* Coluna 2 - Links de Navegação */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-primary">
              Navegação
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="text-sm text-background/60 hover:text-primary transition-colors text-left py-1"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Coluna 3 - Contato e Redes */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-black uppercase tracking-wider mb-4 text-primary">
              Redes Sociais
            </h4>
            <div className="flex justify-center md:justify-start gap-4 mb-6">
              <a 
                href="https://instagram.com/inovandonasuaobra" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-background/10 hover:bg-primary hover:text-foreground p-3 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-background/60">
              @inovandonasuaobra
            </p>
          </div>
        </div>
        
        {/* Linha divisória */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-background/40 text-center md:text-left">
              Cronograma O Mapa de Obras 2.0 • Todos os Direitos Reservados • {new Date().getFullYear()}
            </p>
            
            {/* Botão Voltar ao Topo */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs text-background/60 hover:text-primary transition-colors group"
            >
              <span className="uppercase tracking-wider">Voltar ao Topo</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;