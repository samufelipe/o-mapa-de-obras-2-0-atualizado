import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Data/hora do evento (mesmo valor de src/lib/natal-constants.ts).
// Duplicado aqui de propósito: edge functions do Supabase são bundladas
// isoladamente, sem cruzar pro diretório src/ do frontend.
const NATAL_EVENT_DATE = new Date("2026-08-08T23:59:59-03:00");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-hotmart-hottok",
};

const HOTMART_HOTTOK = Deno.env.get("HOTMART_HOTTOK");
const DEBUG_MODE = Deno.env.get("HOTMART_DEBUG_MODE") === "true";

interface HotmartWebhookPayload {
  event?: string;
  data?: {
    buyer?: { email?: string; name?: string; phone?: string };
    product?: { id?: number; name?: string };
    purchase?: { status?: string; transaction?: string; order_date?: string };
  };
  buyer?: { email?: string; name?: string };
  product?: { id?: number; name?: string };
  purchase?: { status?: string; transaction?: string };
  buyer_email?: string;
  buyer_name?: string;
  product_name?: string;
  status?: string;
  transaction?: string;
  hottok?: string;
}

// ─── Meta CAPI helpers ────────────────────────────────────────────────────────

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.toLowerCase().trim());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Metadados de CAPI por produto. imersao/mentoria mantêm exatamente os
// valores hardcoded originais (comportamento intocado); só "natal" usa
// dados próprios.
const CAPI_PRODUCT_META: Record<string, { value: number; contentName: string; eventSourceUrl: string }> = {
  natal: {
    value: 29.90,
    contentName: "Imersão Cronograma Especial de Natal",
    eventSourceUrl: "https://cronogramadenatal.inovandonasuaobra.com.br",
  },
};

const DEFAULT_CAPI_META = {
  value: 39.90,
  contentName: "Imersão Cronograma 2.0",
  eventSourceUrl: "https://inscricao.imersao.inovandonasuaobra.com.br",
};

async function sendMetaCAPIEvent(params: {
  requestId: string;
  email: string;
  phone?: string | null;
  fbclid?: string | null;
  transactionId?: string | null;
  eventTime: number;
  product: string;
}): Promise<void> {
  const pixelId = Deno.env.get("META_PIXEL_ID");
  const accessToken = Deno.env.get("META_CAPI_ACCESS_TOKEN");
  const testEventCode = Deno.env.get("META_CAPI_TEST_CODE");

  if (!pixelId || !accessToken) {
    console.warn(`[${params.requestId}] ⚠️ [CAPI] META_PIXEL_ID ou META_CAPI_ACCESS_TOKEN não configurado — pulando`);
    return;
  }

  const hashedEmail = await sha256(params.email);

  const userData: Record<string, unknown> = {
    em: [hashedEmail],
  };

  if (params.phone) {
    const phoneClean = params.phone.replace(/\D/g, "");
    if (phoneClean.length >= 10) {
      userData.ph = [await sha256(phoneClean)];
    }
  }

  // fbc = fb.1.{timestamp_ms}.{fbclid}
  if (params.fbclid) {
    userData.fbc = `fb.1.${params.eventTime * 1000}.${params.fbclid}`;
  }

  const productMeta = CAPI_PRODUCT_META[params.product] || DEFAULT_CAPI_META;

  const eventData: Record<string, unknown> = {
    event_name: "Purchase",
    event_time: params.eventTime,
    action_source: "website",
    event_source_url: productMeta.eventSourceUrl,
    user_data: userData,
    custom_data: {
      currency: "BRL",
      value: productMeta.value,
      content_name: productMeta.contentName,
      content_type: "product",
      num_items: 1,
    },
  };

  // event_id para deduplicação com o pixel do browser
  if (params.transactionId) {
    eventData.event_id = params.transactionId;
    (eventData.custom_data as Record<string, unknown>).order_id = params.transactionId;
  }

  const payload: Record<string, unknown> = {
    data: [eventData],
    access_token: accessToken,
  };

  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log(`[${params.requestId}] ✅ [CAPI] Purchase enviado ao Meta. events_received: ${result.events_received}`);
    } else {
      console.error(`[${params.requestId}] ❌ [CAPI] Erro Meta:`, JSON.stringify(result));
    }
  } catch (err) {
    console.error(`[${params.requestId}] ❌ [CAPI] Falha na chamada:`, err);
  }
}

// ─── Templates de e-mail: boas-vindas da Imersão de Natal ────────────────────
// Mesmo conteúdo de src/lib/natal-email-templates.ts, duplicado aqui de
// propósito (ver comentário de NATAL_EVENT_DATE acima sobre bundling isolado
// das edge functions).

const NATAL_EMAIL_CONFIG = {
  whatsappGroupUrl: "https://chat.whatsapp.com/GnK3LCisql3CJYOuPKBDMx",
  instagramUrl: "https://www.instagram.com/inovandonasuaobra/",
  logoUrl: "https://cronogramadenatal.inovandonasuaobra.com.br/brand-natal/logo-horizontal.png",
  colors: {
    background: "#faf8f4",
    foreground: "#1b3b2f",
    gold: "#c89b41",
    cta: "#c1252d",
    ctaHover: "#aa1d24",
    border: "#d3deda",
    mutedForeground: "#4c675d",
  },
};

const createNatalButton = (text: string, url: string) => `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 24px auto;">
  <tr>
    <td align="center" style="background-color: ${NATAL_EMAIL_CONFIG.colors.cta}; border-radius: 4px;">
      <a href="${url}" style="display: inline-block; padding: 16px 32px; color: #ffffff !important; text-decoration: none; font-weight: bold; font-size: 15px; letter-spacing: 0.05em; text-transform: uppercase;">
        ${text}
      </a>
    </td>
  </tr>
</table>`;

const createNatalEmailWrapper = (content: string, preheaderText: string = "") => `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <!--[if !mso]><!-->
  <style>
    :root { color-scheme: light only; supported-color-schemes: light only; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .content-padding { padding: 20px !important; }
    }
  </style>
  <!--<![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${NATAL_EMAIL_CONFIG.colors.background}; font-family: 'Nunito Sans', Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; width: 100% !important;">
  <div style="display:none;font-size:1px;color:${NATAL_EMAIL_CONFIG.colors.background};line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheaderText}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${NATAL_EMAIL_CONFIG.colors.background};" bgcolor="${NATAL_EMAIL_CONFIG.colors.background}">
    <tr>
      <td align="center" style="padding: 24px 10px;">
        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid ${NATAL_EMAIL_CONFIG.colors.border};">
          <tr>
            <td align="center" style="padding: 32px 24px 16px;">
              <img src="${NATAL_EMAIL_CONFIG.logoUrl}" alt="Cronograma: Obra Pronta até o Natal" width="220" style="display: block; max-width: 220px; height: auto;">
            </td>
          </tr>
          <tr>
            <td class="content-padding" style="padding: 8px 32px 24px; color: ${NATAL_EMAIL_CONFIG.colors.foreground}; font-size: 16px; line-height: 1.7;">
              ${content}
            </td>
          </tr>
          <tr>
            <td class="content-padding" style="padding: 8px 32px 32px; color: ${NATAL_EMAIL_CONFIG.colors.foreground}; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0;">Um abraço,</p>
              <p style="margin: 8px 0 0; color: ${NATAL_EMAIL_CONFIG.colors.gold}; font-weight: bold;">Ingrid Zarza e Fernanda Bradaschia</p>
              <p style="margin: 4px 0 0; color: ${NATAL_EMAIL_CONFIG.colors.mutedForeground}; font-size: 14px;">Imersão Cronograma Especial de Natal</p>
              <p style="margin: 12px 0 0;">
                <a href="${NATAL_EMAIL_CONFIG.instagramUrl}" style="color: ${NATAL_EMAIL_CONFIG.colors.gold}; text-decoration: none;">@inovandonasuaobra</a>
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px 24px; border-top: 1px solid ${NATAL_EMAIL_CONFIG.colors.border};">
              <p style="margin: 0; color: ${NATAL_EMAIL_CONFIG.colors.mutedForeground}; font-size: 12px;">
                Imersão Cronograma Especial de Natal - Inovando na Sua Obra
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const natalFirstName = (name?: string | null) => (name || "").trim().split(" ")[0] || "";

function natalWelcomeEmail1(buyerName?: string | null) {
  const name = natalFirstName(buyerName);
  const greeting = name ? `Oi, ${name}!` : "Oi!";

  const content = `
    <p style="margin: 0 0 16px; font-size: 18px; font-weight: bold;">${greeting}</p>
    <p style="margin: 0 0 16px;">Sua vaga na <strong>Imersão Cronograma Especial de Natal</strong> está confirmada. Agosto tá aí e o Natal não espera, mas agora você não vai precisar aceitar prazo impossível nem entregar a obra correndo.</p>
    <p style="margin: 0 0 16px;">Anota na agenda: a imersão é <strong>ao vivo, sábado dia 08/08, das 9h às 17h</strong>, com a Ingrid Zarza e a Fernanda Bradaschia. Reserve o dia inteiro, é nele que você monta o cronograma da sua obra com orientação direta.</p>
    <p style="margin: 0 0 16px;"><strong>Próximo passo, o mais importante:</strong> entre agora no grupo do WhatsApp da turma. É lá que vamos passar todas as informações da Imersão (horário de entrada, avisos, lembretes e tudo mais).</p>
    ${createNatalButton("Entrar no grupo do WhatsApp", NATAL_EMAIL_CONFIG.whatsappGroupUrl)}
    <p style="margin: 16px 0 0; font-size: 14px; color: ${NATAL_EMAIL_CONFIG.colors.mutedForeground};">Sua compra tem garantia de 7 dias prevista em lei: se não for para você, o reembolso é integral e sem burocracia.</p>
  `;

  return {
    subject: "Sua vaga na Imersão de Natal está confirmada!",
    html: createNatalEmailWrapper(content, "Sua vaga está confirmada. Entre no grupo do WhatsApp pra receber todas as informações."),
  };
}

function natalWelcomeEmail2(buyerName?: string | null) {
  const name = natalFirstName(buyerName);
  const greeting = name ? `${name}, tudo certo?` : "Tudo certo?";

  const content = `
    <p style="margin: 0 0 16px; font-size: 18px; font-weight: bold;">${greeting}</p>
    <p style="margin: 0 0 16px;">Faltam poucos dias pra Imersão Cronograma Especial de Natal. Reserve o sábado 08/08 inteiro (das 9h às 17h) pra você: é nele que você vai sair sabendo:</p>
    <ul style="margin: 0 0 16px; padding-left: 20px;">
      <li style="margin-bottom: 8px;">Quantas semanas úteis você realmente tem até o Natal, e como distribuir os serviços dentro desse prazo</li>
      <li style="margin-bottom: 8px;">Qual ordem seguir quando marcenaria e marmoraria disputam o cronograma</li>
      <li style="margin-bottom: 8px;">Como montar um cronograma que você defende com segurança na frente do cliente</li>
    </ul>
    <p style="margin: 0 0 16px;">Se você ainda não entrou no grupo do WhatsApp da turma, entra agora: é por lá que passamos todos os avisos e informações antes da live.</p>
    ${createNatalButton("Entrar no grupo do WhatsApp", NATAL_EMAIL_CONFIG.whatsappGroupUrl)}
  `;

  return {
    subject: "Reserve o dia 08/08 inteiro pra você",
    html: createNatalEmailWrapper(content, "Faltam poucos dias. Reserve o sábado inteiro e entre no grupo do WhatsApp."),
  };
}

function natalWelcomeEmail3(buyerName?: string | null) {
  const name = natalFirstName(buyerName);
  const greeting = name ? `${name}, amanhã é o dia!` : "Amanhã é o dia!";

  const content = `
    <p style="margin: 0 0 16px; font-size: 18px; font-weight: bold;">${greeting}</p>
    <p style="margin: 0 0 16px;">Amanhã, sábado 08/08, das 9h às 17h, acontece a Imersão Cronograma Especial de Natal, ao vivo com a Ingrid Zarza e a Fernanda Bradaschia. Separe o dia inteiro: é nele que você monta o cronograma da sua obra com orientação direta, sem depender de curso gravado.</p>
    <p style="margin: 0 0 16px;"><strong>O acesso à live e todos os avisos de última hora são combinados no grupo do WhatsApp da turma.</strong> Se você ainda não entrou, entra agora pra não perder nada:</p>
    ${createNatalButton("Entrar no grupo do WhatsApp", NATAL_EMAIL_CONFIG.whatsappGroupUrl)}
    <p style="margin: 16px 0 0; font-size: 14px; color: ${NATAL_EMAIL_CONFIG.colors.mutedForeground};">Até amanhã!</p>
  `;

  return {
    subject: "Amanhã é dia da Imersão de Natal!",
    html: createNatalEmailWrapper(content, "Amanhã é o dia. Entre no grupo do WhatsApp pra não perder o acesso à live."),
  };
}

// ─── Resend: sequência de boas-vindas da Imersão de Natal ────────────────────

async function sendResendEmail(params: {
  requestId: string;
  index: number;
  fromEmail: string;
  apiKey: string;
  to: string;
  subject: string;
  html: string;
  scheduledAt?: Date | null;
}): Promise<void> {
  const payload: Record<string, unknown> = {
    from: params.fromEmail,
    to: [params.to],
    subject: params.subject,
    html: params.html,
  };

  const isFuture = params.scheduledAt && params.scheduledAt.getTime() > Date.now();
  if (isFuture) {
    payload.scheduled_at = params.scheduledAt!.toISOString();
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${params.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok) {
      console.log(`[${params.requestId}] ✅ [Resend] E-mail ${params.index} ${isFuture ? "agendado" : "enviado"}:`, result.id || result);
    } else {
      console.error(`[${params.requestId}] ❌ [Resend] Erro no e-mail ${params.index}:`, JSON.stringify(result));
    }
  } catch (err) {
    console.error(`[${params.requestId}] ❌ [Resend] Falha na chamada do e-mail ${params.index}:`, err);
  }
}

async function sendNatalWelcomeEmails(params: {
  requestId: string;
  email: string;
  buyerName?: string | null;
}): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");

  if (!apiKey || !fromEmail) {
    console.warn(`[${params.requestId}] ⚠️ [Resend] RESEND_API_KEY ou RESEND_FROM_EMAIL não configurado, pulando e-mails de boas-vindas da Imersão de Natal`);
    return;
  }

  const buyerName = params.buyerName || undefined;
  const now = Date.now();
  const eventTime = NATAL_EVENT_DATE.getTime();

  const email2At = new Date(Math.max(now + 24 * 60 * 60 * 1000, eventTime - 3 * 24 * 60 * 60 * 1000));

  const email3At = new Date(eventTime);
  email3At.setDate(email3At.getDate() - 1);
  email3At.setHours(18, 0, 0, 0);

  const email1 = natalWelcomeEmail1(buyerName);
  const email2 = natalWelcomeEmail2(buyerName);
  const email3 = natalWelcomeEmail3(buyerName);

  await sendResendEmail({ requestId: params.requestId, index: 1, fromEmail, apiKey, to: params.email, subject: email1.subject, html: email1.html, scheduledAt: null });
  await sendResendEmail({ requestId: params.requestId, index: 2, fromEmail, apiKey, to: params.email, subject: email2.subject, html: email2.html, scheduledAt: email2At });
  await sendResendEmail({ requestId: params.requestId, index: 3, fromEmail, apiKey, to: params.email, subject: email3.subject, html: email3.html, scheduledAt: email3At });
}

// ─── Webhook handler ──────────────────────────────────────────────────────────

serve(async (req: Request) => {
  const requestId = crypto.randomUUID().slice(0, 8);
  console.log(`\n========== [${requestId}] HOTMART WEBHOOK RECEBIDO ==========`);
  console.log(`📅 Timestamp: ${new Date().toISOString()}`);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = key.toLowerCase().includes("hottok") ? "***REDACTED***" : value;
    });
    console.log(`[${requestId}] 📋 Headers:`, JSON.stringify(headers, null, 2));

    const rawBody = await req.text();
    console.log(`[${requestId}] 📦 Raw body length: ${rawBody.length} chars`);

    let body: HotmartWebhookPayload;
    try {
      body = JSON.parse(rawBody);
      console.log(`[${requestId}] 📥 Payload parsed:`, JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error(`[${requestId}] ❌ Erro ao parsear JSON:`, parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const headerHottok = req.headers.get("x-hotmart-hottok");
    const bodyHottok = body.hottok;
    const receivedHottok = headerHottok || bodyHottok;

    if (DEBUG_MODE) {
      console.warn(`[${requestId}] ⚠️ DEBUG MODE ATIVO - aceitando sem validar token`);
    } else {
      if (!HOTMART_HOTTOK) {
        console.error(`[${requestId}] ❌ HOTMART_HOTTOK não configurado`);
        return new Response(
          JSON.stringify({ error: "Webhook não configurado corretamente" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!receivedHottok || receivedHottok !== HOTMART_HOTTOK) {
        console.warn(`[${requestId}] ⚠️ Token Hotmart inválido ou ausente`);
        return new Response(
          JSON.stringify({ error: "Unauthorized - Invalid or missing Hotmart token" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.log(`[${requestId}] ✅ Token Hotmart válido`);
    }

    const email =
      body.data?.buyer?.email ||
      body.buyer?.email ||
      body.buyer_email;

    const buyerName =
      body.data?.buyer?.name ||
      body.buyer?.name ||
      body.buyer_name;

    const buyerPhone =
      body.data?.buyer?.phone ||
      null;

    const productName =
      body.data?.product?.name ||
      body.product?.name ||
      body.product_name;

    const event = body.event || "PURCHASE_APPROVED";

    const status =
      body.data?.purchase?.status ||
      body.purchase?.status ||
      body.status ||
      "approved";

    const transactionId =
      body.data?.purchase?.transaction ||
      body.purchase?.transaction ||
      body.transaction ||
      null;

    console.log(`[${requestId}] 📊 Dados extraídos:`, {
      email: email || "NÃO ENCONTRADO",
      buyerName: buyerName || "não informado",
      productName: productName || "não informado",
      event,
      status,
      transactionId: transactionId || "não informado",
    });

    if (!email) {
      console.error(`[${requestId}] ❌ Email do comprador não encontrado no payload`);
      return new Response(
        JSON.stringify({ error: "Email do comprador não encontrado" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const approvedEvents = ["PURCHASE_APPROVED", "PURCHASE_COMPLETE", "PURCHASE_BILLET_PRINTED"];
    const approvedStatuses = ["approved", "complete", "completed", "paid"];

    const isApproved =
      approvedEvents.includes(event.toUpperCase()) ||
      approvedStatuses.includes(status.toLowerCase());

    if (!isApproved) {
      console.log(`[${requestId}] ℹ️ Evento não é compra aprovada, ignorando:`, { event, status });
      return new Response(
        JSON.stringify({ success: true, message: "Evento ignorado", event, status }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[${requestId}] ✅ Evento de compra aprovada identificado`);

    let product: "imersao" | "mentoria" | "natal" = "imersao";
    if (productName) {
      const nameLower = productName.toLowerCase();
      if (nameLower.includes("natal")) {
        product = "natal";
      } else if (nameLower.includes("mentoria") || nameLower.includes("inovando")) {
        product = "mentoria";
      }
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log(`[${requestId}] 🔍 Buscando checkout intents para:`, { email: normalizedEmail, product });

    const { data: intents, error: selectError } = await supabase
      .from("checkout_intents")
      .select("id, phone, fbclid")
      .eq("email", normalizedEmail)
      .eq("product", product)
      .eq("status", "started");

    if (selectError) {
      console.error(`[${requestId}] ❌ Erro ao buscar intents:`, selectError);
    }

    let updatedIntentIds: string[] = [];
    let intentFound = false;
    let fbclid: string | null = null;
    let intentPhone: string | null = buyerPhone;

    if (intents && intents.length > 0) {
      intentFound = true;
      // Pegar fbclid e phone do primeiro intent encontrado
      fbclid = intents[0].fbclid || null;
      intentPhone = intents[0].phone || intentPhone;
      console.log(`[${requestId}] 📝 Encontrados ${intents.length} intents — fbclid: ${fbclid ? "presente" : "ausente"}`);

      const { data: updatedIntents, error: updateError } = await supabase
        .from("checkout_intents")
        .update({
          status: "purchased",
          purchased_at: new Date().toISOString(),
          hotmart_transaction_id: transactionId,
        })
        .eq("email", normalizedEmail)
        .eq("product", product)
        .eq("status", "started")
        .select("id");

      if (updateError) {
        console.error(`[${requestId}] ❌ Erro ao atualizar intents:`, updateError);
      } else {
        console.log(`[${requestId}] ✅ Intents marcados como purchased`);
        updatedIntentIds = updatedIntents?.map((i: { id: string }) => i.id) || [];
      }
    } else {
      console.log(`[${requestId}] ⚠️ Nenhum intent pendente — criando registro de auditoria`);

      const { data: newIntent, error: insertError } = await supabase
        .from("checkout_intents")
        .insert({
          email: normalizedEmail,
          product,
          name: buyerName || null,
          status: "purchased",
          purchased_at: new Date().toISOString(),
          hotmart_transaction_id: transactionId,
          page_url: "hotmart-webhook-direct",
        })
        .select("id")
        .single();

      if (insertError) {
        console.error(`[${requestId}] ❌ Erro ao criar registro de auditoria:`, insertError);
      } else {
        console.log(`[${requestId}] ✅ Registro de auditoria criado:`, newIntent?.id);
        updatedIntentIds = newIntent ? [newIntent.id] : [];
      }
    }

    // ─── Meta CAPI: enviar evento de Purchase ────────────────────────────────
    const eventTime = Math.floor(Date.now() / 1000);
    await sendMetaCAPIEvent({
      requestId,
      email: normalizedEmail,
      phone: intentPhone,
      fbclid,
      transactionId,
      eventTime,
      product,
    });
    // ─────────────────────────────────────────────────────────────────────────

    // ─── Resend: e-mails de boas-vindas da Imersão de Natal (idempotente) ────
    let natalEmailsSent = false;
    if (product === "natal" && updatedIntentIds.length > 0) {
      const { data: alreadySent } = await supabase
        .from("checkout_intents")
        .select("id")
        .eq("email", normalizedEmail)
        .eq("product", "natal")
        .not("natal_welcome_emails_sent_at", "is", null)
        .limit(1);

      if (!alreadySent || alreadySent.length === 0) {
        await sendNatalWelcomeEmails({ requestId, email: normalizedEmail, buyerName });
        await supabase
          .from("checkout_intents")
          .update({ natal_welcome_emails_sent_at: new Date().toISOString() })
          .in("id", updatedIntentIds);
        natalEmailsSent = true;
      } else {
        console.log(`[${requestId}] ℹ️ E-mails de boas-vindas da Natal já enviados antes para este e-mail, pulando (retry do webhook)`);
      }
    }
    // ─────────────────────────────────────────────────────────────────────────

    const result = {
      success: true,
      request_id: requestId,
      message: "Webhook processado com sucesso",
      email: normalizedEmail,
      product,
      intent_found: intentFound,
      intents_updated: updatedIntentIds.length,
      transaction_id: transactionId,
      capi_sent: true,
      natal_emails_sent: natalEmailsSent,
    };

    console.log(`[${requestId}] ✅ WEBHOOK PROCESSADO:`, result);
    console.log(`========== [${requestId}] FIM ==========\n`);

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error(`[${requestId}] ❌ Erro interno:`, error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor", request_id: requestId }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});