import { Trophy, Video, Lock, Clock, Users, Star, ShieldCheck, ArrowRight, Loader2, CheckCircle, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { CONFIG } from "@/lib/config";
import { trackLead, trackInitiateCheckout } from "@/lib/tracking";
import { applyPhoneMask } from "@/lib/validations";
import {
  trackFormStart,
  trackFormFieldFocus,
  trackFormFieldComplete,
  trackFormSubmit,
  trackFormError,
  trackBeginCheckout,
  trackLeadGenerated,
} from "@/lib/gtm-tracking";

type FormStatus = "idle" | "loading" | "success" | "redirecting";

interface FormData {
  name: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

// Real deadline: May 30, 2026 23:59:59 BRT (UTC-3)
const DEADLINE = new Date("2026-05-30T23:59:59-03:00");

const valueItems = [
  "Imersão Ao Vivo · Sábado 30/05",
  "8 Aulas Preparatórias (acesso imediato)",
  "Planilha Cronograma Completa",
  "Roteiro de Serviços",
  "Guia de Fornecedores",
];

const HeroSectionV2 = () => {
  const { toast } = useToast();
  const formStarted = useRef(false);

  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Real countdown to May 30, 2026
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = DEADLINE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, []);

  const validateForm = (): { valid: boolean; errors: FormErrors } => {
    const errs: FormErrors = {};
    if (!formData.name || formData.name.trim().length < 3) {
      errs.name = "Nome deve ter ao menos 3 caracteres";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 10) {
      errs.phone = "WhatsApp inválido";
    }
    return { valid: Object.keys(errs).length === 0, errors: errs };
  };

  const handleFocus = (field: keyof FormData) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStart();
    }
    trackFormFieldFocus(field);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const processed = field === "phone" ? applyPhoneMask(value) : value;
    setFormData((prev) => ({ ...prev, [field]: processed }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (formData[field]) trackFormFieldComplete(field);
    const { errors: errs } = validateForm();
    if (errs[field]) setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const getInputClass = (field: keyof FormData) => {
    const base = "w-full bg-secondary border-b py-3 px-1 text-sm font-medium outline-none transition-colors";
    if (errors[field] && touched[field]) return `${base} border-destructive text-destructive`;
    if (touched[field] && formData[field] && !errors[field]) return `${base} border-primary`;
    return `${base} border-border focus:border-primary`;
  };

  const redirectToHotmart = () => {
    setStatus("redirecting");
    trackInitiateCheckout(39.90);
    trackBeginCheckout();

    setTimeout(() => {
      const phoneClean = formData.phone.replace(/\D/g, "");
      // Synthetic email for internal tracking — WhatsApp recovery uses phone
      const syntheticEmail = `${phoneClean}@wpp.registro.co`;

      const params = new URLSearchParams({
        name: formData.name,
        email: syntheticEmail,
        phone: phoneClean,
      });

      const currentParams = new URLSearchParams(window.location.search);
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((utm) => {
        const val = currentParams.get(utm);
        if (val) params.set(utm, val);
      });

      window.location.href = `/checkout/imersao?${params.toString()}`;
    }, CONFIG.form.redirectDelay);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors: errs } = validateForm();

    if (!valid) {
      setErrors(errs);
      setTouched({ name: true, phone: true });
      trackFormError(errs);
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
      const phoneClean = formData.phone.replace(/\D/g, "");
      const syntheticEmail = `${phoneClean}@wpp.registro.co`;
      trackLead({ name: formData.name, email: syntheticEmail, phone: formData.phone });
      trackFormSubmit({ name: formData.name, email: syntheticEmail, phone: formData.phone });
      trackLeadGenerated("landing_page_form_v2");
      setStatus("success");
      toast({ title: "Dados registrados!", description: "Redirecionando para o pagamento..." });
      setTimeout(redirectToHotmart, 300);
    } catch {
      setStatus("idle");
      toast({
        title: "Erro ao processar",
        description: "Tente novamente em alguns segundos.",
        variant: "destructive",
      });
    }
  };

  if (status === "redirecting") {
    return (
      <section id="hero" className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-background overflow-hidden">
        <div className="bg-grid-overlay"></div>
        <div className="bg-grain absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-up">
            <div className="bg-card border-2 border-foreground p-8 md:p-12 shadow-gold text-center max-w-md">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-bold uppercase tracking-tight mb-2">{CONFIG.form.redirectMessage}</h2>
              <p className="text-sm text-muted-foreground">Complete o pagamento para confirmar sua inscrição.</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <Lock className="w-3.5 h-3.5" /> Ambiente 100% Seguro
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
      <div className="bg-grain absolute inset-0 pointer-events-none"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-fade-up">
            {/* Real countdown badge */}
            <div className="inline-flex items-center gap-2 bg-foreground px-3 py-1.5 border border-primary shadow-premium mx-auto lg:mx-0">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-background uppercase tracking-wider">
                Encerra em:{" "}
                <span className="text-primary tabular-nums">
                  {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
                </span>
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              <span
                className="text-primary italic block animate-fade-in"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                Imersão Cronograma 2.0
              </span>
              <span
                className="text-primary italic block text-xl md:text-3xl lg:text-4xl animate-fade-in"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
              >
                O Mapa da Obra de Interiores
              </span>
            </h1>

            <h2
              className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              Domine a sequência exata de uma reforma de interiores em apenas um dia.
            </h2>

            <div className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed space-y-3">
              <p>
                A virada de chave que toda arquiteta precisa para dominar suas obras com{" "}
                <strong className="text-foreground">mais autoridade, previsibilidade e valorização.</strong>
              </p>
              <p className="text-primary font-bold">
                + 8 aulas preparatórias com acesso imediato para você chegar pronta.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Trophy className="w-4 h-4 text-primary" /> +250 Obras Entregues
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-primary text-xs font-bold uppercase tracking-wider shadow-premium">
                <Video className="w-4 h-4" /> AO VIVO NO ZOOM
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div id="registration-form" className="scroll-mt-24 animate-fade-up">
            <div className="bg-card border-2 border-foreground p-8 md:p-10 shadow-premium max-w-md mx-auto">
              <div className="mb-6 text-center lg:text-left">
                <h2 className="text-xl font-bold uppercase tracking-tight">Vaga Exclusiva</h2>
                <p className="text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest">
                  Imersão Ao Vivo • Sábado 30/05
                </p>
              </div>

              {/* Value stack — condensed, above the form */}
              <div className="mb-5 bg-secondary border border-border p-4 space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Incluso na sua vaga:
                </p>
                {valueItems.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* 2-field form: name + phone only */}
              <form onSubmit={handleSubmit} className="space-y-4" data-track="lead_form_v2" data-track-location="hero">
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
                    <p className="text-xs text-destructive mt-1 font-medium">{errors.name}</p>
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
                    <p className="text-xs text-destructive mt-1 font-medium">{errors.phone}</p>
                  )}
                  {/* Micro-copy: reduce phone friction */}
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Usamos apenas para confirmar sua vaga por WhatsApp.
                  </p>
                </div>

                <div className="pt-3">
                  {/* Price section with value anchor */}
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground font-medium">
                        Valor total:{" "}
                        <span className="line-through">R$ 583,90</span>
                      </span>
                      <span className="text-3xl font-bold tracking-tighter animate-pulse-slow">R$ 39,90</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold text-primary bg-foreground px-2 py-1 uppercase tracking-widest shadow-premium">
                        ENCERRA 30/05
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        Faltam {timeLeft.d} dias
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="w-full bg-green-600 text-white py-4 flex items-center justify-center gap-2 text-sm font-bold tracking-widest hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 uppercase group disabled:opacity-70 disabled:cursor-not-allowed"
                    data-track="submit_button_v2"
                    data-track-location="hero_form_v2"
                  >
                    {status === "loading" && (
                      <><Loader2 className="w-4 h-4 animate-spin" /> PROCESSANDO...</>
                    )}
                    {status === "success" && (
                      <><CheckCircle className="w-4 h-4" /> REDIRECIONANDO...</>
                    )}
                    {status === "idle" && (
                      <>RESERVAR MEU LUGAR <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Pagamento 100% Seguro via Hotmart
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-16 border-y border-border bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-foreground">
            <div className="flex items-center gap-2 font-bold text-sm md:text-base uppercase tracking-widest">
              <Users className="w-5 h-5 md:w-6 md:h-6" /> +1000 Arquitetas Impactadas
            </div>
            <div className="flex items-center gap-2 font-bold text-sm md:text-base uppercase tracking-widest">
              <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" /> Avaliação 4.9/5.0
            </div>
            <div className="flex items-center gap-2 font-bold text-sm md:text-base uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" /> Método Validado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionV2;