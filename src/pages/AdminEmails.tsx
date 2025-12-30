import { useState } from "react";
import { Check, Copy, Link, ChevronDown, ChevronUp, Code, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  JORNADA_RESGATE,
  JORNADA_BOAS_VINDAS,
  JORNADA_CARRINHO,
  JORNADA_REEMBOLSO,
} from "@/lib/email-templates";

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

// Mapeamento de IDs para nomes de arquivos públicos
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
};

const getBaseUrl = () => {
  return window.location.origin;
};

// Extrai apenas o conteúdo interno (sem html, head, body tags)
const extractInnerContent = (html: string): string => {
  // Remove doctype, html, head e body tags, mantendo apenas o conteúdo
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1].trim();
  }
  // Se não encontrar body, tenta encontrar a tabela principal
  const tableMatch = html.match(/(<table[\s\S]*<\/table>)/i);
  if (tableMatch) {
    return tableMatch[1].trim();
  }
  return html;
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
  const [showInstructions, setShowInstructions] = useState(false);

  const copyFullHtml = async (html: string, id: string) => {
    await navigator.clipboard.writeText(html);
    setCopiedId(id);
    toast({
      title: "HTML completo copiado!",
      description: "Contém todo o documento HTML.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyBlockHtml = async (html: string, id: string) => {
    const innerContent = extractInnerContent(html);
    await navigator.clipboard.writeText(innerContent);
    setCopiedBlockId(id);
    toast({
      title: "HTML para bloco copiado!",
      description: "Cole no bloco 'Código HTML' do RD Station.",
    });
    setTimeout(() => setCopiedBlockId(null), 2000);
  };

  const copyLinkToClipboard = async (url: string, id: string) => {
    const fullUrl = `${getBaseUrl()}${url}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopiedLinkId(id);
    toast({
      title: "Link copiado!",
      description: "Cole no campo de URL do RD Station.",
    });
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  const togglePreview = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Templates de E-mail
          </h1>
          <p className="text-muted-foreground mb-4">
            Use <strong>"Copiar Bloco"</strong> para colar o HTML diretamente no editor do RD Station.
          </p>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowInstructions(!showInstructions)}
            className="gap-2"
          >
            <Info className="h-4 w-4" />
            {showInstructions ? "Ocultar instruções" : "Como usar no RD Station"}
          </Button>

          {showInstructions && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-3">📧 Como usar os templates no RD Station:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>No RD Station, crie um <strong>novo e-mail</strong></li>
                <li>Escolha "Modelo em branco" ou um modelo simples</li>
                <li>Adicione um bloco <strong>"Código HTML"</strong></li>
                <li>Clique no botão <strong>"Copiar Bloco"</strong> do template desejado aqui</li>
                <li>Cole o HTML no bloco de código do RD Station</li>
                <li>Substitua as variáveis conforme necessário</li>
              </ol>
              
              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">⚠️ Variáveis a substituir:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li><code className="bg-muted px-1 rounded">{"{{nome}}"}</code> → Variável do RD Station (substitui automaticamente)</li>
                  <li><code className="bg-muted px-1 rounded">HEADER_IMAGE_URL</code> → URL da imagem do cabeçalho</li>
                  <li><code className="bg-muted px-1 rounded">LINK_DA_APOSTILA</code> → Link para download da apostila</li>
                  <li><code className="bg-muted px-1 rounded">WHATSAPP_GROUP_URL</code> → Link do grupo do WhatsApp</li>
                  <li><code className="bg-muted px-1 rounded">ZOOM_LINK</code> → Link da sala do Zoom</li>
                </ul>
              </div>
            </div>
          )}
        </header>

        <div className="space-y-8">
          {journeys.map((journey) => (
            <section key={journey.name} className={`border rounded-lg p-4 ${journey.color}`}>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {journey.name}
              </h2>

              <div className="space-y-3">
                {journey.emails.map((email) => (
                  <div
                    key={email.id}
                    className="bg-background/80 backdrop-blur rounded-lg border border-border p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded">
                            {email.timing}
                          </span>
                          <span className="font-medium text-foreground">
                            {email.name}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Assunto:</strong> {email.subject}
                        </p>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePreview(email.id)}
                        >
                          {expandedId === email.id ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Fechar
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              Preview
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => copyBlockHtml(email.html, email.id)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {copiedBlockId === email.id ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Code className="h-4 w-4 mr-1" />
                              Copiar Bloco
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyFullHtml(email.html, email.id)}
                        >
                          {copiedId === email.id ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <FileText className="h-4 w-4 mr-1" />
                              HTML Completo
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyLinkToClipboard(email.publicUrl, email.id)}
                        >
                          {copiedLinkId === email.id ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Link className="h-4 w-4 mr-1" />
                              Link
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {expandedId === email.id && (
                      <div className="mt-4 border rounded-lg overflow-hidden">
                        <iframe
                          srcDoc={email.html}
                          className="w-full bg-white"
                          style={{ height: "600px" }}
                          title={`Preview ${email.name}`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Use <strong>"Copiar Bloco"</strong> para o método recomendado no RD Station.
          </p>
        </footer>
      </div>
    </div>
  );
}