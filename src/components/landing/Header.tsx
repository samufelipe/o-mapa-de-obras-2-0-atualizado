import logoWhiteGold from "@/assets/logo-white-gold.png";

const Header = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logoWhiteGold} 
            alt="Cronograma O Mapa de Obras 2.0" 
            className="h-6 w-auto"
          />
          <span className="text-xs font-medium tracking-widest uppercase hidden sm:block">
            Cronograma O Mapa de Obras 2.0
          </span>
        </div>
        
        <button
          onClick={scrollToForm}
          className="border border-foreground text-foreground px-5 py-2 text-xs font-medium uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
        >
          Inscrever-se
        </button>
      </div>
    </header>
  );
};

export default Header;
