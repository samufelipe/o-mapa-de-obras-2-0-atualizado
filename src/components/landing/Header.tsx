import logoWhiteGold from "@/assets/logo-white-gold.png";

const Header = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logoWhiteGold} 
            alt="Cronograma O Mapa de Obras 2.0" 
            className="h-8 w-auto"
          />
          <span className="text-sm font-semibold tracking-wide uppercase hidden sm:block">
            Cronograma O Mapa de Obras 2.0
          </span>
        </div>
        
        <button
          onClick={scrollToForm}
          className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          Inscrever-se
        </button>
      </div>
    </header>
  );
};

export default Header;
