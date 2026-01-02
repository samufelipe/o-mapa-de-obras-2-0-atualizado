import { useState, useEffect } from "react";
import { Check, Copy, Link, ChevronDown, ChevronUp, Code, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { EmailConfigPanel } from "@/components/admin/EmailConfigPanel";
import { RDStationGuide } from "@/components/admin/RDStationGuide";
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
  emails: EmailTemplate[];
}

const getBaseUrl = () => window.location.origin;

const journeys: Journey[] = [
  {
    name: "Jornada Boas-vindas (3 e-mails)",
    color: "bg-green-500/20 border-green-500/50",
    emails: [
      { id: "B1", name: "Vaga Confirmada", subject: "Sua vaga está confirmada!", timing: "Imediato", publicUrl: "/emails/boas-vindas-1.html" },
      { id: "B2", name: "Você tomou a melhor decisão", subject: "Você tomou a melhor decisão", timing: "+1 dia", publicUrl: "/emails/boas-vindas-2.html" },
      { id: "B3", name: "Link do Zoom", subject: "Seu link do Zoom está aqui!", timing: "Véspera", publicUrl: "/emails/boas-vindas-3.html" },
    ],
  },
  {
    name: "Jornada Nutrição (8 e-mails)",
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
    name: "Jornada Pós-Live (1 e-mail)",
    color: "bg-purple-500/20 border-purple-500/50",
    emails: [
      { id: "PL1", name: "Replay 48h", subject: "🎬 Replay disponível por 48h - Assista AGORA", timing: "+1 dia após live", publicUrl: "/emails/pos-live-1.html" },
    ],
  },
  {
    name: "Jornada Resgate (5 e-mails)",
    color: "bg-amber-500/20 border-amber-500/50",
    emails: [
      { id: "R1", name: "Quase lá!", subject: "Você estava quase lá...", timing: "+30 min", publicUrl: "/emails/resgate-1.html" },
      { id: "R2", name: "+250 obras entregues", subject: "+250 obras entregues: o que elas têm em comum?", timing: "+1 dia", publicUrl: "/emails/resgate-2.html" },
      { id: "R3", name: "Última chance", subject: "Última chance: sua vaga expira hoje", timing: "+3 dias", publicUrl: "/emails/resgate-3.html" },
      { id: "R4", name: "Oferta especial", subject: "Presente especial para você", timing: "+5 dias", publicUrl: "/emails/resgate-4.html" },
      { id: "R5", name: "Encerramento", subject: "Encerrando sua oportunidade", timing: "+7 dias", publicUrl: "/emails/resgate-5.html" },
    ],
  },
  {
    name: "Jornada Carrinho Abandonado (8 e-mails)",
    color: "bg-red-500/20 border-red-500/50",
    emails: [
      { id: "C1", name: "Lembrete imediato", subject: "Você estava quase lá...", timing: "+1 hora", publicUrl: "/emails/carrinho-1.html" },
      { id: "C2", name: "Transformação + Prova social", subject: "O que arquitetas bem-sucedidas fazem diferente", timing: "+1 dia", publicUrl: "/emails/carrinho-2.html" },
      { id: "C3", name: "Quebra de objeções", subject: "Será que é o momento certo?", timing: "+2 dias", publicUrl: "/emails/carrinho-3.html" },
      { id: "C4", name: "Case de sucesso", subject: "A história de quem estava no seu lugar...", timing: "+4 dias", publicUrl: "/emails/carrinho-4.html" },
      { id: "C5", name: "Resumo + Bônus", subject: "Presente especial para você", timing: "+6 dias", publicUrl: "/emails/carrinho-5.html" },
      { id: "C6", name: "Contagem 48h", subject: "⏰ Restam 48 horas", timing: "+8 dias", publicUrl: "/emails/carrinho-6.html" },
      { id: "C7", name: "Penúltimo dia", subject: "AMANHÃ acaba sua chance", timing: "+9 dias", publicUrl: "/emails/carrinho-7.html" },
      { id: "C8", name: "Última chance (3h)", subject: "🚨 ÚLTIMA CHANCE — Carrinho fecha em 3 horas", timing: "+10 dias", publicUrl: "/emails/carrinho-8.html" },
    ],
  },
  {
    name: "Jornada Reembolso (1 e-mail)",
    color: "bg-gray-500/20 border-gray-500/50",
    emails: [
      { id: "RE1", name: "Reembolso processado", subject: "Seu reembolso foi processado", timing: "Imediato", publicUrl: "/emails/reembolso-1.html" },
    ],
  },
];

export default function AdminEmails() {
  const { toast } = useToast();
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [emailContents, setEmailContents] = useState<Record<string, string>>({});
  const [showGuide, setShowGuide] = useState(false);
  const [config, setConfig] = useState({
    headerImageUrl: "",
    whatsappGroupUrl: "",
    zoomLink: "",
    apostilaLink: "",
  });

  // Carregar HTML do email quando expandir
  useEffect(() => {
    if (expandedId) {
      const email = journeys.flatMap(j => j.emails).find(e => e.id === expandedId);
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

        <div>
          <Button variant="outline" onClick={() => setShowGuide(!showGuide)} className="gap-2 mb-4">
            <BookOpen className="h-4 w-4" />
            {showGuide ? "Ocultar Guia" : "Como usar no RD Station"}
          </Button>
          {showGuide && <RDStationGuide />}
        </div>

        <div className="space-y-6">
          {journeys.map((journey) => (
            <section key={journey.name} className={`border rounded-lg p-4 ${journey.color}`}>
              <h2 className="text-lg font-semibold text-foreground mb-4">{journey.name}</h2>

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
    </div>
  );
}
