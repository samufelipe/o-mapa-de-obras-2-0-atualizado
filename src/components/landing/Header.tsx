import logoIcon from "@/assets/logo-cronograma-icon.svg";

const Header = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("registration-form");
    heroSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border py-2" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo-mobile.png"
            alt="Cronograma 2.0"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </div>

        <button
          onClick={scrollToForm}
          className="bg-green-600 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-all duration-300 border border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95"
        >
          Inscrever-se
        </button>
      </div>
    </header>
  );
};

export default Header;