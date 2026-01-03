import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface EmailConfig {
  headerImageUrl: string;
  imersaoWhatsappUrl: string;
  mentoriaWhatsappUrl: string;
  zoomLink: string;
  apostilaLink: string;
  imersaoCheckoutUrl: string;
  mentoriaCheckoutUrl: string;
}

interface EmailConfigPanelProps {
  config: EmailConfig;
  onChange: (config: EmailConfig) => void;
}

export function EmailConfigPanel({ config, onChange }: EmailConfigPanelProps) {
  const updateConfig = (key: keyof EmailConfig, value: string) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="h-5 w-5 text-primary" />
          Configurações Globais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Configurações Gerais */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Configurações Gerais</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="headerImageUrl">URL da Imagem do Header</Label>
                <Input
                  id="headerImageUrl"
                  placeholder="https://exemplo.com/header.png"
                  value={config.headerImageUrl}
                  onChange={(e) => updateConfig("headerImageUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zoomLink">Link do Zoom</Label>
                <Input
                  id="zoomLink"
                  placeholder="https://zoom.us/j/..."
                  value={config.zoomLink}
                  onChange={(e) => updateConfig("zoomLink", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apostilaLink">Link da Apostila</Label>
                <Input
                  id="apostilaLink"
                  placeholder="https://drive.google.com/..."
                  value={config.apostilaLink}
                  onChange={(e) => updateConfig("apostilaLink", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Imersão Cronograma 2.0 */}
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-3">🎯 Imersão Cronograma 2.0</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="imersaoWhatsappUrl">Grupo WhatsApp (Imersão)</Label>
                <Input
                  id="imersaoWhatsappUrl"
                  placeholder="https://chat.whatsapp.com/..."
                  value={config.imersaoWhatsappUrl}
                  onChange={(e) => updateConfig("imersaoWhatsappUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imersaoCheckoutUrl">URL de Checkout (Imersão)</Label>
                <Input
                  id="imersaoCheckoutUrl"
                  placeholder="https://pay.hotmart.com/..."
                  value={config.imersaoCheckoutUrl}
                  onChange={(e) => updateConfig("imersaoCheckoutUrl", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Mentoria Inovando */}
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-3">🚀 Mentoria Inovando na sua Obra</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mentoriaWhatsappUrl">Grupo WhatsApp (Mentoria)</Label>
                <Input
                  id="mentoriaWhatsappUrl"
                  placeholder="https://chat.whatsapp.com/..."
                  value={config.mentoriaWhatsappUrl}
                  onChange={(e) => updateConfig("mentoriaWhatsappUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mentoriaCheckoutUrl">URL de Checkout (Mentoria)</Label>
                <Input
                  id="mentoriaCheckoutUrl"
                  placeholder="https://pay.hotmart.com/..."
                  value={config.mentoriaCheckoutUrl}
                  onChange={(e) => updateConfig("mentoriaCheckoutUrl", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
