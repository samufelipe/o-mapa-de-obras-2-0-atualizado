import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy, Zap, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  identifier: string;
  product: string;
  type: "compra" | "carrinho";
  exitCondition?: string;
  rdFlowTrigger: string;
  rdFlowExit?: string;
}

const integrations: Integration[] = [
  {
    id: "imersao-compra",
    name: "Compra Aprovada (Imersão)",
    identifier: "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
    product: "Imersão Cronograma 2.0",
    type: "compra",
    rdFlowTrigger: "Conversão: imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
  },
  {
    id: "imersao-carrinho",
    name: "Carrinho Abandonado (Imersão)",
    identifier: "imersao-cronograma-2.0-o-mapa-da-obra-carrinho-abandonado",
    product: "Imersão Cronograma 2.0",
    type: "carrinho",
    exitCondition: "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
    rdFlowTrigger: "Conversão: imersao-cronograma-2.0-o-mapa-da-obra-carrinho-abandonado",
    rdFlowExit: "Conversão: imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
  },
  {
    id: "mentoria-compra",
    name: "Compra Aprovada (Mentoria)",
    identifier: "mentoria-inovando-na-sua-obra-compra-aprovada",
    product: "Mentoria Inovando na sua Obra",
    type: "compra",
    rdFlowTrigger: "Conversão: mentoria-inovando-na-sua-obra-compra-aprovada",
  },
  {
    id: "mentoria-carrinho",
    name: "Carrinho Abandonado (Mentoria)",
    identifier: "mentoria-inovando-na-sua-obra-carrinho-abandonado",
    product: "Mentoria Inovando na sua Obra",
    type: "carrinho",
    exitCondition: "mentoria-inovando-na-sua-obra-compra-aprovada",
    rdFlowTrigger: "Conversão: mentoria-inovando-na-sua-obra-carrinho-abandonado",
    rdFlowExit: "Conversão: mentoria-inovando-na-sua-obra-compra-aprovada",
  },
];

export function PlugaIntegrationGuide() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Identificador copiado!" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Identificadores Configurados */}
      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-orange-600 dark:text-orange-400">
            <Zap className="h-5 w-5" />
            Integrações Pluga → RD Station
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Os 4 <code className="px-1 bg-muted rounded">conversion_identifier</code> configurados no Pluga. 
            Estes são enviados automaticamente do Hotmart para o RD Station quando ocorre o evento.
          </p>

          <div className="grid gap-3">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="p-4 bg-background rounded-lg border space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{integration.name}</span>
                      <Badge variant={integration.type === "compra" ? "default" : "secondary"}>
                        {integration.type === "compra" ? "Compra" : "Carrinho"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{integration.product}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(integration.identifier, integration.id)}
                  >
                    {copiedId === integration.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="p-2 bg-muted/50 rounded font-mono text-xs break-all">
                  {integration.identifier}
                </div>

                {integration.exitCondition && (
                  <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Regra de saída: {integration.exitCondition}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Como Testar */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-blue-600 dark:text-blue-400">
            <AlertCircle className="h-5 w-5" />
            Como Testar as Integrações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex gap-3 p-3 bg-background rounded-lg border">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <div>
                <p className="font-medium text-foreground">Dispare evento teste no Hotmart</p>
                <p className="text-sm text-muted-foreground">Use uma compra de teste ou acesse o checkout para gerar carrinho abandonado</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-background rounded-lg border">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
              <div>
                <p className="font-medium text-foreground">Verifique no Pluga</p>
                <p className="text-sm text-muted-foreground">Confira o histórico de execuções da automação correspondente</p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-background rounded-lg border">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
              <div>
                <p className="font-medium text-foreground">Valide no RD Station</p>
                <p className="text-sm text-muted-foreground">
                  Busque o lead de teste e verifique: Histórico → "Conversão realizada" com o identificador correto
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuração no RD Station */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-purple-600 dark:text-purple-400">
            <ArrowRight className="h-5 w-5" />
            Configuração dos Fluxos no RD Station
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Configure os fluxos de automação usando os gatilhos e regras de saída abaixo:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Fluxo</th>
                  <th className="text-left py-2 px-3 font-medium">Gatilho</th>
                  <th className="text-left py-2 px-3 font-medium">Regra de Saída</th>
                </tr>
              </thead>
              <tbody>
                {integrations.map((integration) => (
                  <tr key={integration.id} className="border-b last:border-0">
                    <td className="py-3 px-3">
                      <span className="font-medium">{integration.name}</span>
                    </td>
                    <td className="py-3 px-3">
                      <code className="text-xs bg-muted px-1 rounded break-all">
                        {integration.rdFlowTrigger}
                      </code>
                    </td>
                    <td className="py-3 px-3">
                      {integration.rdFlowExit ? (
                        <code className="text-xs bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1 rounded break-all">
                          {integration.rdFlowExit}
                        </code>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-sm text-amber-600 dark:text-amber-400">
              <strong>Importante:</strong> Para fluxos de carrinho abandonado, configure a regra de saída para remover leads que realizaram a compra. Isso evita enviar emails de carrinho para quem já comprou.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
