// ============================================
// CONFIGURAÇÕES DE INTEGRAÇÕES
// Preencha os valores abaixo com suas credenciais
// ============================================

export const CONFIG = {
  // RD Station Marketing
  rdStation: {
    // Webhook URL do RD Station para receber conversões
    // Obter em: RD Station → Integrações → Webhook
    webhookUrl: "PREENCHER_WEBHOOK_RD_STATION",
    
    // Identificador da conversão (nome do evento no RD)
    conversionIdentifier: "inscricao-mapa-obras-2",
    
    // Tags para segmentação no RD Station
    tags: ["workshop-mapa-obras", "lead-meta-ads", "lote-01"],
  },
  
  // Hotmart Checkout
  hotmart: {
    // Link do checkout do produto
    // Obter em: Hotmart → Produtos → Seu Produto → Links de Divulgação
    checkoutUrl: "https://pay.hotmart.com/K103578257F?checkoutMode=10&bid=1767049086095",
    
    // Se true, passa os dados do lead para pré-preencher o checkout
    preFillCheckout: true,
  },
  
  // Meta Pixel (Facebook/Instagram Ads)
  metaPixel: {
    // ID do Pixel
    // Obter em: Meta Business Suite → Gerenciador de Eventos → Origens de Dados → Pixel
    pixelId: "PREENCHER_PIXEL_ID",
    
    // Habilitar tracking (desativar em desenvolvimento se necessário)
    enabled: true,
  },
  
  // Configurações do formulário
  form: {
    // Tempo de exibição da tela de transição antes do redirect (em ms)
    redirectDelay: 2000,
    
    // Mensagem de transição
    redirectMessage: "Redirecionando para pagamento seguro...",
  },
} as const;

// ============================================
// VALIDAÇÃO DE CONFIGURAÇÃO
// ============================================

export const isConfigValid = (): { valid: boolean; missing: string[] } => {
  const missing: string[] = [];
  
  if (CONFIG.rdStation.webhookUrl === "PREENCHER_WEBHOOK_RD_STATION") {
    missing.push("RD Station Webhook URL");
  }
  
  // Hotmart URL já está configurada, não precisa validar
  
  if (CONFIG.metaPixel.pixelId === "PREENCHER_PIXEL_ID") {
    missing.push("Meta Pixel ID");
  }
  
  return {
    valid: missing.length === 0,
    missing,
  };
};

// Log de aviso em desenvolvimento
if (typeof window !== "undefined") {
  const { valid, missing } = isConfigValid();
  if (!valid) {
    console.warn(
      "⚠️ Configurações pendentes em src/lib/config.ts:",
      missing.join(", ")
    );
  }
}
