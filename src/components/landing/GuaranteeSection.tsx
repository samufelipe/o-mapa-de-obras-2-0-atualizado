import { ShieldCheck } from "lucide-react";

const GuaranteeSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-6xl font-black text-primary">7</span>
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-black uppercase">
                Garantia Incondicional
              </h2>
              <p className="text-muted-foreground">de 7 Dias</p>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Inscreva-se com tranquilidade absoluta. Se você participar da imersão e sentir 
            que o conteúdo não é para você, basta solicitar o reembolso total em até 7 dias. 
            <strong className="text-foreground"> O risco é todo nosso.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
