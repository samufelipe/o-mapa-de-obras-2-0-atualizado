import { TrendingUp, TrendingDown, Minus, ShoppingCart, MousePointerClick, Eye, DollarSign, Users, Star, Calendar, Clock, AlertCircle } from "lucide-react";

// ============================================================
// ATUALIZE ESTES DADOS MANUALMENTE APÓS CADA ANÁLISE DO META
// ============================================================
const REPORT_DATA = {
  updatedAt: "07/05/2026 às 09:00",
  period: "04/05 – 06/05/2026",
  campaignDeadline: "30/05/2026",
  daysActive: 3,

  kpis: {
    spend: 0,          // R$ investido total
    impressions: 0,    // total de impressões
    clicks: 0,         // cliques no link
    ctr: 0,            // CTR médio em %
    cpl: 0,            // custo por lead em R$
    leads: 0,          // leads gerados (form submetido)
    sales: 0,          // vendas confirmadas no Hotmart
    revenue: 0,        // receita bruta Hotmart (R$)
    roas: 0,           // receita / spend
    lpVisits: 0,       // visitas à página de destino
  },

  topCreative: {
    name: "Vídeo 1 — Quando chamar a internet?",
    ctr: 0,
    lpVisits: 0,
    leads: 0,
    spend: 0,
  },

  dailyBreakdown: [
    { date: "04/05 (Dom)", spend: 0, impressions: 0, clicks: 0, leads: 0, sales: 0 },
    { date: "05/05 (Seg)", spend: 0, impressions: 0, clicks: 0, leads: 0, sales: 0 },
    { date: "06/05 (Ter)", spend: 0, impressions: 0, clicks: 0, leads: 0, sales: 0 },
  ],

  observations: [
    {
      icon: "🟡",
      title: "Fase de aprendizado",
      text: "Campanha nos primeiros 3 dias. O algoritmo do Meta ainda está em fase de otimização — esperar ao menos 7 dias para conclusões definitivas sobre criativos e públicos.",
    },
    {
      icon: "🎯",
      title: "Testes em andamento",
      text: "4 criativos em vídeo rodando (sequência de obra: internet, eletrodoméstico, marcenaria, lixamento). Público: interesse em arquitetura + reforma, mulheres 25–45.",
    },
    {
      icon: "📊",
      title: "Próximas ações",
      text: "Após 7 dias: pausar os 2 criativos com CTR mais baixo. Escalar orçamento no criativo vencedor em +20%. Testar variação de copy na headline do anúncio.",
    },
  ],
};
// ============================================================

const fmt = {
  brl: (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
  num: (v: number) => v.toLocaleString("pt-BR"),
  pct: (v: number) => `${v.toFixed(2).replace(".", ",")}%`,
  roas: (v: number) => `${v.toFixed(2).replace(".", ",")}x`,
};

const { kpis } = REPORT_DATA;
const isZero = Object.values(kpis).every((v) => v === 0);

function KPICard({
  label,
  value,
  sub,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  highlight?: "good" | "bad" | "neutral";
}) {
  const color =
    highlight === "good"
      ? "text-green-600"
      : highlight === "bad"
      ? "text-destructive"
      : "text-primary";

  return (
    <div className="bg-card border border-border p-5 shadow-premium flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div>
        <p className={`text-2xl md:text-3xl font-bold tracking-tight ${color}`}>{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1 font-medium">{sub}</p>}
      </div>
    </div>
  );
}

export default function Relatorio() {
  const roasHighlight: "good" | "bad" | "neutral" =
    kpis.roas === 0 ? "neutral" : kpis.roas >= 3 ? "good" : kpis.roas >= 1 ? "neutral" : "bad";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Inovando na Sua Obra
            </p>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Relatório de Campanha
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Imersão Cronograma 2.0 · Meta Ads
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Calendar className="w-3.5 h-3.5" />
              Período: <span className="text-foreground font-bold">{REPORT_DATA.period}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Clock className="w-3.5 h-3.5" />
              Atualizado em: <span className="text-foreground font-bold">{REPORT_DATA.updatedAt}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-foreground px-2 py-1 mt-1">
              Campanha ativa · encerra {REPORT_DATA.campaignDeadline}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* Zero data banner */}
        {isZero && (
          <div className="flex items-start gap-3 bg-secondary border border-border p-4">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-muted-foreground">
              Os dados ainda não foram preenchidos. Atualize o objeto <code className="bg-background px-1 py-0.5 text-xs font-mono text-foreground">REPORT_DATA</code> em <code className="bg-background px-1 py-0.5 text-xs font-mono text-foreground">src/pages/Relatorio.tsx</code> com os valores do Meta Ads.
            </p>
          </div>
        )}

        {/* KPIs grid */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Métricas Gerais · {REPORT_DATA.daysActive} dias ativos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KPICard
              label="Investimento"
              value={fmt.brl(kpis.spend)}
              sub={`${fmt.brl(kpis.spend / (REPORT_DATA.daysActive || 1))}/dia`}
              icon={DollarSign}
            />
            <KPICard
              label="Impressões"
              value={fmt.num(kpis.impressions)}
              sub={`Alcance orgânico + pago`}
              icon={Eye}
            />
            <KPICard
              label="Cliques no Link"
              value={fmt.num(kpis.clicks)}
              sub={`CTR: ${fmt.pct(kpis.ctr)}`}
              icon={MousePointerClick}
              highlight={kpis.ctr === 0 ? "neutral" : kpis.ctr >= 1.5 ? "good" : "bad"}
            />
            <KPICard
              label="Visitas à LP"
              value={fmt.num(kpis.lpVisits)}
              sub={`Página de destino`}
              icon={Eye}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            <KPICard
              label="Leads"
              value={fmt.num(kpis.leads)}
              sub={`CPL: ${fmt.brl(kpis.cpl)}`}
              icon={Users}
              highlight={kpis.leads > 0 ? "good" : "neutral"}
            />
            <KPICard
              label="Vendas (Hotmart)"
              value={`${kpis.sales}`}
              sub={`Receita: ${fmt.brl(kpis.revenue)}`}
              icon={ShoppingCart}
              highlight={kpis.sales > 0 ? "good" : "neutral"}
            />
            <KPICard
              label="ROAS"
              value={kpis.roas === 0 ? "—" : fmt.roas(kpis.roas)}
              sub={kpis.roas >= 3 ? "Acima do breakeven" : kpis.roas > 0 ? "Abaixo do breakeven" : "Meta: ≥ 3x"}
              icon={TrendingUp}
              highlight={roasHighlight}
            />
            <KPICard
              label="Conv. Lead → Venda"
              value={kpis.leads > 0 ? fmt.pct((kpis.sales / kpis.leads) * 100) : "—"}
              sub={`${kpis.sales} vendas / ${kpis.leads} leads`}
              icon={Star}
              highlight={kpis.leads > 0 && kpis.sales / kpis.leads >= 0.05 ? "good" : "neutral"}
            />
          </div>
        </section>

        {/* Top Creative */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Criativo Destaque
          </h2>
          <div className="bg-card border-2 border-primary p-5 shadow-gold grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Melhor CTR</p>
              <p className="text-lg font-bold">{REPORT_DATA.topCreative.name}</p>
            </div>
            <div className="grid grid-cols-3 sm:col-span-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">CTR</p>
                <p className="text-xl font-bold text-green-600">{fmt.pct(REPORT_DATA.topCreative.ctr)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">LP Visitas</p>
                <p className="text-xl font-bold">{fmt.num(REPORT_DATA.topCreative.lpVisits)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Leads</p>
                <p className="text-xl font-bold">{fmt.num(REPORT_DATA.topCreative.leads)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Daily breakdown */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Evolução Diária
          </h2>
          <div className="bg-card border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Data</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Invest.</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Impressões</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Cliques</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Leads</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Vendas</th>
                </tr>
              </thead>
              <tbody>
                {REPORT_DATA.dailyBreakdown.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 font-bold">{row.date}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{fmt.brl(row.spend)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{fmt.num(row.impressions)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{fmt.num(row.clicks)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.leads}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-bold text-green-600">{row.sales}</td>
                  </tr>
                ))}
                <tr className="bg-secondary font-bold">
                  <td className="px-4 py-3 text-xs uppercase tracking-wider">Total</td>
                  <td className="px-4 py-3 text-right tabular-nums">{fmt.brl(kpis.spend)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{fmt.num(kpis.impressions)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{fmt.num(kpis.clicks)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{kpis.leads}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-green-600">{kpis.sales}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Observations */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Observações & Tratativas
          </h2>
          <div className="space-y-3">
            {REPORT_DATA.observations.map((obs, i) => (
              <div key={i} className="bg-card border border-border p-5 shadow-premium flex gap-4">
                <span className="text-xl flex-shrink-0 mt-0.5">{obs.icon}</span>
                <div>
                  <p className="font-bold uppercase tracking-wide text-sm mb-1">{obs.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{obs.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground font-medium">
          <span>Inovando na Sua Obra · Imersão Cronograma 2.0</span>
          <span>Atualizado em {REPORT_DATA.updatedAt} · Campanha ativa até {REPORT_DATA.campaignDeadline}</span>
        </div>
      </div>
    </div>
  );
}