import { Trophy, Video, Shield, Star, CheckCircle } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <CountdownTimer />
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight">
                A Sequência que Protege seu{" "}
                <span className="text-primary italic">Design e seu Lucro.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Domine a sequência ideal de serviços com o{" "}
                <strong className="text-foreground">Cronograma O Mapa de Obras 2.0</strong>{" "}
                e elimine o retrabalho na sua execução com segurança técnica absoluta.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 text-sm">
                <Trophy className="w-4 h-4 text-primary" />
                <span>+250 Obras Entregues</span>
              </div>
              
              <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium">
                <Video className="w-4 h-4" />
                <span>Ao Vivo no Zoom</span>
              </div>
            </div>
          </div>
          
          {/* Right Form Card */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold uppercase">Vaga Exclusiva</h2>
              <p className="text-muted-foreground text-sm">
                Workshop Imersivo • Sábado 31/01
              </p>
            </div>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nome Completo"
                className="w-full bg-background border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="E-mail Profissional"
                className="w-full bg-background border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                className="w-full bg-background border-b border-border py-3 px-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </form>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground line-through text-sm">R$ 197,00</span>
                  <div className="text-3xl font-bold">R$ 49,90</div>
                </div>
                <span className="bg-secondary text-foreground text-xs font-bold uppercase px-3 py-1 rounded">
                  Lote 01
                </span>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
              >
                Reservar Meu Lugar
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                <Shield className="w-4 h-4" />
                <span>Pagamento 100% Seguro via Hotmart</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">+1000 Arquitetas Impactadas</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Avaliação 4.9/5.0</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Método Validado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
