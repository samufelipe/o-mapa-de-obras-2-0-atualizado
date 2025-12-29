import logoVirada from "@/assets/logo-virada.png";

const Header = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border py-3" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={logoVirada} 
            alt="Imersão A Virada da Arquiteta" 
            className="h-12 md:h-14 w-auto object-contain"
          />
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
