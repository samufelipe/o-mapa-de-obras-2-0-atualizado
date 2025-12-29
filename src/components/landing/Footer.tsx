import logoIcon from "@/assets/logo-icon.svg";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-border text-center space-y-4">
      <img 
        src={logoIcon} 
        alt="Cronograma O Mapa de Obras 2.0" 
        className="w-20 h-20 mx-auto opacity-60 object-contain" 
      />
      <div className="flex justify-center gap-6">
        <a 
          href="https://instagram.com/inovandonasuaobra" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-muted-foreground hover:text-foreground transition-colors" 
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
      <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Cronograma O Mapa de Obras 2.0 • Todos os Direitos Reservados • {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
