import { useCTA } from "@/lib/cta-context";
import { NATAL_PRICE } from "@/lib/natal-constants";

const MidCTASection = () => {
  const handleCTA = useCTA();

  return (
    <section className="py-10 md:py-12 bg-secondary reveal">
      <div className="container mx-auto px-4 max-w-xl text-center">
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
