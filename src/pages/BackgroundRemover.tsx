import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { removeBackground, loadImage } from '@/lib/background-removal';
import { toast } from 'sonner';
import { Upload, Download, Loader2, ImageIcon } from 'lucide-react';

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setProcessedImage(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const processImage = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    toast.info('Carregando modelo de IA... Isso pode levar alguns segundos na primeira vez.');

    try {
      const response = await fetch(originalImage);
      const blob = await response.blob();
      const img = await loadImage(blob);
      
      const resultBlob = await removeBackground(img);
      const resultUrl = URL.createObjectURL(resultBlob);
      
      setProcessedImage(resultUrl);
      toast.success('Background removido com sucesso!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Erro ao processar imagem. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'imagem-sem-fundo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Imagem baixada!');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-6 w-6" />
              Remover Background
            </CardTitle>
            <CardDescription>
              Use IA para remover o fundo de suas imagens automaticamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">
                  Arraste uma imagem ou clique para selecionar
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  PNG, JPG, WEBP até 10MB
                </p>
              </label>
            </div>

            {/* Image Preview */}
            {originalImage && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Original</p>
                  <div className="border rounded-lg p-2 bg-muted/50">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="max-h-64 mx-auto object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Sem Background</p>
                  <div 
                    className="border rounded-lg p-2 min-h-[200px] flex items-center justify-center"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  >
                    {processedImage ? (
                      <img
                        src={processedImage}
                        alt="Processed"
                        className="max-h-64 mx-auto object-contain"
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Clique em "Remover Background" para processar
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            {originalImage && (
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={processImage}
                  disabled={isProcessing}
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Remover Background'
                  )}
                </Button>

                {processedImage && (
                  <Button onClick={downloadImage} variant="outline" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Imagem
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
