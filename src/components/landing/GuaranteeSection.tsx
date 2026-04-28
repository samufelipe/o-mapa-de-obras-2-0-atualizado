import { ShieldCheck, ArrowRight } from "lucide-react";

const GuaranteeSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("registration-form");
    heroSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="guarantee" className="py-20 bg-secondary reveal">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="bg-card border border-border p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="relative">
            <ShieldCheck className="w-24 h-24 text-primary" />
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl pt-1">7</div>
          </div>
          <div className="text-left space-y-3">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Garantia Incondicional de 7 Dias</h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
              Inscreva-se com tranquilidade absoluta. Se você participar da imersão e sentir que o conteúdo não é para você, basta solicitar o reembolso total em até 7 dias. O risco é todo nosso.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">Pronta para assumir o comando da sua obra?</h3>
          <button
            onClick={scrollToForm}
            className="w-full md:w-auto bg-green-600 text-white px-6 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 flex items-center justify-center gap-2 group active:scale-95"
          >
            SIM, QUERO O CRONOGRAMA 2.0 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;