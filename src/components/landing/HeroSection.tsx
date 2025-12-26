import { Trophy, Video, Lock, Clock, Users, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };
    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "https://checkout.hotmart.com/YOUR_LINK";
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-background overflow-hidden">
      <div className="bg-grid-overlay"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-foreground px-3 py-1 border border-primary shadow-hard mx-auto lg:mx-0">
              <Clock className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-black text-background uppercase tracking-wider">
                O Lote 01 Expira em: <span className="text-primary tabular-nums">{timeLeft.h}h {timeLeft.m}m {timeLeft.s}s</span>
              </span>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
              A Sequência que Protege seu <br className="hidden md:block"/>
              <span className="text-primary italic">Design e seu Lucro.</span>
            </h1>
            
            <p className="text-sm md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Domine a sequência ideal de serviços com o <strong className="text-foreground">Cronograma O Mapa de Obras 2.0</strong> e elimine o retrabalho na sua execução com segurança técnica absoluta.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                <Trophy className="w-3 h-3 text-primary" /> +250 Obras Entregues
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-primary text-[9px] font-bold uppercase tracking-wider shadow-hard">
                <Video className="w-3 h-3" /> AO VIVO NO ZOOM
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div id="ingresso" className="scroll-mt-24 animate-fade-up">
            <div className="bg-card border-2 border-foreground p-6 md:p-8 shadow-gold max-w-md mx-auto">
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-lg font-black uppercase tracking-tight">Vaga Exclusiva</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Workshop Imersivo • Sábado 31/01</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  required 
                  type="text" 
                  placeholder="Nome Completo" 
                  className="w-full bg-secondary border-b border-border py-3 px-1 text-xs font-medium focus:border-primary outline-none transition-colors" 
                />
                <input 
                  required 
                  type="email" 
                  placeholder="E-mail Profissional" 
                  className="w-full bg-secondary border-b border-border py-3 px-1 text-xs font-medium focus:border-primary outline-none transition-colors" 
                />
                <input 
                  required 
                  type="tel" 
                  placeholder="WhatsApp" 
                  className="w-full bg-secondary border-b border-border py-3 px-1 text-xs font-medium focus:border-primary outline-none transition-colors" 
                />

                <div className="pt-4">
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-muted-foreground line-through uppercase">R$ 197,00</span>
                      <span className="text-3xl font-black tracking-tighter animate-pulse-slow">R$ 49,90</span>
                    </div>
                    <span className="text-[9px] font-black text-primary bg-foreground px-2 py-1 uppercase tracking-widest shadow-hard">LOTE 01</span>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-foreground text-primary py-4 flex items-center justify-center gap-2 text-[10px] font-black tracking-widest hover:bg-primary hover:text-foreground transition-all border-2 border-foreground shadow-hard uppercase group"
                  >
                    RESERVAR MEU LUGAR <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
              <p className="mt-4 text-center text-[7px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-1">
                <Lock className="w-2 h-2" /> Pagamento 100% Seguro via Hotmart
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Bar */}
      <div className="mt-16 border-y border-border bg-secondary">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-muted-foreground/50">
            <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
              <Users className="w-4 h-4" /> +1000 Arquitetas Impactadas
            </div>
            <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
              <Star className="w-4 h-4 fill-current" /> Avaliação 4.9/5.0
            </div>
            <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Método Validado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
