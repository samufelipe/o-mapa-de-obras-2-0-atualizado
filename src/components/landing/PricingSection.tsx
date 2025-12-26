import { Check, Shield } from "lucide-react";

const pricingItems = [
  { name: "Imersão Cronograma 2.0 (Ao Vivo)", price: "R$ 197,00" },
  { name: "Matriz de Sequência Ideal", price: "R$ 497,00" },
  { name: "Checklist de Visita Técnica", price: "R$ 197,00" },
  { name: "Guia de Postura e Liderança", price: "R$ 297,00" },
  { name: "Acesso ao Grupo VIP", price: "Incluso" },
];

const PricingSection = () => {
  const scrollToForm = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-primary/30 rounded-lg overflow-hidden">
            <div className="bg-primary/10 p-4 text-center">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                Oferta Ativa
              </span>
            </div>
            
            <div className="p-8 space-y-6">
              <ul className="space-y-4">
                {pricingItems.map((item, index) => (
                  <li key={index} className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {item.price !== "Incluso" ? `Pagaria: ${item.price}` : item.price}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground text-center mb-6">
                  Preço total se comprado separadamente:{" "}
                  <span className="line-through">R$ 1.188,00</span>
                </p>
                
                <div className="text-center mb-6">
                  <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                    Investimento Único
                  </span>
                  <div className="text-5xl font-black">
                    <span className="text-primary">APENAS R$ 49,90</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Acesso vitalício aos materiais bônus (liberados pós-live)
                  </p>
                </div>
                
                <button
                  onClick={scrollToForm}
                  className="w-full bg-primary text-primary-foreground py-4 font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                  Garantir Minha Vaga Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
