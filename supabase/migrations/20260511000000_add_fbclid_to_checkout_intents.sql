-- Add fbclid column to store Meta click ID for CAPI attribution
ALTER TABLE checkout_intents ADD COLUMN IF NOT EXISTS fbclid text;