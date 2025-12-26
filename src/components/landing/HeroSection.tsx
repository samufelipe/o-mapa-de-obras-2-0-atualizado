import { Trophy, Video, Shield, Star, CheckCircle } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen pt-28 pb-12 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8 pt-4">
            <CountdownTimer />
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] uppercase tracking-tight">
                A Sequência que Protege seu{" "}
                <span className="text-primary italic font-display">Design e seu Lucro.</span>
              </h1>
              
              <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
                Domine a sequência ideal de serviços com o{" "}
                <strong className="text-foreground font-semibold">Cronograma O Mapa de Obras 2.0</strong>{" "}
                e elimine o retrabalho na sua execução com segurança técnica absoluta.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Trophy className="w-4 h-4 text-primary" />
                <span>+250 Obras Entregues</span>
              </div>
              
              <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-xs font-medium uppercase tracking-widest">
                <Video className="w-4 h-4" />
                <span>Ao Vivo no Zoom</span>
              </div>
            </div>
          </div>
          
          {/* Right Form Card */}
          <div className="bg-card border border-border p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-display uppercase tracking-wide">Vaga Exclusiva</h2>
              <p className="text-muted-foreground text-xs uppercase tracking-widest">
                Workshop Imersivo • Sábado 31/01
              </p>
            </div>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nome Completo"
                className="w-full bg-transparent border-b border-border py-3 px-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="E-mail Profissional"
                className="w-full bg-transparent border-b border-border py-3 px-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                className="w-full bg-transparent border-b border-border py-3 px-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </form>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground line-through text-xs">R$ 197,00</span>
                  <div className="text-3xl font-display">R$ 49,90</div>
                </div>
                <span className="bg-secondary text-foreground text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5">
                  Lote 01
                </span>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
              >
                Reservar Meu Lugar
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-[10px] uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                <span>Pagamento 100% Seguro via Hotmart</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof Bar */}
        <div className="mt-20 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-widest">+1000 Arquitetas Impactadas</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-xs font-medium uppercase tracking-widest">Avaliação 4.9/5.0</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-widest">Método Validado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
