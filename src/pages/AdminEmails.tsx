import { useState } from "react";
import { Check, Copy, Link, ChevronDown, ChevronUp, Code, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  JORNADA_RESGATE,
  JORNADA_BOAS_VINDAS,
  JORNADA_CARRINHO,
  JORNADA_REEMBOLSO,
} from "@/lib/email-templates";
import { EmailConfigPanel } from "@/components/admin/EmailConfigPanel";
import { RDStationGuide } from "@/components/admin/RDStationGuide";
import { ModularEmailBlocks } from "@/components/admin/ModularEmailBlocks";
import { EmailPreview } from "@/components/admin/EmailPreview";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  timing: string;
  html: string;
  publicUrl: string;
}

interface Journey {
  name: string;
  color: string;
  emails: EmailTemplate[];
}

const emailFileMap: Record<string, string> = {
  R1: "resgate-1.html",
  R2: "resgate-2.html",
  R3: "resgate-3.html",
  R4: "resgate-4.html",
  R5: "resgate-5.html",
  B1: "boas-vindas-1.html",
  B2: "boas-vindas-2.html",
  B3: "boas-vindas-3.html",
  C1: "carrinho-1.html",
  C2: "carrinho-2.html",
  C3: "carrinho-3.html",
  RE1: "reembolso-1.html",
  N1: "nutricao-1.html",
  N2: "nutricao-2.html",
  N3: "nutricao-3.html",
  N4: "nutricao-4.html",
  N5: "nutricao-5.html",
};

const getBaseUrl = () => window.location.origin;

const extractInnerContent = (html: string): string => {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) return bodyMatch[1].trim();
  const tableMatch = html.match(/(<table[\s\S]*<\/table>)/i);
  if (tableMatch) return tableMatch[1].trim();
  return html;
};

// Jornada de Nutrição (não existe em email-templates.ts, criada aqui)
const JORNADA_NUTRICAO = {
  nome: "Nutrição Comprador",
  gatilho: "pagamento-imersao-virada-arquiteta",
  emails: [
    {
      id: "N1",
      nome: "Reforço da Compra",
      delay: "D+2 (2 dias após compra)",
      assunto: "Você tomou a melhor decisão, *|NOME:Arquiteta|*",
      previewText: "Por que essa imersão vai mudar a forma como você gerencia suas obras",
      html: "", // Carregado do arquivo HTML
    },
    {
      id: "N2",
      nome: "Case de Sucesso",
      delay: "D+4 (4 dias após compra)",
      assunto: "O que arquitetas de sucesso fazem diferente",
      previewText: "A história de uma arquiteta que entregava 8 obras por ano e hoje entrega 40",
      html: "",
    },
    {
      id: "N3",
      nome: "Preview do Conteúdo",
      delay: "D+7 (7 dias após compra)",
      assunto: "Preview: o que você vai aprender na imersão",
      previewText: "Confira a agenda completa dos 2 dias de imersão",
      html: "",
    },
    {
      id: "N4",
      nome: "Exercício de Reflexão",
      delay: "D+10 (10 dias após compra)",
      assunto: "Exercício: suas 3 maiores dores na gestão de obras",
      previewText: "Um exercício rápido para você aproveitar ainda mais a imersão",
      html: "",
    },
    {
      id: "N5",
      nome: "Contagem Regressiva",
      delay: "D-3 (3 dias antes da live)",
      assunto: "Faltam 3 dias! Prepare-se assim 🔥",
      previewText: "Checklist final para aproveitar 100% da imersão",
      html: "",
    },
  ],
};

const journeys: Journey[] = [
  {
    name: "Jornada Resgate (5 e-mails)",
    color: "bg-amber-500/20 border-amber-500/50",
    emails: JORNADA_RESGATE.emails.map((e) => ({
      id: e.id,
      name: e.nome,
      subject: e.assunto,
      timing: e.delay,
      html: e.html,
      publicUrl: `/emails/${emailFileMap[e.id]}`,
    })),
  },
  {
    name: "Jornada Boas-vindas (3 e-mails)",
    color: "bg-green-500/20 border-green-500/50",
    emails: JORNADA_BOAS_VINDAS.emails.map((e) => ({
      id: e.id,
      name: e.nome,
      subject: e.assunto,
      timing: e.delay,
      html: e.html,
      publicUrl: `/emails/${emailFileMap[e.id]}`,
    })),
  },
  {
    name: "Jornada Nutrição (5 e-mails)",
    color: "bg-blue-500/20 border-blue-500/50",
    emails: JORNADA_NUTRICAO.emails.map((e) => ({
      id: e.id,
      name: e.nome,
      subject: e.assunto,
      timing: e.delay,
      html: e.html,
      publicUrl: `/emails/${emailFileMap[e.id]}`,
    })),
  },
  {
    name: "Jornada Carrinho Abandonado (3 e-mails)",
    color: "bg-red-500/20 border-red-500/50",
    emails: JORNADA_CARRINHO.emails.map((e) => ({
      id: e.id,
      name: e.nome,
      subject: e.assunto,
      timing: e.delay,
      html: e.html,
      publicUrl: `/emails/${emailFileMap[e.id]}`,
    })),
  },
  {
    name: "Jornada Reembolso (1 e-mail)",
    color: "bg-gray-500/20 border-gray-500/50",
    emails: JORNADA_REEMBOLSO.emails.map((e) => ({
      id: e.id,
      name: e.nome,
      subject: e.assunto,
      timing: e.delay,
      html: e.html,
      publicUrl: `/emails/${emailFileMap[e.id]}`,
    })),
  },
];

export default function AdminEmails() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedBlockId, setCopiedBlockId] = useState<string | null>(null);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [config, setConfig] = useState({
    headerImageUrl: "",
    whatsappGroupUrl: "",
    zoomLink: "",
    apostilaLink: "",
  });

  const applyConfig = (html: string): string => {
    return html
      .replace(/HEADER_IMAGE_URL/g, config.headerImageUrl || "HEADER_IMAGE_URL")
      .replace(/WHATSAPP_GROUP_URL/g, config.whatsappGroupUrl || "WHATSAPP_GROUP_URL")
      .replace(/ZOOM_LINK/g, config.zoomLink || "ZOOM_LINK")
      .replace(/LINK_DA_APOSTILA/g, config.apostilaLink || "LINK_DA_APOSTILA");
  };

  const copyFullHtml = async (html: string, id: string) => {
    await navigator.clipboard.writeText(applyConfig(html));
    setCopiedId(id);
    toast({ title: "HTML completo copiado!", description: "Com as configurações aplicadas." });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyBlockHtml = async (html: string, id: string) => {
    const innerContent = extractInnerContent(applyConfig(html));
    await navigator.clipboard.writeText(innerContent);
    setCopiedBlockId(id);
    toast({ title: "HTML para bloco copiado!", description: "Cole no bloco 'Código HTML' do RD Station." });
    setTimeout(() => setCopiedBlockId(null), 2000);
  };

  const copyLinkToClipboard = async (url: string, id: string) => {
    const fullUrl = `${getBaseUrl()}${url}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopiedLinkId(id);
    toast({ title: "Link copiado!" });
    setTimeout(() => setCopiedLinkId(null), 2000);
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

        {/* Painel de Configuração */}
        <EmailConfigPanel config={config} onChange={setConfig} />

        {/* Guia RD Station */}
        <div>
          <Button
            variant="outline"
            onClick={() => setShowGuide(!showGuide)}
            className="gap-2 mb-4"
          >
            <BookOpen className="h-4 w-4" />
            {showGuide ? "Ocultar Guia" : "Como usar no RD Station"}
          </Button>
          {showGuide && <RDStationGuide />}
        </div>

        {/* Jornadas */}
        <div className="space-y-6">
          {journeys.map((journey) => (
            <section key={journey.name} className={`border rounded-lg p-4 ${journey.color}`}>
              <h2 className="text-lg font-semibold text-foreground mb-4">{journey.name}</h2>

              <div className="space-y-4">
                {journey.emails.map((email) => (
                  <div key={email.id} className="bg-background/90 backdrop-blur rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded">{email.timing}</span>
                          <span className="font-medium text-foreground">{email.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground"><strong>Assunto:</strong> {email.subject}</p>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant="outline" onClick={() => setExpandedId(expandedId === email.id ? null : email.id)}>
                          {expandedId === email.id ? <><ChevronUp className="h-4 w-4 mr-1" />Fechar</> : <><ChevronDown className="h-4 w-4 mr-1" />Detalhes</>}
                        </Button>
                        <Button size="sm" onClick={() => copyBlockHtml(email.html, email.id)} className="bg-primary text-primary-foreground">
                          {copiedBlockId === email.id ? <><Check className="h-4 w-4 mr-1" />Copiado!</> : <><Code className="h-4 w-4 mr-1" />Copiar Bloco</>}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => copyFullHtml(email.html, email.id)}>
                          {copiedId === email.id ? <><Check className="h-4 w-4 mr-1" />Copiado!</> : <><FileText className="h-4 w-4 mr-1" />HTML</>}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => copyLinkToClipboard(email.publicUrl, email.id)}>
                          {copiedLinkId === email.id ? <><Check className="h-4 w-4 mr-1" />Copiado!</> : <><Link className="h-4 w-4 mr-1" />Link</>}
                        </Button>
                      </div>
                    </div>

                    {expandedId === email.id && (
                      <Tabs defaultValue="preview" className="mt-4">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                          <TabsTrigger value="blocks">Blocos Modulares</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview" className="mt-4">
                          <EmailPreview html={email.html} config={config} />
                        </TabsContent>
                        <TabsContent value="blocks" className="mt-4">
                          <ModularEmailBlocks emailName={email.name} emailContent={email.html} config={config} />
                        </TabsContent>
                      </Tabs>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
