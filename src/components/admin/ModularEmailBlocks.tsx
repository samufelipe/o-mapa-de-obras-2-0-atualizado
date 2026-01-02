import { useState } from "react";
import { Check, Copy, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface EmailConfig {
  headerImageUrl: string;
  whatsappGroupUrl: string;
  zoomLink: string;
  apostilaLink: string;
}

interface ModularEmailBlocksProps {
  emailName: string;
  emailContent: string;
  config: EmailConfig;
}

interface Block {
  name: string;
  description: string;
  content: string;
}

export function ModularEmailBlocks({ emailName, emailContent, config }: ModularEmailBlocksProps) {
  const { toast } = useToast();
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);
  const [copiedFull, setCopiedFull] = useState<"desktop" | "mobile" | null>(null);

  const applyConfig = (html: string): string => {
    return html
      .replace(/HEADER_IMAGE_URL/g, config.headerImageUrl || "HEADER_IMAGE_URL")
      .replace(/WHATSAPP_GROUP_URL/g, config.whatsappGroupUrl || "WHATSAPP_GROUP_URL")
      .replace(/ZOOM_LINK/g, config.zoomLink || "ZOOM_LINK")
      .replace(/LINK_DA_APOSTILA/g, config.apostilaLink || "LINK_DA_APOSTILA");
  };

  const extractBlocks = (html: string): Block[] => {
    const blocks: Block[] = [];
    
    // Header/Logo
    const headerMatch = html.match(/<img[^>]*src="[^"]*"[^>]*alt="A Virada da Arquiteta"[^>]*>/i);
    if (headerMatch) {
      blocks.push({
        name: "Header/Logo",
        description: "Imagem do cabeçalho (usar componente Imagem do RD)",
        content: `<img src="${config.headerImageUrl || 'HEADER_IMAGE_URL'}" alt="A Virada da Arquiteta" style="max-width: 100%; height: auto; display: block;">`,
      });
    }

    // Conteúdo principal (texto)
    const contentMatch = html.match(/<!-- Conteúdo -->([\s\S]*?)<!-- Assinatura -->/i);
    if (contentMatch) {
      // Limpar e extrair só o texto
      const content = contentMatch[1]
        .replace(/<td[^>]*>/gi, "")
        .replace(/<\/td>/gi, "")
        .replace(/<tr[^>]*>/gi, "")
        .replace(/<\/tr>/gi, "")
        .trim();
      
      blocks.push({
        name: "Conteúdo",
        description: "Texto principal (usar componente Texto do RD)",
        content: applyConfig(content),
      });
    }

    // Botão CTA
    const buttonMatch = html.match(/<a[^>]*href="([^"]*)"[^>]*style="[^"]*background-color:\s*#D4AF37[^"]*"[^>]*>([^<]*)<\/a>/i);
    if (buttonMatch) {
      blocks.push({
        name: "Botão CTA",
        description: "Botão de ação (usar componente Botão do RD)",
        content: `Link: ${applyConfig(buttonMatch[1])}\nTexto: ${buttonMatch[2].trim()}`,
      });
    }

    // Assinatura
    const signatureMatch = html.match(/<!-- Assinatura -->([\s\S]*?)<!-- Footer -->/i);
    if (signatureMatch) {
      const signature = signatureMatch[1]
        .replace(/<td[^>]*>/gi, "")
        .replace(/<\/td>/gi, "")
        .replace(/<tr[^>]*>/gi, "")
        .replace(/<\/tr>/gi, "")
        .trim();
      
      blocks.push({
        name: "Assinatura",
        description: "Assinatura das mentoras (usar componente Texto do RD)",
        content: signature,
      });
    }

    // Footer
    blocks.push({
      name: "Footer",
      description: "Rodapé com copyright (usar componente Texto do RD)",
      content: `<p style="text-align: center; color: #71717A; font-size: 12px;">© 2025 A Virada da Arquiteta. Todos os direitos reservados.</p>`,
    });

    return blocks;
  };

  const blocks = extractBlocks(emailContent);

  const copyBlock = async (block: Block) => {
    await navigator.clipboard.writeText(block.content);
    setCopiedBlock(block.name);
    toast({
      title: `${block.name} copiado!`,
      description: block.description,
    });
    setTimeout(() => setCopiedBlock(null), 2000);
  };

  const copyFullHtml = async (format: "desktop" | "mobile") => {
    let html = applyConfig(emailContent);
    
    if (format === "mobile") {
      // Ajustar largura para mobile (100% ao invés de 600px)
      html = html
        .replace(/width:\s*600px/gi, "width: 100%")
        .replace(/max-width:\s*600px/gi, "max-width: 100%")
        .replace(/width="600"/gi, 'width="100%"');
    }
    
    await navigator.clipboard.writeText(html);
    setCopiedFull(format);
    toast({
      title: `HTML ${format === "desktop" ? "Desktop" : "Mobile"} copiado!`,
      description: "Cole diretamente no editor HTML do RD Station",
    });
    setTimeout(() => setCopiedFull(null), 2000);
  };

  return (
    <Card className="border-blue-500/30 bg-blue-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Blocos Modulares — {emailName}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Copie cada bloco e cole no componente correspondente do RD Station
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Botões para copiar HTML completo */}
        <div className="flex flex-wrap gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="w-full text-xs font-medium text-primary mb-1">Copiar HTML Completo:</p>
          <Button
            size="sm"
            variant={copiedFull === "desktop" ? "default" : "outline"}
            onClick={() => copyFullHtml("desktop")}
            className="flex-1 min-w-[120px]"
          >
            {copiedFull === "desktop" ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copiado!
              </>
            ) : (
              <>
                <Monitor className="h-3 w-3 mr-1" />
                Desktop (600px)
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant={copiedFull === "mobile" ? "default" : "outline"}
            onClick={() => copyFullHtml("mobile")}
            className="flex-1 min-w-[120px]"
          >
            {copiedFull === "mobile" ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copiado!
              </>
            ) : (
              <>
                <Smartphone className="h-3 w-3 mr-1" />
                Mobile (100%)
              </>
            )}
          </Button>
        </div>

        {/* Blocos individuais */}
        <div className="space-y-2">
          {blocks.map((block) => (
            <div
              key={block.name}
              className="flex items-center justify-between p-3 bg-background rounded-lg border"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{block.name}</p>
                <p className="text-xs text-muted-foreground truncate">{block.description}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyBlock(block)}
                className="ml-3 shrink-0"
              >
                {copiedBlock === block.name ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
