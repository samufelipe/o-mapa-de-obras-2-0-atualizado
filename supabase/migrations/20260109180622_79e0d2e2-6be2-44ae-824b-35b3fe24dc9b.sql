-- Adicionar colunas de auditoria de eventos de compra
ALTER TABLE public.checkout_intents
ADD COLUMN IF NOT EXISTS purchased_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS purchase_sent_to_rd_at TIMESTAMPTZ DEFAULT NULL,
ADD COLUMN IF NOT EXISTS purchase_rd_success BOOLEAN DEFAULT NULL,
ADD COLUMN IF NOT EXISTS hotmart_transaction_id TEXT DEFAULT NULL;

-- Comentários para documentação
COMMENT ON COLUMN public.checkout_intents.purchased_at IS 'Data/hora quando a compra foi confirmada via webhook Hotmart';
COMMENT ON COLUMN public.checkout_intents.purchase_sent_to_rd_at IS 'Data/hora quando o evento de compra foi enviado ao RD Station';
COMMENT ON COLUMN public.checkout_intents.purchase_rd_success IS 'Se o envio do evento de compra ao RD Station foi bem-sucedido';
COMMENT ON COLUMN public.checkout_intents.hotmart_transaction_id IS 'ID da transação no Hotmart para referência';