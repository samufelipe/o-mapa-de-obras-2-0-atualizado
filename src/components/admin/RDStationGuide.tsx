import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Palette, Type, Image, MousePointerClick, LayoutTemplate } from "lucide-react";

export function RDStationGuide() {
  return (
    <Card className="border-green-500/30 bg-green-500/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-green-600 dark:text-green-400">
          <BookOpen className="h-5 w-5" />
          Como Recriar no Editor Nativo do RD Station
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Passo a passo */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Passo a Passo:</h4>
          
          <div className="grid gap-3">
            <div className="flex gap-3 p-3 bg-background rounded-lg border">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <div>
                <p className="font-medium text-foreground">Criar novo e-mail</p>
                <p className="text-sm text-muted-foreground">No RD Station, clique em "Criar novo" → "E-mail marketing"</p>
              </div>
            </div>
            
            <div className="flex gap-3 p-3 bg-background rounded-lg border">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
              <div>
                <p className="font-medium text-foreground">Escolher modelo em branco</p>
                <p className="text-sm text-muted-foreground">Selecione "Começar do zero" para ter controle total</p>
              </div>
            </div>
            
            <div className="flex gap-3 p-3 bg-background rounded-lg border">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
              <div>
                <p className="font-medium text-foreground">Configurar cor de fundo</p>
                <p className="text-sm text-muted-foreground">
                  Clique no fundo → Cor: <code className="px-1 py-0.5 bg-zinc-800 text-white rounded text-xs">#18181B</code>
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 p-3 bg-background rounded-lg border">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
              <div>
                <p className="font-medium text-foreground">Montar os blocos</p>
                <p className="text-sm text-muted-foreground">Arraste os componentes na ordem abaixo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Componentes necessários */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <LayoutTemplate className="h-4 w-4" />
            Blocos Necessários (na ordem):
          </h4>
          
          <div className="grid gap-2">
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded border-l-4 border-primary">
              <Image className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Imagem</span>
                <span className="text-muted-foreground"> — Logo/Header (600px largura)</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded border-l-4 border-primary">
              <Type className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Texto</span>
                <span className="text-muted-foreground"> — Conteúdo principal do e-mail</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded border-l-4 border-primary">
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Botão</span>
                <span className="text-muted-foreground"> — CTA (call to action)</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded border-l-4 border-primary">
              <Type className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Texto</span>
                <span className="text-muted-foreground"> — Assinatura das mentoras</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded border-l-4 border-border">
              <Type className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="font-medium">Texto</span>
                <span className="text-muted-foreground"> — Footer/Copyright (opcional)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cores e estilos */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Paleta de Cores:
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 p-2 bg-background rounded border">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#18181B" }}></div>
              <div className="text-xs">
                <p className="font-medium">Fundo</p>
                <code className="text-muted-foreground">#18181B</code>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-background rounded border">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#D4AF37" }}></div>
              <div className="text-xs">
                <p className="font-medium">Destaque</p>
                <code className="text-muted-foreground">#D4AF37</code>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-background rounded border">
              <div className="w-6 h-6 rounded border" style={{ backgroundColor: "#FFFFFF" }}></div>
              <div className="text-xs">
                <p className="font-medium">Texto</p>
                <code className="text-muted-foreground">#FFFFFF</code>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-background rounded border">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: "#A1A1AA" }}></div>
              <div className="text-xs">
                <p className="font-medium">Secundário</p>
                <code className="text-muted-foreground">#A1A1AA</code>
              </div>
            </div>
          </div>
        </div>

        {/* Dica de botão */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">💡 Configuração do Botão CTA:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Cor de fundo: <code className="px-1 bg-muted rounded">#D4AF37</code></li>
            <li>• Cor do texto: <code className="px-1 bg-muted rounded">#18181B</code></li>
            <li>• Borda arredondada: 8px</li>
            <li>• Padding: 16px vertical, 40px horizontal</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
