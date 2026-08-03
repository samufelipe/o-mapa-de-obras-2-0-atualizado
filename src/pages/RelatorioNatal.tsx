import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Target,
  MousePointerClick,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { OBRA_PRONTA_CHECKOUT_URL } from "@/lib/constants-obra-pronta";

// ============================================================
// Dados do relatório — atualizar manualmente a cada novo período
// ============================================================
const REPORT = {
  period: "22/07 a 28/07/2026",
  invested: 1511.03,
  revenue: 1055.33,
  totalSales: 45,
  ctr: 2.59,
  dailySales: [
    { day: "22/07", vendas: 8 },
    { day: "23/07", vendas: 1 },
    { day: "24/07", vendas: 10 },
    { day: "25/07", vendas: 8 },
    { day: "26/07", vendas: 8 },
    { day: "27/07", vendas: 9 },
    { day: "28/07", vendas: 1 },
  ],
  topCreatives: [
    {
      name: "video-sequencia-de-servicos-novo",
      link: "https://www.instagram.com/p/DbQaoo_AAG5/#advertiser",
      sales: 23,
    },
    {
      name: "video-Rogério-post",
      link: "https://www.instagram.com/p/DbL7J2QAKif/#advertiser",
      sales: 6,
    },
    {
      name: "video-Não-Sei-Fazer-Cronograma",
      link: "https://www.instagram.com/p/DbJpPclgp9D/#advertiser",
      sales: 5,
    },
  ],
  optimizations: [
    "Desativação de anúncios com baixo ou nenhum desempenho",
    "Otimização da verba direcionando para campanhas com melhores resultados",
    "Criação e testes de novos públicos",
    "Otimização do funil da LP inicial",
    "Otimização do checkout da Hotmart",
    "Criação de uma nova LP em formato de quiz",
    "Implementação de novos criativos",
    "Revisão do trackeamento do Pixel do Meta no funil",
    "Otimização da velocidade das duas LPs em uso",
  ],
  importantNotes: [
    "O volume do Meta não está como no início do ano, isso já vimos na imersão passada.",
    "O volume não será como antes no Meta, a não ser que dobremos o investimento atual, algo que ainda não aconselho.",
    "O botão \"Saiba mais\" dos anúncios é padronizado pelo Meta e não pode ser customizado. Sem selecionar esse botão, o Meta não permite nem subir os anúncios.",
  ],
  quizUrl: "https://inscricao.imersao.inovandonasuaobra.com.br/quiz",
  checkoutCpa: 16.68,
  checkoutUrl: OBRA_PRONTA_CHECKOUT_URL,
};

const roas = REPORT.revenue / REPORT.invested;

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ============================================================
// Reveal on scroll (mesmo padrão já usado nas outras páginas da Natal)
// ============================================================
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

// ============================================================
// Count-up numérico pra tiles de estatística
// ============================================================
const useCountUp = (target: number, active: boolean, duration = 1400) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
};

interface StatTileProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  accent?: "gold" | "cta" | "foreground";
  caption?: string;
  delay?: number;
}

const StatTile = ({ icon, label, value, prefix = "", suffix = "", decimals = 0, accent = "foreground", caption, delay = 0 }: StatTileProps) => {
  const { ref, visible } = useReveal();
  const animated = useCountUp(value, visible);

  const accentClass =
    accent === "gold" ? "text-primary" : accent === "cta" ? "text-[hsl(var(--cta))]" : "text-foreground";

  const display =
    decimals > 0
      ? animated.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(animated).toLocaleString("pt-BR");

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-card border border-border shadow-sm p-6 md:p-8 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-2 mb-4 text-muted-foreground">
        {icon}
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      <div className={`text-3xl md:text-4xl font-bold tracking-tight ${accentClass}`}>
        {prefix}
        {display}
        {suffix}
      </div>
      {caption && <p className="text-xs text-muted-foreground font-medium mt-2">{caption}</p>}
    </div>
  );
};

const ChartTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-foreground text-background px-3 py-2 shadow-premium text-xs font-bold uppercase tracking-wide">
      {label}: <span className="text-primary">{payload[0].value} vendas</span>
    </div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
};

const RelatorioNatal = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Relatório de Performance | Imersão Cronograma Obra Pronta";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="natal-theme relative min-h-screen bg-background text-foreground overflow-hidden">
      <div className="bg-grid-overlay" />
      <div className="bg-grain absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-5xl">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 animate-fade-up">
          <span className="flex flex-col items-start leading-none">
            <span className="block text-xs font-bold tracking-[0.3em] uppercase text-foreground/70">Imersão</span>
            <span className="block text-2xl md:text-3xl font-bold tracking-tight uppercase text-primary">Cronograma</span>
            <span className="block text-xs font-bold tracking-[0.3em] uppercase text-foreground/70">Obra Pronta</span>
          </span>
          <div className="text-left md:text-right">
            <span className="inline-flex items-center gap-2 bg-foreground text-background px-3 py-1.5 border border-primary shadow-premium text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Período: {REPORT.period}
            </span>
          </div>
        </header>

        <Section className="mb-12">
          <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tight leading-tight mb-4">
            Relatório de Performance
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
            Relatório de desempenho das campanhas de tráfego da Imersão Cronograma Obra Pronta. Dados extraídos da
            conta de Meta Ads e dados comerciais da conta da Hotmart da Inovando Arquitetura.
          </p>
        </Section>

        {/* KPIs principais */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-14">
          <StatTile
            icon={<DollarSign className="w-4 h-4" />}
            label="Valor investido"
            value={REPORT.invested}
            prefix="R$ "
            decimals={2}
            delay={0}
          />
          <StatTile
            icon={<ShoppingBag className="w-4 h-4" />}
            label="Faturamento"
            value={REPORT.revenue}
            prefix="R$ "
            decimals={2}
            accent="gold"
            delay={80}
          />
          <StatTile
            icon={<TrendingUp className="w-4 h-4" />}
            label="Total de vendas"
            value={REPORT.totalSales}
            suffix=" vendas"
            accent="gold"
            delay={160}
          />
          <StatTile
            icon={<Target className="w-4 h-4" />}
            label="ROAS"
            value={roas}
            decimals={2}
            suffix="x"
            accent={roas >= 1 ? "gold" : "cta"}
            caption={roas >= 1 ? "Acima do ponto de equilíbrio (1,00x)" : "Abaixo do ponto de equilíbrio (1,00x)"}
            delay={240}
          />
          <StatTile
            icon={<MousePointerClick className="w-4 h-4" />}
            label="CTR geral da conta"
            value={REPORT.ctr}
            decimals={2}
            suffix="%"
            delay={320}
          />
        </div>

        {/* Gráfico de vendas por dia */}
        <Section className="mb-14">
          <div className="bg-card border border-border shadow-sm p-6 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight">Histórico de vendas por dia</h2>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground hidden sm:block">
                {REPORT.totalSales} vendas no período
              </span>
            </div>
            <div className="h-64 md:h-80 -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REPORT.dailySales} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 700 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--secondary))" }} />
                  <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={56}>
                    <LabelList
                      dataKey="vendas"
                      position="top"
                      style={{ fill: "hsl(var(--foreground))", fontSize: 13, fontWeight: 800 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Section>

        {/* Criativos campeões */}
        <Section className="mb-14">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-6">Criativos campeões até o momento</h2>
          <div className="space-y-3">
            {REPORT.topCreatives.map((creative, i) => (
              <a
                key={creative.link}
                href={creative.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 bg-card border border-border hover:border-primary shadow-sm hover:shadow-premium-gold transition-all duration-300 p-5 md:p-6"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-foreground text-primary font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold truncate">{creative.name}</p>
                    <p className="text-sm text-muted-foreground font-medium">{creative.sales} vendas geradas</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </Section>

        {/* Otimizações realizadas */}
        <Section className="mb-14">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-6">Otimizações realizadas no período</h2>
          <div className="bg-card border border-border shadow-sm p-6 md:p-8">
            <ul className="space-y-4">
              {REPORT.optimizations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Detalhes importantes */}
        <Section className="mb-14">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-6">Detalhes importantes</h2>
          <div className="bg-foreground text-background border-2 border-primary shadow-premium p-6 md:p-8">
            <ul className="space-y-4">
              {REPORT.importantNotes.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-background/90 leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Destaques */}
        <Section className="mb-6">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-6">Destaques do período</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href={REPORT.quizUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-foreground text-background border-2 border-primary shadow-premium hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Nova LP</span>
                <p className="text-lg font-bold uppercase tracking-tight mb-1">Funil de Quiz</p>
                <p className="text-sm text-background/60 font-medium break-all">{REPORT.quizUrl}</p>
              </div>
              <div className="flex items-center gap-1.5 text-primary font-bold text-sm uppercase tracking-wide mt-4 group-hover:gap-2.5 transition-all">
                Ver página <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            <a
              href={REPORT.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border hover:border-primary shadow-sm hover:shadow-premium-gold transition-all duration-300 p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Novo checkout</span>
                <p className="text-lg font-bold uppercase tracking-tight mb-1">
                  Melhor CPA da conta: R$ {formatBRL(REPORT.checkoutCpa)}
                </p>
                <p className="text-sm text-muted-foreground font-medium break-all">{REPORT.checkoutUrl}</p>
              </div>
              <div className="flex items-center gap-1.5 text-primary font-bold text-sm uppercase tracking-wide mt-4 group-hover:gap-2.5 transition-all">
                Abrir checkout <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </Section>

        <footer className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            Imersão Cronograma Obra Pronta · Inovando na Sua Obra
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RelatorioNatal;
