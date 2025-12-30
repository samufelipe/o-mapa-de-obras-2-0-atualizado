import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface EmailConfig {
  headerImageUrl: string;
  whatsappGroupUrl: string;
  zoomLink: string;
  apostilaLink: string;
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
            <Label htmlFor="whatsappGroupUrl">Link do Grupo WhatsApp</Label>
            <Input
              id="whatsappGroupUrl"
              placeholder="https://chat.whatsapp.com/..."
              value={config.whatsappGroupUrl}
              onChange={(e) => updateConfig("whatsappGroupUrl", e.target.value)}
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
      </CardContent>
    </Card>
  );
}
