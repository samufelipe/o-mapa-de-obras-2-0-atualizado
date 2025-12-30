import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Palette, Type, Image, MousePointerClick, LayoutTemplate, Shield, Variable, AlertTriangle } from "lucide-react";

export function RDStationGuide() {
  return (
    <div className="space-y-6">
      {/* Guia Principal */}
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
                  <p className="font-medium text-foreground">Adicionar imagem de header</p>
                  <p className="text-sm text-muted-foreground">Arraste um bloco de imagem e faça upload do seu header (600px largura)</p>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 bg-background rounded-lg border">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">5</div>
                <div>
                  <p className="font-medium text-foreground">Colar o HTML do template</p>
                  <p className="text-sm text-muted-foreground">Use o botão "Copiar Bloco" e cole no bloco de código HTML</p>
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
                  <span className="font-medium">Código HTML</span>
                  <span className="text-muted-foreground"> — Cole o conteúdo do template aqui</span>
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

      {/* Variáveis de Personalização */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-blue-600 dark:text-blue-400">
            <Variable className="h-5 w-5" />
            Variáveis de Personalização
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Os templates já usam a sintaxe correta do RD Station. As variáveis serão substituídas automaticamente:
          </p>
          
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
              <div>
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">*|NOME:Arquiteta|*</code>
                <p className="text-xs text-muted-foreground mt-1">Nome do lead (fallback: "Arquiteta")</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
              <div>
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">*|EMAIL|*</code>
                <p className="text-xs text-muted-foreground mt-1">E-mail do lead</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">
              <strong>Link de descadastro:</strong> O RD Station adiciona automaticamente o link de descadastro no rodapé de todos os e-mails. Não é necessário incluir manualmente.
            </p>
          </div>
          
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <strong>Dica:</strong> No editor visual do RD Station, você também pode clicar no botão "Variáveis" para inserir campos personalizados.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Configuração de Domínio */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-purple-600 dark:text-purple-400">
            <Shield className="h-5 w-5" />
            Autenticação de Domínio (Anti-Spam)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Para evitar que seus e-mails caiam no spam, configure a autenticação do seu domínio:
          </p>
          
          <div className="grid gap-3">
            <div className="p-3 bg-background rounded-lg border border-l-4 border-l-purple-500">
              <p className="font-medium text-foreground">1. SPF (Sender Policy Framework)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione o registro TXT do RD Station no DNS do seu domínio.
              </p>
            </div>
            
            <div className="p-3 bg-background rounded-lg border border-l-4 border-l-purple-500">
              <p className="font-medium text-foreground">2. DKIM (DomainKeys Identified Mail)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Assina digitalmente seus e-mails para provar autenticidade.
              </p>
            </div>
            
            <div className="p-3 bg-background rounded-lg border border-l-4 border-l-purple-500">
              <p className="font-medium text-foreground">3. DMARC</p>
              <p className="text-sm text-muted-foreground mt-1">
                Define como e-mails não autenticados devem ser tratados.
              </p>
            </div>
          </div>
          
          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-purple-600 dark:text-purple-400">
              <strong>Como fazer:</strong> No RD Station, vá em Configurações → Autenticação de Domínio. Siga o passo a passo para adicionar os registros DNS.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Boas Práticas Anti-Spam */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Boas Práticas Anti-Spam
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Os templates já incluem elementos obrigatórios. Certifique-se de:
          </p>
          
          <div className="grid gap-2">
            <div className="flex items-start gap-2 p-2 bg-background rounded border">
              <span className="text-green-500 mt-0.5">✓</span>
              <div className="text-sm">
                <span className="font-medium">Link de descadastro</span>
                <span className="text-muted-foreground"> — Já incluído no footer</span>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-2 bg-background rounded border">
              <span className="text-green-500 mt-0.5">✓</span>
              <div className="text-sm">
                <span className="font-medium">Endereço físico</span>
                <span className="text-muted-foreground"> — Já incluído no footer</span>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-2 bg-background rounded border">
              <span className="text-green-500 mt-0.5">✓</span>
              <div className="text-sm">
                <span className="font-medium">Preheader text</span>
                <span className="text-muted-foreground"> — Texto de preview invisível</span>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-2 bg-background rounded border">
              <span className="text-yellow-500 mt-0.5">!</span>
              <div className="text-sm">
                <span className="font-medium">Remetente verificado</span>
                <span className="text-muted-foreground"> — Use e-mail com seu domínio (não Gmail)</span>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-2 bg-background rounded border">
              <span className="text-yellow-500 mt-0.5">!</span>
              <div className="text-sm">
                <span className="font-medium">Lista limpa</span>
                <span className="text-muted-foreground"> — Envie apenas para quem se inscreveu</span>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              <strong>Importante:</strong> Evite palavras como "GRÁTIS", "URGENTE", "ÚLTIMA CHANCE" em excesso. Os templates já usam linguagem equilibrada.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
