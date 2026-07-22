import { useCTA } from "@/lib/cta-context";
import { NATAL_PRICE, NATAL_EVENT_DATE_LABEL } from "@/lib/natal-constants";

const MidCTASection = () => {
  const handleCTA = useCTA();

  return (
    <section className="py-12 md:py-16 bg-secondary reveal">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <p className="text-sm md:text-base font-bold uppercase tracking-widest text-primary mb-3">
          Ao vivo · {NATAL_EVENT_DATE_LABEL}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">
          Essas arquitetas já garantiram a vaga delas. A sua ainda está disponível.
        </h2>
        <button
          onClick={handleCTA}
          className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 text-base sm:text-lg font-bold uppercase tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95"
        >
          Garantir minha vaga · R$ {NATAL_PRICE.toFixed(2).replace(".", ",")}
        </button>
      </div>
    </section>
  );
};

export default MidCTASection;
