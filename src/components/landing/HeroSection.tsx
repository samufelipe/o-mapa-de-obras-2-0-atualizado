import { Trophy, Video, Lock, Clock, Users, Star, ShieldCheck, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { CONFIG } from "@/lib/config";
import { submitToRDStation } from "@/lib/rdstation";
import { trackLead, trackInitiateCheckout } from "@/lib/tracking";
import { validateLeadForm, applyPhoneMask, type LeadFormData } from "@/lib/validations";
import { 
  trackFormStart, 
  trackFormFieldFocus, 
  trackFormFieldComplete, 
  trackFormSubmit, 
  trackFormError,
  trackBeginCheckout,
  trackLeadGenerated,
  trackCTAClick
} from "@/lib/gtm-tracking";

type FormStatus = "idle" | "loading" | "success" | "redirecting";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const HeroSection = () => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const formStarted = useRef(false);
  
  // Form state
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  // Handle focus - track form start and field focus
  const handleFocus = (field: keyof LeadFormData) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStart();
    }
    trackFormFieldFocus(field);
  };

  // Handle input changes
  const handleChange = (field: keyof LeadFormData, value: string) => {
    let processedValue = value;
    
    // Apply phone mask
    if (field === "phone") {
      processedValue = applyPhoneMask(value);
    }
    
    setFormData((prev) => ({ ...prev, [field]: processedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle blur for validation + track field complete
  const handleBlur = (field: keyof LeadFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Track field completion if has value
    if (formData[field]) {
      trackFormFieldComplete(field);
    }
    
    // Validate single field
    const result = validateLeadForm(formData);
    if (!result.success && result.errors) {
      const fieldError = result.errors[field];
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [field]: fieldError }));
      }
    }
  };

  // Build Hotmart URL with pre-filled data
  const buildHotmartUrl = (): string => {
    const baseUrl: string = CONFIG.hotmart.checkoutUrl;
    
    if (!CONFIG.hotmart.preFillCheckout || baseUrl === "PREENCHER_LINK_HOTMART") {
      return baseUrl;
    }
    
    // Add query params to pre-fill checkout
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.phone.replace(/\D/g, ""),
    });
    
    // Preserve UTM params
    const currentParams = new URLSearchParams(window.location.search);
    const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    utmParams.forEach((utm) => {
      const value = currentParams.get(utm);
      if (value) params.set(utm, value);
    });
    
    const hasQueryString = baseUrl.includes("?");
    const separator = hasQueryString ? "&" : "?";
    return `${baseUrl}${separator}${params.toString()}`;
  };

  // Redirect to Hotmart
  const redirectToHotmart = () => {
    setStatus("redirecting");
    
    // Track checkout initiation (Meta Pixel + GTM)
    trackInitiateCheckout(49.90);
    trackBeginCheckout();
    
    // Delay for transition screen
    setTimeout(() => {
      const url = buildHotmartUrl();
      window.location.href = url;
    }, CONFIG.form.redirectDelay);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const result = validateLeadForm(formData);
    
    if (!result.success && result.errors) {
      setErrors(result.errors);
      setTouched({ name: true, email: true, phone: true });
      
      // Track form errors
      trackFormError(result.errors);
      
      toast({
        title: "Campos inválidos",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive",
      });
      return;
    }
    
    setStatus("loading");
    setErrors({});
    
    try {
      // Submit to RD Station
      const rdResponse = await submitToRDStation(result.data!);
      
      if (!rdResponse.success) {
        // Log error but continue - don't block user from checkout
        console.warn("RD Station error:", rdResponse.message);
      }
      
      // Track lead event (Meta Pixel + GTM)
      trackLead(result.data!);
      trackFormSubmit(result.data!);
      trackLeadGenerated("landing_page_form");
      
      setStatus("success");
      
      toast({
        title: "Dados registrados!",
        description: "Redirecionando para o pagamento seguro...",
      });
      
      // Redirect to Hotmart after brief success state
      setTimeout(() => {
        redirectToHotmart();
      }, 500);

    } catch (error) {
      console.error("Form submission error:", error);
      
      setStatus("idle");
      
      toast({
        title: "Erro ao processar",
        description: "Tente novamente em alguns segundos.",
        variant: "destructive",
      });
    }
  };

  // Get input class based on state
  const getInputClass = (field: keyof LeadFormData) => {
    const baseClass = "w-full bg-secondary border-b py-3 px-1 text-xs font-medium outline-none transition-colors";
    
    if (errors[field] && touched[field]) {
      return `${baseClass} border-destructive text-destructive`;
    }
    
    if (touched[field] && formData[field] && !errors[field]) {
      return `${baseClass} border-primary`;
    }
    
    return `${baseClass} border-border focus:border-primary`;
  };

  // Render redirecting state
  if (status === "redirecting") {
    return (
      <section id="hero" className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-background overflow-hidden">
        <div className="bg-grid-overlay"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-up">
            <div className="bg-card border-2 border-foreground p-8 md:p-12 shadow-gold text-center max-w-md">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-black uppercase tracking-tight mb-2">
                {CONFIG.form.redirectMessage}
              </h2>
              <p className="text-sm text-muted-foreground">
                Você será direcionado para o checkout da Hotmart.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                Ambiente 100% Seguro
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            
            <div className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed space-y-3">
              <p>
                A imersão que todo arquiteto deveria fazer antes de começar o ano.
              </p>
              <p>
                <strong className="text-foreground">Cronograma, planejamento de obra e método</strong> para arquitetas que querem ganhar mais em 2026.
              </p>
              <p className="text-foreground font-bold">
                Porque autoridade e dinheiro se constroem na obra.
              </p>
            </div>

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
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Imersão Ao Vivo • Sábado 31/01</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4" data-track="lead_form" data-track-location="hero">
                <div>
                  <input 
                    type="text" 
                    placeholder="Nome Completo"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    disabled={status === "loading" || status === "success"}
                    className={getInputClass("name")}
                    data-track="form_field_name"
                  />
                  {errors.name && touched.name && (
                    <p className="text-[10px] text-destructive mt-1 font-medium">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <input 
                    type="email" 
                    placeholder="E-mail Profissional"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    disabled={status === "loading" || status === "success"}
                    className={getInputClass("email")}
                    data-track="form_field_email"
                  />
                  {errors.email && touched.email && (
                    <p className="text-[10px] text-destructive mt-1 font-medium">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <input 
                    type="tel" 
                    placeholder="WhatsApp (99) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onFocus={() => handleFocus("phone")}
                    onBlur={() => handleBlur("phone")}
                    disabled={status === "loading" || status === "success"}
                    className={getInputClass("phone")}
                    data-track="form_field_phone"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-[10px] text-destructive mt-1 font-medium">{errors.phone}</p>
                  )}
                </div>

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
                    disabled={status === "loading" || status === "success"}
                    className="w-full bg-foreground text-primary py-4 flex items-center justify-center gap-2 text-[10px] font-black tracking-widest hover:bg-primary hover:text-foreground transition-all border-2 border-foreground shadow-hard uppercase group disabled:opacity-70 disabled:cursor-not-allowed"
                    data-track="submit_button"
                    data-track-location="hero_form"
                  >
                    {status === "loading" && (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        PROCESSANDO...
                      </>
                    )}
                    {status === "success" && (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        REDIRECIONANDO...
                      </>
                    )}
                    {status === "idle" && (
                      <>
                        RESERVAR MEU LUGAR <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
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
