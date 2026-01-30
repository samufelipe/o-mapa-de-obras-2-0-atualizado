import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";

export default function MentoriaMentors() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-4 animate-fade-up">
          Quem <span className="text-primary">somos nós?</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up animation-delay-100">
          Conheça as mentoras que vão guiar sua transformação profissional.
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Image */}
          <div className="animate-fade-up animation-delay-200">
            <img
              src={MENTORIA_IMAGES.mentors}
              alt="Ingrid Zarza e Fernanda Bradaschia"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Bio Content */}
          <div className="animate-fade-up animation-delay-300 space-y-6">
            <div className="bg-background rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-2">Ingrid Zarza</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Arquiteta e Urbanista, especialista em gestão de obras residenciais. 
                Já gerenciou mais de 50 projetos e desenvolveu o Método Inovando para 
                ajudar profissionais a terem mais controle e menos estresse em suas obras.
              </p>
            </div>

            <div className="bg-background rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-2">Fernanda Bradaschia</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Designer de Interiores com mais de 10 anos de experiência no mercado. 
                Co-criadora da metodologia que une técnica e comportamento para 
                resultados extraordinários na gestão de obras.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                +250 alunas formadas
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                +50 obras gerenciadas
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
                5 anos de experiência
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
