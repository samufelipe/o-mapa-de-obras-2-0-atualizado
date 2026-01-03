-- Tabela para armazenar intenções de checkout (carrinho abandonado first-party)
CREATE TABLE public.checkout_intents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product TEXT NOT NULL CHECK (product IN ('imersao', 'mentoria')),
  email TEXT NOT NULL,
  phone TEXT,
  name TEXT,
  
  -- UTMs para rastreamento
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  
  -- URL de origem
  page_url TEXT,
  
  -- Status do checkout
  status TEXT NOT NULL DEFAULT 'started' CHECK (status IN ('started', 'purchased', 'abandoned')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  intent_date DATE NOT NULL DEFAULT CURRENT_DATE,
  
  -- RD Station sync
  sent_to_rd_at TIMESTAMP WITH TIME ZONE,
  rd_response JSONB,
  rd_attempts INTEGER DEFAULT 0,
  
  -- Índice único por email+produto+dia
  UNIQUE (email, product, intent_date)
);

-- Índices para performance
CREATE INDEX idx_checkout_intents_status ON public.checkout_intents (status);
CREATE INDEX idx_checkout_intents_created_at ON public.checkout_intents (created_at);
CREATE INDEX idx_checkout_intents_email ON public.checkout_intents (email);
CREATE INDEX idx_checkout_intents_status_created ON public.checkout_intents (status, created_at) WHERE status = 'started';

-- RLS - Esta tabela é gerenciada por edge functions
ALTER TABLE public.checkout_intents ENABLE ROW LEVEL SECURITY;

-- Política: Edge functions (service role) podem fazer tudo
CREATE POLICY "Service role full access" ON public.checkout_intents
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_checkout_intents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_checkout_intents_updated_at
  BEFORE UPDATE ON public.checkout_intents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_checkout_intents_updated_at();

-- Habilitar realtime para monitoramento
ALTER PUBLICATION supabase_realtime ADD TABLE public.checkout_intents;