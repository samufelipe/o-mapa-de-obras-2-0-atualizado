import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { ShieldCheck } from "lucide-react";

export default function MentoriaGuarantee() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Guarantee Image */}
            <div className="animate-fade-up order-2 md:order-1">
              <img
                src={MENTORIA_IMAGES.guarantee}
                alt="Garantia de 15 dias"
                className="w-full max-w-sm mx-auto h-auto"
              />
            </div>

            {/* Guarantee Text */}
            <div className="animate-fade-up animation-delay-200 order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Risco <span className="text-primary">Zero</span>
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Você tem <strong className="text-foreground">15 dias de garantia incondicional</strong>. 
                Se por qualquer motivo você sentir que a mentoria não é para você, 
                basta enviar um e-mail e devolvemos 100% do seu investimento.
              </p>

              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <span>Sem burocracia</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <span>Sem perguntas</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                  <span>Reembolso em até 7 dias úteis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
