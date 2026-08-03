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
  Info,
  Percent,
} from "lucide-react";

// ============================================================
// Dados do relatório — atualizar manualmente a cada novo período
// ============================================================
const REPORT = {
  period: "22/07 a 03/08/2026",
  invested: 2866.57,
  revenue: 2157.48,
  totalSales: 93,
  ctr: 1.83,
  cpa: 30.82,
  dailySales: [
    { day: "22/07", vendas: 8 },
    { day: "23/07", vendas: 2 },
    { day: "24/07", vendas: 10 },
    { day: "25/07", vendas: 8 },
    { day: "26/07", vendas: 8 },
    { day: "27/07", vendas: 10 },
    { day: "28/07", vendas: 7 },
    { day: "29/07", vendas: 4 },
    { day: "30/07", vendas: 4 },
    { day: "31/07", vendas: 13 },
    { day: "01/08", vendas: 10 },
    { day: "02/08", vendas: 5 },
    { day: "03/08", vendas: 4 },
  ],
  // Recortes dos últimos 7 dias (não do período inteiro) — criativo e públicos
  // com melhor performance recente, cada um com suas próprias vendas/CPA/CTR.
  topCreative: {
    name: "ad - sequencia-de-servicos-novo",
    sales: 57,
    cpa: 22.08,
    ctr: 2.63,
  },
  topAudience: {
    name: "cargos arquitetas 24/05",
    sales: 44,
    cpa: 22.29,
    ctr: 2.7,
  },
  warmAudience: {
    sales: 19,
    cpa: 17.86,
    ctr: 2.37,
  },
  // Teste A/B entre as duas LPs: ambas começaram com a comunicação "Até o
  // Natal" e foram trocadas pra comunicação atual no meio do período, então
  // os números não refletem um teste limpo do início ao fim.
  abTest: {
    quiz: {
      label: "LP Quiz",
      url: "https://inscricao.imersao.inovandonasuaobra.com.br/quiz",
      sales: 25,
      cpa: 21.83,
      ctr: 1.61,
    },
    lp: {
      label: "LP Oficial",
      url: "https://inscricao.imersao.inovandonasuaobra.com.br/",
      sales: 19,
      cpa: 26.26,
      ctr: 1.66,
    },
  },
  optimizations: [
    "Testes de público",
    "Direcionamento e aumento de verba para público e criativos com melhores resultados",
    "Mudança na comunicação geral da estratégia",
    "Ativação do Pix no checkout",
    "Priorização dos melhores criativos nas campanhas",
    "Aumento de verba na campanha de remarketing com melhor CPA geral",
    "Início de teste de campanha no TikTok Ads (interrompido pela suspensão da conta de anúncios)",
  ],
  importantNotes: [
    "O volume do Meta não está como no início do ano, isso já vimos na imersão passada.",
    "O volume não será como antes no Meta, a não ser que dobremos o investimento atual, algo que ainda não aconselho.",
    "O botão \"Saiba mais\" dos anúncios é padronizado pelo Meta e não pode ser customizado. Sem selecionar esse botão, o Meta não permite nem subir os anúncios.",
  ],
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

interface SegmentCardProps {
  eyebrow: string;
  name?: string;
  sales: number;
  cpa: number;
  ctr: number;
}

const SegmentCard = ({ eyebrow, name, sales, cpa, ctr }: SegmentCardProps) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`bg-card border border-border shadow-sm p-6 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">{eyebrow}</span>
      <p className="font-bold mb-5 min-h-[1.5em] truncate">{name || "Segmento de remarketing"}</p>
      <div className="grid grid-cols-3 gap-2 text-center border-t border-border pt-4">
        <div>
          <p className="text-lg md:text-xl font-bold">{sales}</p>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Vendas</p>
        </div>
        <div>
          <p className="text-lg md:text-xl font-bold">R$ {formatBRL(cpa)}</p>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">CPA</p>
        </div>
        <div>
          <p className="text-lg md:text-xl font-bold">{ctr.toFixed(2)}%</p>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">CTR</p>
        </div>
      </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-14">
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
          <StatTile
            icon={<Percent className="w-4 h-4" />}
            label="CPA geral da conta"
            value={REPORT.cpa}
            prefix="R$ "
            decimals={2}
            accent="cta"
            delay={400}
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

        {/* Criativo e público campeões */}
        <Section className="mb-14">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-1">Criativo e público campeões</h2>
          <p className="text-sm text-muted-foreground font-medium mb-6">Recorte dos últimos 7 dias</p>
          <div className="grid md:grid-cols-3 gap-4">
            <SegmentCard
              eyebrow="Criativo campeão"
              name={REPORT.topCreative.name}
              sales={REPORT.topCreative.sales}
              cpa={REPORT.topCreative.cpa}
              ctr={REPORT.topCreative.ctr}
            />
            <SegmentCard
              eyebrow="Público campeão"
              name={REPORT.topAudience.name}
              sales={REPORT.topAudience.sales}
              cpa={REPORT.topAudience.cpa}
              ctr={REPORT.topAudience.ctr}
            />
            <SegmentCard
              eyebrow="Público quente (remarketing)"
              sales={REPORT.warmAudience.sales}
              cpa={REPORT.warmAudience.cpa}
              ctr={REPORT.warmAudience.ctr}
            />
          </div>
        </Section>

        {/* Teste A/B: Quiz vs. LP Oficial */}
        <Section className="mb-14">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-1">Teste A/B: Quiz vs. LP Oficial</h2>
          <p className="text-sm text-muted-foreground font-medium mb-6 max-w-2xl">
            As duas páginas começaram o período com a comunicação "Até o Natal" e foram trocadas pra comunicação
            atual no meio do teste, então os números abaixo não refletem uma comparação limpa do início ao fim.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[REPORT.abTest.quiz, REPORT.abTest.lp].map((variant) => (
              <a
                key={variant.url}
                href={variant.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border hover:border-primary shadow-sm hover:shadow-premium-gold transition-all duration-300 p-6 md:p-8"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{variant.label}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground font-medium break-all mb-5">{variant.url}</p>
                <div className="grid grid-cols-3 gap-2 text-center border-t border-border pt-4">
                  <div>
                    <p className="text-lg md:text-xl font-bold">{variant.sales}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Vendas</p>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-bold">R$ {formatBRL(variant.cpa)}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">CPA</p>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-bold">{variant.ctr.toFixed(2)}%</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">CTR</p>
                  </div>
                </div>
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
