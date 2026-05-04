-- Cron job: abandonment-sweeper a cada 10 minutos
SELECT cron.schedule(
  'abandonment-sweeper-every-10min',
  '*/10 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://zfelkpnzdfficpenspmb.supabase.co/functions/v1/abandonment-sweeper',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZWxrcG56ZGZmaWNwZW5zcG1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzg2MTg3MSwiZXhwIjoyMDkzNDM3ODcxfQ.mt8hkDNVIIkdkgNLY6OXuxODW8p5g5LIzWcdxA5Pjzw'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);