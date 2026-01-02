import logoIcon from "@/assets/logo-cronograma-icon.svg";

const Header = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border py-2" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logoIcon} 
            alt="Cronograma 2.0" 
            className="h-10 md:h-12 w-auto"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-xs md:text-sm font-bold text-foreground tracking-wide">CRONOGRAMA 2.0</span>
            <span className="text-[10px] md:text-xs text-primary font-medium">O Mapa da Obra</span>
          </div>
        </div>
        
        <button
          onClick={scrollToForm}
          className="bg-foreground text-primary px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-foreground transition-all border border-foreground shadow-hard active:scale-95"
        >
          Inscrever-se
        </button>
      </div>
    </header>
  );
};

export default Header;
