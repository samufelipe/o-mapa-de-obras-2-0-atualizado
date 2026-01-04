import { useState, useEffect } from "react";
import { Check, Copy, Link, ChevronDown, ChevronUp, Code, FileText, BookOpen, Zap, Tag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { EmailConfigPanel } from "@/components/admin/EmailConfigPanel";
import { RDStationGuide } from "@/components/admin/RDStationGuide";
import { PlugaIntegrationGuide } from "@/components/admin/PlugaIntegrationGuide";
import { ModularEmailBlocks } from "@/components/admin/ModularEmailBlocks";
import { EmailPreview } from "@/components/admin/EmailPreview";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  timing: string;
  publicUrl: string;
}

interface Journey {
  name: string;
  color: string;
  conversionIdentifier?: string;
  exitCondition?: string;
  emails: EmailTemplate[];
}

interface Product {
  name: string;
  identifier: string;
  color: string;
  journeys: Journey[];
}

const getBaseUrl = () => window.location.origin;

const products: Product[] = [
  {
    name: "Imersão Cronograma 2.0: O Mapa da Obra",
    identifier: "imersao-cronograma-2.0-o-mapa-da-obra",
    color: "border-green-500/50",
    journeys: [
      {
        name: "Boas-vindas Imersão (3 e-mails)",
        color: "bg-green-500/20 border-green-500/50",
        conversionIdentifier: "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
        emails: [
          { id: "IB1", name: "Vaga Confirmada", subject: "Sua vaga está confirmada!", timing: "Imediato", publicUrl: "/emails/boas-vindas-1.html" },
          { id: "IB2", name: "Você tomou a melhor decisão", subject: "Você tomou a melhor decisão", timing: "+1 dia", publicUrl: "/emails/boas-vindas-2.html" },
          { id: "IB3", name: "Link do Zoom", subject: "Seu link do Zoom está aqui!", timing: "Véspera", publicUrl: "/emails/boas-vindas-3.html" },
        ],
      },
      {
        name: "Nutrição Imersão (8 e-mails)",
        color: "bg-blue-500/20 border-blue-500/50",
        emails: [
          { id: "N1", name: "Acesso Liberado: 6 Aulas", subject: "🎁 Acesso Liberado: 6 Aulas Preparatórias", timing: "Imediato", publicUrl: "/emails/nutricao-1.html" },
          { id: "N2", name: "Já assistiu a primeira aula?", subject: "Já assistiu a primeira aula?", timing: "+1 dia", publicUrl: "/emails/nutricao-2.html" },
          { id: "N3", name: "Preview da Live", subject: "Preview: o que você vai dominar na live", timing: "+3 dias", publicUrl: "/emails/nutricao-3.html" },
          { id: "N4", name: "Exercício de Reflexão", subject: "Exercício: O que você descobriu nas aulas?", timing: "+5 dias", publicUrl: "/emails/nutricao-4.html" },
          { id: "N5", name: "Prepare seu Zoom", subject: "Prepare seu Zoom para a Imersão", timing: "-4 dias", publicUrl: "/emails/nutricao-5.html" },
          { id: "N6", name: "Cronograma Completo", subject: "Cronograma Completo: Sábado 31/01", timing: "-3 dias", publicUrl: "/emails/nutricao-6.html" },
          { id: "N7", name: "Checklist Final", subject: "Faltam 2 dias! Checklist Final", timing: "-2 dias", publicUrl: "/emails/nutricao-7.html" },
          { id: "N8", name: "AMANHÃ! Último Lembrete", subject: "🚀 AMANHÃ! Último lembrete", timing: "-1 dia", publicUrl: "/emails/nutricao-8.html" },
        ],
      },
      {
        name: "Pós-Live Imersão (2 e-mails)",
        color: "bg-purple-500/20 border-purple-500/50",
        emails: [
          { id: "PL1", name: "Replay 48h", subject: "🎬 Replay disponível por 48h - Assista AGORA", timing: "+1 dia após live", publicUrl: "/emails/pos-live-1.html" },
          { id: "PL2", name: "Agradecimento + Feedback", subject: "💛 Obrigada por participar! Queremos ouvir você", timing: "+3 dias após live", publicUrl: "/emails/pos-live-2.html" },
        ],
      },
      {
        name: "Carrinho Abandonado Imersão (8 e-mails)",
        color: "bg-red-500/20 border-red-500/50",
        conversionIdentifier: "imersao-cronograma-2.0-o-mapa-da-obra-carrinho-abandonado",
        exitCondition: "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
        emails: [
          { id: "IC1", name: "Lembrete imediato", subject: "Ops! Você esqueceu algo importante...", timing: "+1 hora", publicUrl: "/emails/imersao/carrinho-1.html" },
          { id: "IC2", name: "Transformação + Prova social", subject: "Por que suas obras sempre atrasam? (a verdade)", timing: "+1 dia", publicUrl: "/emails/imersao/carrinho-2.html" },
          { id: "IC3", name: "Quebra de objeções", subject: '"Não tenho tempo" — leia isso antes de desistir', timing: "+2 dias", publicUrl: "/emails/imersao/carrinho-3.html" },
          { id: "IC4", name: "Case de sucesso", subject: "Ela tinha medo, mas decidiu tentar (veja o resultado)", timing: "+4 dias", publicUrl: "/emails/imersao/carrinho-4.html" },
          { id: "IC5", name: "Resumo + Bônus", subject: "Veja tudo que está incluso na Imersão", timing: "+6 dias", publicUrl: "/emails/imersao/carrinho-5.html" },
          { id: "IC6", name: "Contagem 48h", subject: "⚠️ 48h para você decidir (sem prorrogação)", timing: "+8 dias", publicUrl: "/emails/imersao/carrinho-6.html" },
          { id: "IC7", name: "Penúltimo dia", subject: "AMANHÃ você vai se arrepender?", timing: "+9 dias", publicUrl: "/emails/imersao/carrinho-7.html" },
          { id: "IC8", name: "Última chance (3h)", subject: "🚨 3 HORAS — depois disso, acabou", timing: "+10 dias", publicUrl: "/emails/imersao/carrinho-8.html" },
        ],
      },
    ],
  },
  {
    name: "Mentoria Inovando na sua Obra",
    identifier: "mentoria-inovando-na-sua-obra",
    color: "border-purple-500/50",
    journeys: [
      {
        name: "Boas-vindas Mentoria (1 e-mail)",
        color: "bg-purple-500/20 border-purple-500/50",
        conversionIdentifier: "mentoria-inovando-na-sua-obra-compra-aprovada",
        emails: [
          { id: "MB1", name: "Inscrição Confirmada", subject: "Bem-vinda à Mentoria Inovando na sua Obra!", timing: "Imediato", publicUrl: "/emails/mentoria-boas-vindas-1.html" },
        ],
      },
      {
        name: "Carrinho Abandonado Mentoria (8 e-mails)",
        color: "bg-amber-500/20 border-amber-500/50",
        conversionIdentifier: "mentoria-inovando-na-sua-obra-carrinho-abandonado",
        exitCondition: "mentoria-inovando-na-sua-obra-compra-aprovada",
        emails: [
          { id: "MC1", name: "Lembrete imediato", subject: "Ops! Você esqueceu algo importante...", timing: "+1 hora", publicUrl: "/emails/mentoria/carrinho-1.html" },
          { id: "MC2", name: "Transformação + Prova social", subject: "Por que suas obras sempre atrasam? (a verdade)", timing: "+1 dia", publicUrl: "/emails/mentoria/carrinho-2.html" },
          { id: "MC3", name: "Quebra de objeções", subject: '"Não tenho tempo" — leia isso antes de desistir', timing: "+2 dias", publicUrl: "/emails/mentoria/carrinho-3.html" },
          { id: "MC4", name: "Case de sucesso", subject: "Ela tinha medo, mas decidiu tentar (veja o resultado)", timing: "+4 dias", publicUrl: "/emails/mentoria/carrinho-4.html" },
          { id: "MC5", name: "Resumo + Bônus", subject: "16h de conteúdo + bônus: veja tudo que está incluso", timing: "+6 dias", publicUrl: "/emails/mentoria/carrinho-5.html" },
          { id: "MC6", name: "Contagem 48h", subject: "⚠️ 48h para você decidir (sem prorrogação)", timing: "+8 dias", publicUrl: "/emails/mentoria/carrinho-6.html" },
          { id: "MC7", name: "Penúltimo dia", subject: "AMANHÃ você vai se arrepender?", timing: "+9 dias", publicUrl: "/emails/mentoria/carrinho-7.html" },
          { id: "MC8", name: "Última chance (3h)", subject: "🚨 3 HORAS — depois disso, acabou", timing: "+10 dias", publicUrl: "/emails/mentoria/carrinho-8.html" },
        ],
      },
    ],
  },
];

export default function AdminEmails() {
  const { toast } = useToast();
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [copiedIdentifier, setCopiedIdentifier] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [emailContents, setEmailContents] = useState<Record<string, string>>({});
  const [showGuide, setShowGuide] = useState(false);
  const [showPlugaGuide, setShowPlugaGuide] = useState(false);
  const [config, setConfig] = useState({
    headerImageUrl: "",
    imersaoWhatsappUrl: "",
    mentoriaWhatsappUrl: "",
    zoomLink: "",
    apostilaLink: "",
    imersaoCheckoutUrl: "",
    mentoriaCheckoutUrl: "",
  });

  // Carregar HTML do email quando expandir
  useEffect(() => {
    if (expandedId) {
      const email = products.flatMap(p => p.journeys).flatMap(j => j.emails).find(e => e.id === expandedId);
      if (email && !emailContents[expandedId]) {
        fetch(email.publicUrl)
          .then(res => res.text())
          .then(html => {
            setEmailContents(prev => ({ ...prev, [expandedId]: html }));
          })
          .catch(err => console.error("Erro ao carregar email:", err));
      }
    }
  }, [expandedId]);

  const copyLinkToClipboard = async (url: string, id: string) => {
    const fullUrl = `${getBaseUrl()}${url}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopiedLinkId(id);
    toast({ title: "Link copiado!" });
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  const copyIdentifier = async (identifier: string, name: string) => {
    await navigator.clipboard.writeText(identifier);
    setCopiedIdentifier(identifier);
    toast({ title: "Identificador copiado!", description: name });
    setTimeout(() => setCopiedIdentifier(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Templates de E-mail</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Configure as variáveis, copie os blocos e use no RD Station.
          </p>
        </header>

        <EmailConfigPanel config={config} onChange={setConfig} />

        {/* Botões de guias */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setShowPlugaGuide(!showPlugaGuide)} className="gap-2">
            <Zap className="h-4 w-4" />
            {showPlugaGuide ? "Ocultar Integrações" : "Integrações Pluga/RD"}
          </Button>
          <Button variant="outline" onClick={() => setShowGuide(!showGuide)} className="gap-2">
            <BookOpen className="h-4 w-4" />
            {showGuide ? "Ocultar Guia" : "Como usar no RD Station"}
          </Button>
        </div>
        
        {showPlugaGuide && <PlugaIntegrationGuide />}
        {showGuide && <RDStationGuide />}

        {/* Produtos e Jornadas */}
        <div className="space-y-8">
          {products.map((product) => (
            <div key={product.identifier} className={`border-2 rounded-xl p-4 md:p-6 ${product.color}`}>
              {/* Header do Produto */}
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">{product.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <code className="bg-muted px-2 py-0.5 rounded text-xs">{product.identifier}</code>
                </div>
              </div>

              {/* Jornadas do Produto */}
              <div className="space-y-6">
                {product.journeys.map((journey) => (
                  <section key={journey.name} className={`border rounded-lg p-4 ${journey.color}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <h3 className="text-lg font-semibold text-foreground">{journey.name}</h3>
                      
                      {/* Badges de integração */}
                      <div className="flex flex-wrap gap-2">
                        {journey.conversionIdentifier && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-xs h-7"
                            onClick={() => copyIdentifier(journey.conversionIdentifier!, journey.name)}
                          >
                            {copiedIdentifier === journey.conversionIdentifier ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                            <span className="hidden md:inline">Gatilho:</span>
                            <code className="font-mono">{journey.conversionIdentifier.split("-").slice(-2).join("-")}</code>
                          </Button>
                        )}
                        {journey.exitCondition && (
                          <Badge variant="secondary" className="gap-1 text-xs">
                            <ShieldCheck className="h-3 w-3" />
                            Saída: compra-aprovada
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {journey.emails.map((email) => (
                        <div key={email.id} className="bg-background/90 backdrop-blur rounded-lg border p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded">{email.timing}</span>
                                <span className="font-medium text-foreground">{email.name}</span>
                              </div>
                              <p className="text-sm text-muted-foreground"><strong>Assunto:</strong> {email.subject}</p>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                              <Button size="sm" variant="outline" onClick={() => window.open(email.publicUrl, '_blank')}>
                                <FileText className="h-4 w-4 mr-1" />Preview
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => copyLinkToClipboard(email.publicUrl, email.id)}>
                                {copiedLinkId === email.id ? <><Check className="h-4 w-4 mr-1" />Copiado!</> : <><Link className="h-4 w-4 mr-1" />Link</>}
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setExpandedId(expandedId === email.id ? null : email.id)}
                              >
                                <Code className="h-4 w-4 mr-1" />
                                Copiar Bloco
                                {expandedId === email.id ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                              </Button>
                            </div>
                          </div>

                          {expandedId === email.id && (
                            <div className="mt-4 pt-4 border-t space-y-4">
                              {emailContents[email.id] ? (
                                <>
                                  <ModularEmailBlocks
                                    emailName={email.name}
                                    emailContent={emailContents[email.id]}
                                    config={config}
                                  />
                                  <EmailPreview html={emailContents[email.id]} config={config} />
                                </>
                              ) : (
                                <p className="text-center text-muted-foreground py-4">Carregando...</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
