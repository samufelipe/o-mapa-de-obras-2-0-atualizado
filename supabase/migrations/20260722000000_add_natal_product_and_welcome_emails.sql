-- Adiciona o produto "natal" (Imersão Cronograma Especial de Natal) ao
-- checkout_intents, e uma coluna de idempotência para a sequência de
-- e-mails de boas-vindas via Resend, evitando reenvio em caso de retry
-- do webhook da Hotmart.

ALTER TABLE public.checkout_intents
  DROP CONSTRAINT checkout_intents_product_check;

ALTER TABLE public.checkout_intents
  ADD CONSTRAINT checkout_intents_product_check
  CHECK (product IN ('imersao', 'mentoria', 'natal'));

ALTER TABLE public.checkout_intents
  ADD COLUMN natal_welcome_emails_sent_at TIMESTAMPTZ NULL;
