import logoVirada from "@/assets/logo-virada.png";
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
    <footer className="bg-[#0a0a0a] text-white/90 py-20 border-t border-primary/20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Logo centralizada */}
        <div className="flex justify-center mb-14">
          <img 
            src={logoVirada} 
            alt="Imersão A Virada da Arquiteta" 
            className="w-56 md:w-72 h-auto object-contain rounded-lg"
          />
        </div>

        {/* Linha decorativa dourada */}
        <div className="flex justify-center mb-12">
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Grid de navegação e redes */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          
          {/* Navegação */}
          <div className="text-center md:text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-primary/80">
              Navegação
            </h4>
            <nav className="grid grid-cols-3 gap-x-4 gap-y-3">
              {footerLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="text-sm text-white/50 hover:text-primary transition-colors duration-300 text-left py-1 hover:translate-x-1 transform"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Redes Sociais */}
          <div className="text-center md:text-right">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-primary/80">
              Siga-nos
            </h4>
            
            <div className="flex justify-center md:justify-end gap-4 mb-5">
              <a 
                href="https://instagram.com/inovandonasuaobra" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative border border-primary/30 hover:border-primary hover:bg-primary/10 p-3.5 rounded-md transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                <div className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
            
            <p className="text-sm text-white/40 font-light">
              @inovandonasuaobra
            </p>
          </div>
        </div>
        
        {/* Divisor */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/30 text-center md:text-left">
              Imersão A Virada da Arquiteta © {new Date().getFullYear()} • Todos os direitos reservados
            </p>
            
            {/* Voltar ao Topo */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-xs text-white/40 hover:text-primary transition-colors duration-300"
            >
              <span className="uppercase tracking-[0.15em] font-medium">Voltar ao Topo</span>
              <div className="border border-primary/30 group-hover:border-primary group-hover:bg-primary/10 p-2 rounded transition-all duration-300">
                <ArrowUp className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;