/**
 * Templates de e-mail de boas-vindas - Imersão Cronograma Especial de Natal
 *
 * Enviados via Resend a partir de supabase/functions/hotmart-webhook.
 * Tom, argumentação e fatos puxados da própria LP (HeroSectionNatal,
 * PainMechanismSection, ClosingOfferSection, NATAL_FAQ) - não são copy nova.
 */

export const NATAL_EMAIL_CONFIG = {
  whatsappGroupUrl: "https://chat.whatsapp.com/GnK3LCisql3CJYOuPKBDMx",
  instagramUrl: "https://www.instagram.com/inovandonasuaobra/",
  logoUrl: "https://cronogramadenatal.inovandonasuaobra.com.br/brand-natal/logo-horizontal.png",
  colors: {
    background: "#faf8f4", // Papel
    foreground: "#1b3b2f", // Verde pinheiro
    gold: "#c89b41", // Dourado
    cta: "#c1252d", // Vermelho natal
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

interface NatalEmailParams {
  buyerName?: string;
}

const firstName = (name?: string) => (name || "").trim().split(" ")[0] || "";

export const natalWelcomeEmail1 = ({ buyerName }: NatalEmailParams) => {
  const name = firstName(buyerName);
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
};

export const natalWelcomeEmail2 = ({ buyerName }: NatalEmailParams) => {
  const name = firstName(buyerName);
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
};

export const natalWelcomeEmail3 = ({ buyerName }: NatalEmailParams) => {
  const name = firstName(buyerName);
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
};
