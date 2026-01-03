-- Corrigir search_path na função de trigger
CREATE OR REPLACE FUNCTION public.update_checkout_intents_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;