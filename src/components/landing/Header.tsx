import logoBlackGold from "@/assets/logo-black-gold.png";

const Header = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border py-3" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={logoBlackGold} 
            alt="Cronograma O Mapa de Obras 2.0" 
            className="h-6 w-6 object-contain"
          />
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter text-foreground">
            Cronograma O Mapa de Obras 2.0
          </span>
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
