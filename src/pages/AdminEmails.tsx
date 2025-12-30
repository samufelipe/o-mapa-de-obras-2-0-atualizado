import { useState } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
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
}

interface Journey {
  name: string;
  color: string;
  emails: EmailTemplate[];
}

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
    })),
  },
];

export default function AdminEmails() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const copyToClipboard = async (html: string, id: string) => {
    await navigator.clipboard.writeText(html);
    setCopiedId(id);
    toast({
      title: "HTML copiado!",
      description: "Cole no editor de e-mail do RD Station.",
    });
    setTimeout(() => setCopiedId(null), 2000);
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
          <p className="text-muted-foreground">
            Clique em "Copiar HTML" para copiar o código e colar no RD Station.
          </p>
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

                      <div className="flex gap-2">
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
                          onClick={() => copyToClipboard(email.html, email.id)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {copiedId === email.id ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copiar HTML
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {expandedId === email.id && (
                      <div className="mt-4 border rounded-lg overflow-hidden">
                        <div
                          className="bg-white p-4"
                          dangerouslySetInnerHTML={{ __html: email.html }}
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
            Lembre-se de substituir <code className="bg-muted px-1 rounded">[WHATSAPP_GROUP_URL]</code> e{" "}
            <code className="bg-muted px-1 rounded">[ZOOM_LINK]</code> pelos links reais.
          </p>
        </footer>
      </div>
    </div>
  );
}
