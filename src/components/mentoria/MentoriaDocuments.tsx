import { MENTORIA_DOCUMENTS, MENTORIA_BONUS_EXPERTS, MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { ArrowRight } from "lucide-react";

const expertImages: Record<string, string> = {
  luciana: MENTORIA_IMAGES.bonusLuciana,
  imira: MENTORIA_IMAGES.bonusImira,
  juliana: MENTORIA_IMAGES.bonusJuliana,
  renata: MENTORIA_IMAGES.bonusRenata,
};

export default function MentoriaDocuments() {
  return (
    <section className="py-16 md:py-20 bg-[#f5f0e8]">
      <div className="container mx-auto px-4">
        {/* Documents Pack */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-12 animate-fade-up">
          Pack de documentos que você vai<br />receber:
        </h2>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-up animation-delay-100">
              <ul className="space-y-3">
                {MENTORIA_DOCUMENTS.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-3 h-3 text-foreground" />
                    </div>
                    <span className="text-foreground text-sm md:text-base">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-up animation-delay-200 flex justify-center">
              <img 
                src={MENTORIA_IMAGES.documentsIcon} 
                alt="Pack de documentos"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bonus Experts */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-primary italic mb-2 animate-fade-up">
          Aulas Bônus exclusivas!
        </h2>
        <h3 className="text-xl md:text-2xl font-bold text-center text-foreground mb-12 animate-fade-up animation-delay-100">
          Time de Especialistas
        </h3>

        {/* Experts Grid - Staggered Layout */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
            {/* Luciana - Top Left */}
            <div className="flex flex-col items-center md:items-end animate-fade-up">
              <div className="relative">
                <p className="text-primary font-bold text-xs md:text-sm mb-1 text-center md:text-right">LUCIANA GUERRA</p>
                <p className="text-foreground text-[10px] md:text-xs italic text-center md:text-right mb-2">Iluminação aplicada na<br />Arquitetura e na Obra</p>
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary overflow-hidden mx-auto md:mx-0">
                  <img 
                    src={expertImages.luciana} 
                    alt="Luciana Guerra"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Juliana - Top Right */}
            <div className="flex flex-col items-center md:items-start animate-fade-up animation-delay-100">
              <div className="relative">
                <p className="text-primary font-bold text-xs md:text-sm mb-1 text-center md:text-left">JULIANA CAMPELO</p>
                <p className="text-foreground text-[10px] md:text-xs italic text-center md:text-left mb-2">Gestão de escritório de<br />Arquitetura</p>
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary overflow-hidden mx-auto md:mx-0">
                  <img 
                    src={expertImages.juliana} 
                    alt="Juliana Campelo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Imira - Bottom Left */}
            <div className="flex flex-col items-center md:items-end animate-fade-up animation-delay-200">
              <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary overflow-hidden mx-auto md:mx-0 mb-2">
                  <img 
                    src={expertImages.imira} 
                    alt="Imira de Holanda"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-primary font-bold text-xs md:text-sm mb-1 text-center md:text-right">IMIRA DE HOLANDA</p>
                <p className="text-foreground text-[10px] md:text-xs italic text-center md:text-right">Marketing para Arquitetos</p>
              </div>
            </div>

            {/* Renata - Bottom Right */}
            <div className="flex flex-col items-center md:items-start animate-fade-up animation-delay-300">
              <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-primary overflow-hidden mx-auto md:mx-0 mb-2">
                  <img 
                    src={expertImages.renata} 
                    alt="Renata Fuentes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-primary font-bold text-xs md:text-sm mb-1 text-center md:text-left">RENATA FUENTES</p>
                <p className="text-foreground text-[10px] md:text-xs italic text-center md:text-left">Rochas Naturais nos<br />projetos de Arquitetura</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-primary italic text-base md:text-lg animate-fade-up">
          + aulas bônus de impermeabilização, divulgação de<br />
          projeto e aulas surpresas
        </p>
      </div>
    </section>
  );
}
