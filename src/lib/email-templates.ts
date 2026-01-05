/**
 * Templates de E-mail - Imersão Cronograma 2.0: O Mapa da Obra
 * 
 * Todos os templates estão formatados para copiar e colar no RD Station.
 * Variáveis dinâmicas: *|NOME:Arquiteta|* (RD Station)
 * 
 * INSTRUÇÕES:
 * 1. Copie o HTML para o RD Station
 * 2. Configure as URLs (checkout, WhatsApp, Zoom)
 * 3. Teste o envio
 */

// ============================================================
// CONFIGURAÇÕES GLOBAIS
// ============================================================

export const EMAIL_CONFIG = {
  checkoutUrl: "https://pay.hotmart.com/W98444850C?checkoutMode=10",
  instagramUrl: "https://www.instagram.com/inovandonasuaobra/",
  whatsappGroupUrl: "WHATSAPP_GROUP_URL", // Substituir pela URL real
  zoomLink: "ZOOM_LINK", // Substituir pela URL real
  apostilaUrl: "APOSTILA_URL", // Substituir pela URL real
  colors: {
    background: "#18181B",
    gold: "#D4AF37",
    white: "#FFFFFF",
    gray: "#A1A1AA",
  },
};

// ============================================================
// ESTRUTURA BASE DO E-MAIL
// ============================================================

const createEmailWrapper = (content: string, preheaderText: string = "") => `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark only">
  <meta name="supported-color-schemes" content="dark only">
  <!--[if !mso]><!-->
  <style>
    :root { color-scheme: dark only; supported-color-schemes: dark only; }
    @media (prefers-color-scheme: dark) {
      body, .email-bg, .email-container { background-color: #18181B !important; }
    }
    @media (prefers-color-scheme: light) {
      body, .email-bg, .email-container { background-color: #18181B !important; }
    }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .content-padding { padding: 16px !important; }
      .button-full { width: 100% !important; display: block !important; text-align: center !important; }
      .mobile-text { font-size: 15px !important; }
    }
    u + .body { background-color: #18181B !important; }
  </style>
  <!--<![endif]-->
</head>
<body class="body" style="margin: 0; padding: 0; background-color: #18181B !important; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; width: 100% !important;">
  <!-- Preheader invisível -->
  <div style="display:none;font-size:1px;color:#18181B;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheaderText}
  </div>
  <div class="email-bg" style="background-color: #18181B !important;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #18181B !important;" bgcolor="#18181B">
    <tr>
      <td align="center" style="padding: 20px 10px; background-color: #18181B !important;" bgcolor="#18181B">
        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" style="background-color: #18181B !important; max-width: 600px; margin: 0 auto;" bgcolor="#18181B">
          <!-- Conteúdo -->
          <tr>
            <td class="content-padding" style="padding: 0 24px; color: #FFFFFF !important; font-size: 16px; line-height: 1.7; background-color: #18181B !important;" bgcolor="#18181B">
              ${content}
            </td>
          </tr>
          <!-- Assinatura -->
          <tr>
            <td class="content-padding" style="padding: 36px 24px 20px; color: #FFFFFF !important; font-size: 16px; line-height: 1.6; background-color: #18181B !important;" bgcolor="#18181B">
              <p style="margin: 0; color: #FFFFFF !important;">Um abraço,</p>
              <p style="margin: 10px 0 0; color: #D4AF37 !important; font-weight: bold;">Ingrid Zarza e Fernanda Bradaschia</p>
              <p style="margin: 5px 0 0; color: #A1A1AA !important; font-size: 14px;">Mentoras da Imersão Cronograma 2.0</p>
              <p style="margin: 15px 0 0;">
                <a href="${EMAIL_CONFIG.instagramUrl}" style="color: #D4AF37 !important; text-decoration: none;">@inovandonasuaobra</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px; border-top: 1px solid #27272A; background-color: #18181B !important;" bgcolor="#18181B">
              <p style="margin: 0; color: #71717A !important; font-size: 12px;">
                © 2025 Cronograma 2.0: O Mapa da Obra. Todos os direitos reservados.
              </p>
              <p style="margin: 5px 0 0; color: #71717A !important; font-size: 11px;">
                Cronograma 2.0 - São Paulo, SP
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  </div>
</body>
</html>
`;

const createButton = (text: string, url: string) => `
<table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
  <tr>
    <td align="center">
      <a href="${url}" style="display: inline-block; padding: 16px 40px; background-color: #D4AF37; color: #18181B; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px;">
        ${text}
      </a>
    </td>
  </tr>
</table>
`;

// ============================================================
// JORNADA 1: RESGATE INSCRIÇÃO (5 E-MAILS)
// Gatilho: Converteram em "inscricao-cronograma-2-0"
// Condição de saída: Converteram em "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada"
// ============================================================

export const JORNADA_RESGATE = {
  nome: "Resgate Inscrição",
  gatilho: "inscricao-cronograma-2-0",
  condicaoSaida: "imersao-cronograma-2.0-o-mapa-da-obra-compra-aprovada",
  emails: [
    {
      id: "R1",
      nome: "Lembrete + Dor Principal",
      delay: "D+1 (24 horas)",
      assunto: "Sua vaga ainda está reservada, {{nome}} 🔒",
      previewText: "Mas por quanto tempo você vai deixar o retrabalho consumir seu lucro?",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">Olá, {{nome}}!</p>
        
        <p style="margin: 0 0 20px;">Vi que você se inscreveu na <strong style="color: #D4AF37;">Imersão Cronograma 2.0: O Mapa da Obra</strong>, mas ainda não garantiu sua vaga.</p>
        
        <p style="margin: 0 0 20px;">Enquanto isso, me conta...</p>
        
        <p style="margin: 0 0 10px; color: #D4AF37;"><strong>Quantas vezes você já teve que refazer algo na obra porque o cliente "mudou de ideia"?</strong></p>
        
        <p style="margin: 0 0 20px;">Ou pior: quantas horas você já perdeu tentando descobrir qual fornecedor atrasou, qual etapa está pendente, ou por que o orçamento estourou?</p>
        
        <p style="margin: 0 0 20px;">A verdade é dura: <strong>sem um cronograma profissional, você está sempre apagando incêndios.</strong></p>
        
        <p style="margin: 0 0 20px;">Na imersão, você vai aprender exatamente como criar um cronograma que:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">✓ Protege seu projeto de alterações de última hora</li>
          <li style="margin-bottom: 10px;">✓ Mantém fornecedores e clientes alinhados</li>
          <li style="margin-bottom: 10px;">✓ Elimina o retrabalho que consome seu lucro</li>
        </ul>
        
        <p style="margin: 0 0 20px;"><strong>Dias 31/01 e 01/02, ao vivo.</strong></p>
        
        ${createButton("GARANTIR MINHA VAGA AGORA", EMAIL_CONFIG.checkoutUrl + "?utm_source=rdstation&utm_medium=email&utm_campaign=resgate&utm_content=r1")}
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Sua vaga está reservada, mas não por muito tempo.</p>
      `),
    },
    {
      id: "R2",
      nome: "Prova Social + Autoridade",
      delay: "D+2 (48 horas)",
      assunto: "+250 obras entregues: o que elas têm em comum?",
      previewText: "O segredo que arquitetas de sucesso não contam",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">{{nome}}, uma pergunta rápida:</p>
        
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37;">O que diferencia uma arquiteta que entrega 50 obras por ano de uma que mal consegue finalizar 10?</strong></p>
        
        <p style="margin: 0 0 20px;">Não é talento. Não é sorte. Não é ter mais funcionários.</p>
        
        <p style="margin: 0 0 20px;"><strong>É ter um sistema.</strong></p>
        
        <p style="margin: 0 0 20px;">Juntas, <strong>Ingrid Zarza e Fernanda Bradaschia</strong> já entregaram mais de 250 obras residenciais de alto padrão. E a cada nova obra, o processo ficou mais refinado.</p>
        
        <p style="margin: 0 0 20px;">O resultado?</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">→ Clientes que indicam para amigos</li>
          <li style="margin-bottom: 10px;">→ Obras que terminam no prazo</li>
          <li style="margin-bottom: 10px;">→ Lucro preservado em cada projeto</li>
        </ul>
        
        <p style="margin: 0 0 20px;">Na <strong style="color: #D4AF37;">Imersão Cronograma 2.0: O Mapa da Obra</strong>, elas vão compartilhar o método exato que usam há anos.</p>
        
        <p style="margin: 0 0 20px;">Não é teoria. É o que funciona na prática, obra após obra.</p>
        
        ${createButton("QUERO APRENDER O MÉTODO", EMAIL_CONFIG.checkoutUrl + "?utm_source=rdstation&utm_medium=email&utm_campaign=resgate&utm_content=r2")}
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Dias 31/01 e 01/02 • Imersão ao vivo</p>
      `),
    },
    {
      id: "R3",
      nome: "Conteúdo de Valor + Método",
      delay: "D+3 (72 horas)",
      assunto: "A sequência que protege seu design e seu lucro",
      previewText: "Cronograma técnico vs cronograma de obra: qual você está usando?",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">{{nome}}, deixa eu te contar um segredo:</p>
        
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37;">A maioria das arquitetas está fazendo cronograma errado.</strong></p>
        
        <p style="margin: 0 0 20px;">Elas criam um cronograma técnico perfeito... mas esquecem que obra não é linha de produção. Obra é caos controlado.</p>
        
        <p style="margin: 0 0 20px;">O que acontece?</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">❌ Fornecedor atrasa e todo o cronograma desmorona</li>
          <li style="margin-bottom: 10px;">❌ Cliente pede mudança e você não sabe como encaixar</li>
          <li style="margin-bottom: 10px;">❌ Equipes se sobrepõem e geram retrabalho</li>
        </ul>
        
        <p style="margin: 0 0 20px;">Na imersão, você vai aprender a criar um <strong>cronograma de obra real</strong> que:</p>
        
        <ol style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;"><strong>Antecipa problemas</strong> antes que eles aconteçam</li>
          <li style="margin-bottom: 10px;"><strong>Absorve imprevistos</strong> sem desmoronar</li>
          <li style="margin-bottom: 10px;"><strong>Protege seu projeto</strong> de alterações destrutivas</li>
        </ol>
        
        <p style="margin: 0 0 20px;">Vou te mostrar a sequência exata de etapas que uso em todas as minhas obras. É simples, mas poderoso.</p>
        
        ${createButton("QUERO VER A SEQUÊNCIA", EMAIL_CONFIG.checkoutUrl + "?utm_source=rdstation&utm_medium=email&utm_campaign=resgate&utm_content=r3")}
      `),
    },
    {
      id: "R4",
      nome: "Urgência + Bônus",
      delay: "D+5 (5 dias)",
      assunto: "3 bônus que valem mais que a imersão 🎁",
      previewText: "Apostila + Modelo de Cronograma + Checklist de Entrega",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">{{nome}}, preciso te contar sobre algo especial.</p>
        
        <p style="margin: 0 0 20px;">Quem se inscrever na <strong style="color: #D4AF37;">Imersão Cronograma 2.0: O Mapa da Obra</strong> vai receber <strong>3 bônus exclusivos</strong> que, sozinhos, já valem o investimento:</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px; margin-bottom: 15px;">
              <p style="margin: 0 0 5px; color: #D4AF37; font-weight: bold;">🎁 BÔNUS 1: Apostila Completa</p>
              <p style="margin: 0; color: #FFFFFF;">Todo o conteúdo da imersão em PDF para consultar sempre que precisar.</p>
              <p style="margin: 10px 0 0; color: #A1A1AA; font-size: 14px;">Valor: R$ 197</p>
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px; margin-bottom: 15px;">
              <p style="margin: 0 0 5px; color: #D4AF37; font-weight: bold;">🎁 BÔNUS 2: Modelo de Cronograma</p>
              <p style="margin: 0; color: #FFFFFF;">Template pronto para usar no Excel/Sheets. Só adaptar para sua obra.</p>
              <p style="margin: 10px 0 0; color: #A1A1AA; font-size: 14px;">Valor: R$ 297</p>
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 5px; color: #D4AF37; font-weight: bold;">🎁 BÔNUS 3: Checklist de Entrega</p>
              <p style="margin: 0; color: #FFFFFF;">Lista completa para garantir que nada seja esquecido na entrega da obra.</p>
              <p style="margin: 10px 0 0; color: #A1A1AA; font-size: 14px;">Valor: R$ 147</p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 20px 0; text-align: center; color: #D4AF37; font-size: 18px;"><strong>Total em bônus: R$ 641</strong></p>
        
        <p style="margin: 0 0 20px;">Mas esses bônus só estão disponíveis para quem garantir a vaga até o início da imersão.</p>
        
        ${createButton("GARANTIR VAGA + BÔNUS", EMAIL_CONFIG.checkoutUrl + "?utm_source=rdstation&utm_medium=email&utm_campaign=resgate&utm_content=r4")}
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Imersão começa dia 31/01. Não deixe para última hora.</p>
      `),
    },
    {
      id: "R5",
      nome: "Última Chance",
      delay: "D+7 (7 dias)",
      assunto: "{{nome}}, última chance: amanhã é tarde demais",
      previewText: "Depois de amanhã, as vagas serão liberadas para a lista de espera",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">{{nome}}, vou ser direta com você:</p>
        
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37;">A Imersão Cronograma 2.0: O Mapa da Obra começa em poucos dias.</strong></p>
        
        <p style="margin: 0 0 20px;">Depois disso, as vagas não preenchidas serão liberadas para a lista de espera.</p>
        
        <p style="margin: 0 0 20px;">Eu sei que você se inscreveu por um motivo. Talvez você esteja:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">→ Cansada de correr atrás de fornecedores</li>
          <li style="margin-bottom: 10px;">→ Frustrada com obras que atrasam</li>
          <li style="margin-bottom: 10px;">→ Preocupada com o retrabalho que consome seu lucro</li>
        </ul>
        
        <p style="margin: 0 0 20px;">A questão é: <strong>você vai continuar tentando resolver sozinha, ou vai aprender com quem já entregou +250 obras?</strong></p>
        
        <p style="margin: 0 0 20px;">São apenas 2 dias de imersão que podem transformar a forma como você gerencia suas obras pelos próximos anos.</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px; color: #FFFFFF; font-size: 14px;">INVESTIMENTO</p>
              <p style="margin: 0; color: #D4AF37; font-size: 28px; font-weight: bold;">R$ 297</p>
              <p style="margin: 10px 0 0; color: #A1A1AA; font-size: 14px;">+ R$ 641 em bônus inclusos</p>
            </td>
          </tr>
        </table>
        
        ${createButton("GARANTIR MINHA VAGA AGORA", EMAIL_CONFIG.checkoutUrl + "?utm_source=rdstation&utm_medium=email&utm_campaign=resgate&utm_content=r5")}
        
        <p style="margin: 0; color: #ef4444; font-size: 14px; text-align: center;"><strong>⚠️ Últimas vagas disponíveis</strong></p>
      `),
    },
  ],
};

// ============================================================
// JORNADA 2: BOAS-VINDAS COMPRADOR (3 E-MAILS)
// Gatilho: Converteram em "pagamento-cronograma-2-0"
// ============================================================

export const JORNADA_BOAS_VINDAS = {
  nome: "Boas-vindas Comprador",
  gatilho: "pagamento-cronograma-2-0",
  emails: [
    {
      id: "B1",
      nome: "Confirmação + Próximos Passos",
      delay: "Imediato",
      assunto: "🎉 Parabéns! Você está oficialmente na Imersão Cronograma 2.0",
      previewText: "Sua vaga está confirmada. Veja os próximos passos.",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37; font-size: 24px;">Parabéns, {{nome}}! 🎉</strong></p>
        
        <p style="margin: 0 0 20px;">Você acabou de dar um passo gigante para transformar a gestão das suas obras.</p>
        
        <p style="margin: 0 0 20px;">Sua vaga na <strong style="color: #D4AF37;">Imersão Cronograma 2.0: O Mapa da Obra</strong> está <strong>CONFIRMADA!</strong></p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">📅 DATAS DA IMERSÃO</p>
              <p style="margin: 0 0 5px; color: #FFFFFF;"><strong>Dia 1:</strong> 31 de Janeiro (Sexta) • 9h às 12h</p>
              <p style="margin: 0; color: #FFFFFF;"><strong>Dia 2:</strong> 01 de Fevereiro (Sábado) • 9h às 12h</p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">📋 PRÓXIMOS PASSOS:</p>
        
        <ol style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;"><strong>Entre no grupo do WhatsApp</strong> - É por lá que vamos enviar o link do Zoom e avisos importantes</li>
          <li style="margin-bottom: 10px;"><strong>Salve as datas na agenda</strong> - 31/01 e 01/02, das 9h às 12h</li>
          <li style="margin-bottom: 10px;"><strong>Aguarde a apostila</strong> - Vamos enviar no dia 30/01</li>
        </ol>
        
        ${createButton("ENTRAR NO GRUPO DO WHATSAPP", EMAIL_CONFIG.whatsappGroupUrl)}
        
        <p style="margin: 20px 0 0; color: #A1A1AA; font-size: 14px;">Qualquer dúvida, responda este e-mail ou fale conosco no Instagram <a href="${EMAIL_CONFIG.instagramUrl}" style="color: #D4AF37;">@inovandonasuaobra</a></p>
      `),
    },
    {
      id: "B2",
      nome: "Preparação + Apostila",
      delay: "30/01 (D-1) às 10h",
      assunto: "📚 Sua apostila chegou + preparação para amanhã",
      previewText: "Baixe sua apostila e prepare-se para a imersão",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">{{nome}}, amanhã é o grande dia! 🚀</p>
        
        <p style="margin: 0 0 20px;">Sua <strong style="color: #D4AF37;">apostila da imersão</strong> está pronta para download:</p>
        
        ${createButton("📥 BAIXAR APOSTILA", "LINK_DA_APOSTILA")}
        
        <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">✅ CHECKLIST PARA AMANHÃ:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">☐ Baixar e imprimir a apostila (ou deixar aberta no tablet)</li>
          <li style="margin-bottom: 10px;">☐ Preparar caneta e papel para anotações</li>
          <li style="margin-bottom: 10px;">☐ Testar sua conexão de internet</li>
          <li style="margin-bottom: 10px;">☐ Encontrar um lugar tranquilo para assistir</li>
          <li style="margin-bottom: 10px;">☐ Separar um café ☕ (vai ser intenso!)</li>
        </ul>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">⏰ HORÁRIO</p>
              <p style="margin: 0; color: #FFFFFF;"><strong>Amanhã, 31/01</strong> • 9h às 12h (horário de Brasília)</p>
              <p style="margin: 10px 0 0; color: #A1A1AA; font-size: 14px;">O link do Zoom será enviado amanhã às 8h30 no grupo do WhatsApp</p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px;"><strong>Dica:</strong> Dê uma olhada na apostila antes da imersão. Assim você já chega com perguntas e aproveita ainda mais!</p>
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Nos vemos amanhã! 💛</p>
      `),
    },
    {
      id: "B3",
      nome: "Lembrete + Link Zoom",
      delay: "31/01 (D0) às 08h",
      assunto: "🔴 AO VIVO em 1 hora! Seu link está aqui",
      previewText: "A imersão começa às 9h. Acesse o Zoom agora.",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37; font-size: 20px;">{{nome}}, chegou a hora! 🔥</strong></p>
        
        <p style="margin: 0 0 20px;">A <strong>Imersão Cronograma 2.0: O Mapa da Obra</strong> começa em <strong>1 hora</strong>.</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 25px; background-color: #27272A; border-radius: 8px; text-align: center; border: 2px solid #D4AF37;">
              <p style="margin: 0 0 15px; color: #D4AF37; font-weight: bold; font-size: 18px;">🔴 ACESSE O ZOOM</p>
              <a href="${EMAIL_CONFIG.zoomLink}" style="display: inline-block; padding: 16px 40px; background-color: #D4AF37; color: #18181B; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px;">
                ENTRAR NA SALA AGORA
              </a>
              <p style="margin: 15px 0 0; color: #A1A1AA; font-size: 14px;">Recomendamos entrar 10 minutos antes</p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">📋 LEMBRETE RÁPIDO:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 8px;">✓ Apostila em mãos</li>
          <li style="margin-bottom: 8px;">✓ Caneta e papel</li>
          <li style="margin-bottom: 8px;">✓ Ambiente tranquilo</li>
          <li style="margin-bottom: 8px;">✓ Celular no silencioso</li>
        </ul>
        
        <p style="margin: 0 0 20px;"><strong>Hoje vamos abordar:</strong> A mentalidade de quem gerencia obras com sucesso + Os pilares de um cronograma eficiente</p>
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Nos vemos em instantes! 🚀</p>
      `),
    },
  ],
};

// ============================================================
// JORNADA 3: CARRINHO ABANDONADO (3 E-MAILS)
// Gatilho: Webhook Pluga (checkout iniciado sem compra)
// ============================================================

export const JORNADA_CARRINHO = {
  nome: "Carrinho Abandonado",
  gatilho: "checkout-abandonado-cronograma-2-0",
  emails: [
    {
      id: "C1",
      nome: "Esqueceu algo?",
      delay: "30 minutos após abandono",
      assunto: "Esqueceu algo no checkout? 🛒",
      previewText: "Sua vaga está esperando por você",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">Oi, {{nome}}!</p>
        
        <p style="margin: 0 0 20px;">Percebi que você iniciou a inscrição na <strong style="color: #D4AF37;">Imersão Cronograma 2.0: O Mapa da Obra</strong> mas não finalizou.</p>
        
        <p style="margin: 0 0 20px;">Acontece! Às vezes a internet cai, o telefone toca, a vida acontece...</p>
        
        <p style="margin: 0 0 20px;"><strong>Sua vaga ainda está reservada.</strong> Clique abaixo para continuar de onde parou:</p>
        
        ${createButton("FINALIZAR MINHA INSCRIÇÃO", EMAIL_CONFIG.checkoutUrl + "?utm_source=rdstation&utm_medium=email&utm_campaign=carrinho&utm_content=c1")}
        
        <p style="margin: 0 0 20px;">Se teve algum problema técnico ou dúvida sobre a imersão, é só responder este e-mail. Estamos aqui para ajudar!</p>
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">A imersão acontece nos dias 31/01 e 01/02, ao vivo.</p>
      `),
    },
    {
      id: "C2",
      nome: "Dor + Solução",
      delay: "6 horas após abandono",
      assunto: "O custo de não saber gerenciar obra",
      previewText: "Quanto você já perdeu em retrabalho esse ano?",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">{{nome}}, me permite uma pergunta direta?</p>
        
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37;">Quanto você já perdeu em retrabalho esse ano?</strong></p>
        
        <p style="margin: 0 0 20px;">Não precisa responder. Mas pensa comigo:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">→ Cada hora refazendo algo que não deveria ter dado errado</li>
          <li style="margin-bottom: 10px;">→ Cada material comprado duas vezes por falta de planejamento</li>
          <li style="margin-bottom: 10px;">→ Cada cliente insatisfeito que não vai indicar seu trabalho</li>
        </ul>
        
        <p style="margin: 0 0 20px;">Tudo isso tem um custo. E geralmente é muito maior que R$ 297.</p>
        
        <p style="margin: 0 0 20px;">A <strong style="color: #D4AF37;">Imersão Cronograma 2.0: O Mapa da Obra</strong> existe para resolver exatamente isso. Em 2 dias, você vai aprender o sistema que usamos para entregar +250 obras sem perder o controle.</p>
        
        <p style="margin: 0 0 20px;">Não é teoria. É prática pura.</p>
        
        ${createButton("QUERO PARAR DE PERDER DINHEIRO", EMAIL_CONFIG.checkoutUrl + "?utm_source=rdstation&utm_medium=email&utm_campaign=carrinho&utm_content=c2")}
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Garantia de 7 dias. Se não gostar, devolvemos seu dinheiro.</p>
      `),
    },
    {
      id: "C3",
      nome: "Última Chamada",
      delay: "24 horas após abandono",
      assunto: "⚠️ Sua vaga será liberada em 2 horas",
      previewText: "Última chance de garantir sua vaga na imersão",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">{{nome}},</p>
        
        <p style="margin: 0 0 20px;">Este é meu último e-mail sobre a imersão.</p>
        
        <p style="margin: 0 0 20px;"><strong style="color: #ef4444;">Sua vaga reservada será liberada em 2 horas</strong> para a próxima pessoa da lista de espera.</p>
        
        <p style="margin: 0 0 20px;">Eu entendo que você pode estar:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">❓ Com dúvidas sobre o conteúdo</li>
          <li style="margin-bottom: 10px;">❓ Preocupada se vai conseguir aplicar</li>
          <li style="margin-bottom: 10px;">❓ Pensando se é o momento certo</li>
        </ul>
        
        <p style="margin: 0 0 20px;">Por isso, você tem <strong>garantia de 7 dias</strong>. Se participar da imersão e achar que não é para você, é só pedir reembolso. Sem perguntas.</p>
        
        <p style="margin: 0 0 20px;">O risco é zero. A oportunidade de transformar suas obras é real.</p>
        
        ${createButton("GARANTIR MINHA VAGA AGORA", EMAIL_CONFIG.checkoutUrl + "?utm_source=rdstation&utm_medium=email&utm_campaign=carrinho&utm_content=c3")}
        
        <p style="margin: 0; text-align: center; color: #ef4444; font-size: 14px;"><strong>⏰ Vaga liberada em 2 horas</strong></p>
      `),
    },
  ],
};

// ============================================================
// JORNADA 4: REEMBOLSO (1 E-MAIL)
// Gatilho: Converteram em "reembolso-cronograma-2-0"
// ============================================================

export const JORNADA_REEMBOLSO = {
  nome: "Reembolso",
  gatilho: "reembolso-cronograma-2-0",
  emails: [
    {
      id: "RE1",
      nome: "Confirmação + Feedback",
      delay: "Imediato",
      assunto: "Seu reembolso foi processado ✓",
      previewText: "Confirmação do reembolso + uma pergunta rápida",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">Olá, {{nome}}.</p>
        
        <p style="margin: 0 0 20px;">Confirmamos que seu reembolso da <strong>Imersão Cronograma 2.0: O Mapa da Obra</strong> foi processado com sucesso.</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">📋 DETALHES DO REEMBOLSO</p>
              <p style="margin: 0 0 5px; color: #FFFFFF;"><strong>Status:</strong> Processado</p>
              <p style="margin: 0; color: #A1A1AA; font-size: 14px;">O valor será estornado em até 7 dias úteis, dependendo da sua operadora de cartão.</p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px;">Sentimos muito que a imersão não tenha atendido suas expectativas.</p>
        
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37;">Você nos ajudaria com um feedback rápido?</strong></p>
        
        <p style="margin: 0 0 20px;">Entender o que podemos melhorar é muito importante para nós. Se puder, responda este e-mail nos contando:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">O que te levou a pedir o reembolso?</li>
          <li style="margin-bottom: 10px;">O que poderíamos ter feito diferente?</li>
        </ul>
        
        <p style="margin: 0 0 20px;">Sua resposta é confidencial e nos ajuda a melhorar.</p>
        
        <p style="margin: 0 0 20px;">Desejamos sucesso nos seus projetos!</p>
      `),
    },
  ],
};

// ============================================================
// JORNADA 5: NUTRIÇÃO COMPRADOR (5 E-MAILS)
// Gatilho: Converteram em "pagamento-cronograma-2-0"
// Objetivo: Manter engajamento até a data da imersão
// ============================================================

export const JORNADA_NUTRICAO = {
  nome: "Nutrição Comprador",
  gatilho: "pagamento-cronograma-2-0",
  emails: [
    {
      id: "N1",
      nome: "Reforço da Compra",
      delay: "D+2 (2 dias após compra)",
      assunto: "Você tomou a melhor decisão, *|NOME:Arquiteta|*",
      previewText: "Por que essa imersão vai mudar a forma como você gerencia suas obras",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">*|NOME:Arquiteta|*, quero te parabenizar mais uma vez!</p>
        
        <p style="margin: 0 0 20px;">Você tomou uma decisão que poucas arquitetas têm coragem de tomar: <strong style="color: #D4AF37;">investir em si mesma e no seu negócio.</strong></p>
        
        <p style="margin: 0 0 20px;">Enquanto a maioria continua apagando incêndios nas obras, você decidiu aprender um método que já transformou a gestão de mais de 250 projetos.</p>
        
        <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">O que você pode esperar da imersão:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">✓ Um método testado e aprovado em obras reais</li>
          <li style="margin-bottom: 10px;">✓ Ferramentas práticas para aplicar imediatamente</li>
          <li style="margin-bottom: 10px;">✓ Acesso direto às mentoras para tirar dúvidas</li>
          <li style="margin-bottom: 10px;">✓ Uma comunidade de arquitetas que entendem seus desafios</li>
        </ul>
        
        <p style="margin: 0 0 20px;">Nos próximos dias, vou te enviar alguns conteúdos exclusivos para você já ir se preparando. Fique de olho no seu e-mail!</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">📌 LEMBRETE IMPORTANTE</p>
              <p style="margin: 0; color: #FFFFFF;">Você já entrou no grupo do WhatsApp? É por lá que enviamos avisos importantes e o link do Zoom.</p>
            </td>
          </tr>
        </table>
        
        ${createButton("ENTRAR NO GRUPO DO WHATSAPP", EMAIL_CONFIG.whatsappGroupUrl)}
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Estamos ansiosas para te ver na imersão! 💛</p>
      `),
    },
    {
      id: "N2",
      nome: "Case de Sucesso",
      delay: "D+4 (4 dias após compra)",
      assunto: "O que arquitetas de sucesso fazem diferente",
      previewText: "A história de uma arquiteta que entregava 8 obras por ano e hoje entrega 40",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">*|NOME:Arquiteta|*, deixa eu te contar uma história.</p>
        
        <p style="margin: 0 0 20px;">Quando a Mariana entrou em contato comigo, ela estava exausta. Entregava 8 obras por ano e mal conseguia respirar entre um projeto e outro.</p>
        
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37;">O problema não era falta de talento. Era falta de método.</strong></p>
        
        <p style="margin: 0 0 20px;">Ela passava mais tempo apagando incêndios do que efetivamente gerenciando. Cada semana era uma surpresa nova: fornecedor atrasou, cliente mudou de ideia, orçamento estourou...</p>
        
        <p style="margin: 0 0 20px;">Depois de aplicar o método que você vai aprender na imersão, a transformação foi impressionante:</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 15px; color: #D4AF37; font-weight: bold;">📈 RESULTADOS DA MARIANA</p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">→ De 8 para <strong>40 obras por ano</strong></p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">→ Reduziu retrabalho em <strong>75%</strong></p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">→ Clientes agora <strong>indicam espontaneamente</strong></p>
              <p style="margin: 0; color: #FFFFFF;">→ Conseguiu finalmente <strong>tirar férias</strong></p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px;">A diferença? Um cronograma que funciona de verdade e processos claros para cada etapa da obra.</p>
        
        <p style="margin: 0 0 20px;">Isso é exatamente o que você vai aprender nos dias 31/01 e 01/02.</p>
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Ansiosa para te ajudar a ter resultados como esses!</p>
      `),
    },
    {
      id: "N3",
      nome: "Preview do Conteúdo",
      delay: "D+7 (7 dias após compra)",
      assunto: "Preview: o que você vai aprender na imersão",
      previewText: "Confira a agenda completa dos 2 dias de imersão",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">*|NOME:Arquiteta|*, você está cada vez mais perto!</p>
        
        <p style="margin: 0 0 20px;">Para você já ir se preparando, resolvi compartilhar um <strong style="color: #D4AF37;">preview do que vamos abordar na imersão.</strong></p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px; margin-bottom: 15px;">
              <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">📅 DIA 1 - 31/01 (Sexta)</p>
              <p style="margin: 0 0 10px; color: #FFFFFF; font-weight: bold;">Fundamentos da Gestão de Obras</p>
              <ul style="margin: 0; padding-left: 20px; color: #FFFFFF;">
                <li style="margin-bottom: 8px;">Diagnóstico: onde está o gargalo da sua operação</li>
                <li style="margin-bottom: 8px;">Os 3 pilares de uma obra bem gerenciada</li>
                <li style="margin-bottom: 8px;">Como criar um cronograma à prova de imprevistos</li>
                <li style="margin-bottom: 0;">Ferramenta: Modelo de cronograma profissional</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">📅 DIA 2 - 01/02 (Sábado)</p>
              <p style="margin: 0 0 10px; color: #FFFFFF; font-weight: bold;">Execução e Controle</p>
              <ul style="margin: 0; padding-left: 20px; color: #FFFFFF;">
                <li style="margin-bottom: 8px;">Sistema de acompanhamento semanal</li>
                <li style="margin-bottom: 8px;">Como lidar com fornecedores e prazos</li>
                <li style="margin-bottom: 8px;">Comunicação eficiente com o cliente</li>
                <li style="margin-bottom: 0;">Checklist de entrega perfeita</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px;"><strong>Dica:</strong> Já pense em uma obra atual (ou recente) para usar como base durante a imersão. Vamos trabalhar com casos reais!</p>
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Te vejo em breve! 💛</p>
      `),
    },
    {
      id: "N4",
      nome: "Exercício de Reflexão",
      delay: "D+10 (10 dias após compra)",
      assunto: "Exercício: suas 3 maiores dores na gestão de obras",
      previewText: "Um exercício rápido para você aproveitar ainda mais a imersão",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">*|NOME:Arquiteta|*, tenho um desafio para você.</p>
        
        <p style="margin: 0 0 20px;">Para que você aproveite 100% da imersão, quero te propor um <strong style="color: #D4AF37;">exercício de reflexão.</strong></p>
        
        <p style="margin: 0 0 20px;">É simples, mas poderoso:</p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 15px; color: #D4AF37; font-weight: bold;">✍️ EXERCÍCIO</p>
              <p style="margin: 0 0 15px; color: #FFFFFF;">Liste as <strong>3 maiores dores</strong> que você enfrenta hoje na gestão das suas obras:</p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">1. _______________________</p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">2. _______________________</p>
              <p style="margin: 0; color: #FFFFFF;">3. _______________________</p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px;">Pode ser algo como:</p>
        
        <ul style="margin: 0 0 20px; padding-left: 20px; color: #FFFFFF;">
          <li style="margin-bottom: 10px;">→ "Fornecedores que atrasam e eu fico refém"</li>
          <li style="margin-bottom: 10px;">→ "Cliente muda de ideia no meio da obra"</li>
          <li style="margin-bottom: 10px;">→ "Orçamento estoura e eu não sei onde"</li>
        </ul>
        
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37;">Quer compartilhar comigo?</strong></p>
        
        <p style="margin: 0 0 20px;">Responda este e-mail com suas 3 dores. Vou ler cada resposta e, quem sabe, posso abordar seu caso durante a imersão!</p>
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Sua resposta nos ajuda a tornar a imersão ainda mais relevante para você.</p>
      `),
    },
    {
      id: "N5",
      nome: "Contagem Regressiva",
      delay: "D-3 (3 dias antes da live)",
      assunto: "Faltam 3 dias! Prepare-se assim 🔥",
      previewText: "Checklist final para aproveitar 100% da imersão",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37; font-size: 24px;">Faltam apenas 3 dias, *|NOME:Arquiteta|*! 🔥</strong></p>
        
        <p style="margin: 0 0 20px;">A contagem regressiva começou e eu estou muito empolgada!</p>
        
        <p style="margin: 0 0 20px;">Para garantir que você aproveite 100% da imersão, preparei um <strong style="color: #D4AF37;">checklist final:</strong></p>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 15px; color: #D4AF37; font-weight: bold;">✅ CHECKLIST FINAL</p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">☐ Agenda bloqueada: 31/01 e 01/02, das 9h às 12h</p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">☐ Grupo do WhatsApp: já estou participando</p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">☐ Internet estável: testar conexão</p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">☐ Ambiente tranquilo: avisar a família/equipe</p>
              <p style="margin: 0 0 10px; color: #FFFFFF;">☐ Caderno e caneta: para anotar insights</p>
              <p style="margin: 0; color: #FFFFFF;">☐ Obra em mente: para usar como exemplo</p>
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
          <tr>
            <td style="padding: 20px; background-color: #27272A; border-radius: 8px;">
              <p style="margin: 0 0 10px; color: #D4AF37; font-weight: bold;">📅 DATAS E HORÁRIOS</p>
              <p style="margin: 0 0 5px; color: #FFFFFF;"><strong>Dia 1:</strong> 31 de Janeiro (Sexta) • 9h às 12h</p>
              <p style="margin: 0; color: #FFFFFF;"><strong>Dia 2:</strong> 01 de Fevereiro (Sábado) • 9h às 12h</p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px;">O link do Zoom será enviado no grupo do WhatsApp no dia 30/01.</p>
        
        ${createButton("ENTRAR NO GRUPO DO WHATSAPP", EMAIL_CONFIG.whatsappGroupUrl)}
        
        <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Nos vemos em 3 dias! Vai ser transformador! 💛</p>
      `),
    },
  ],
};

// ============================================================
// EXPORTAÇÃO COMPLETA
// ============================================================

export const TODAS_JORNADAS = {
  resgate: JORNADA_RESGATE,
  boasVindas: JORNADA_BOAS_VINDAS,
  carrinho: JORNADA_CARRINHO,
  reembolso: JORNADA_REEMBOLSO,
  nutricao: JORNADA_NUTRICAO,
};

// ============================================================
// GUIA DE CONFIGURAÇÃO NO RD STATION
// ============================================================

export const GUIA_CONFIGURACAO = `
================================================================================
GUIA DE CONFIGURAÇÃO NO RD STATION BASIC
================================================================================

📌 IMPORTANTE: No plano Basic, use sempre o gatilho "Converteram no evento"
   com o identificador de conversão específico.

--------------------------------------------------------------------------------
JORNADA 1: RESGATE INSCRIÇÃO
--------------------------------------------------------------------------------

AUTOMAÇÃO: "Resgate - Imersão Cronograma 2.0"

Gatilho: 
  → Converteram no evento: "inscricao-cronograma-2-0"

Condição de saída:
  → Converteram no evento: "pagamento-cronograma-2-0"

Fluxo:
  1. [ESPERAR] 1 dia
  2. [ENVIAR E-MAIL] R1 - Lembrete + Dor Principal
  3. [ESPERAR] 1 dia
  4. [ENVIAR E-MAIL] R2 - Prova Social + Autoridade
  5. [ESPERAR] 1 dia
  6. [ENVIAR E-MAIL] R3 - Conteúdo de Valor + Método
  7. [ESPERAR] 2 dias
  8. [ENVIAR E-MAIL] R4 - Urgência + Bônus
  9. [ESPERAR] 2 dias
  10. [ENVIAR E-MAIL] R5 - Última Chance

--------------------------------------------------------------------------------
JORNADA 2: BOAS-VINDAS COMPRADOR
--------------------------------------------------------------------------------

AUTOMAÇÃO: "Boas-vindas - Imersão Cronograma 2.0"

Gatilho:
  → Converteram no evento: "pagamento-cronograma-2-0"

Fluxo:
  1. [ENVIAR E-MAIL] B1 - Confirmação + Próximos Passos
  2. [ESPERAR ATÉ] 30/01 às 10h
  3. [ENVIAR E-MAIL] B2 - Preparação + Apostila
  4. [ESPERAR ATÉ] 31/01 às 08h
  5. [ENVIAR E-MAIL] B3 - Lembrete + Link Zoom

--------------------------------------------------------------------------------
JORNADA 3: CARRINHO ABANDONADO
--------------------------------------------------------------------------------

AUTOMAÇÃO: "Carrinho Abandonado - Imersão Cronograma 2.0"

Gatilho:
  → Converteram no evento: "checkout-abandonado-cronograma-2-0"
  (Enviado via Pluga quando Hotmart detecta checkout abandonado)

Condição de saída:
  → Converteram no evento: "pagamento-cronograma-2-0"

Fluxo:
  1. [ESPERAR] 30 minutos
  2. [ENVIAR E-MAIL] C1 - Esqueceu algo?
  3. [ESPERAR] 5 horas 30 minutos
  4. [ENVIAR E-MAIL] C2 - Dor + Solução
  5. [ESPERAR] 18 horas
  6. [ENVIAR E-MAIL] C3 - Última Chamada

--------------------------------------------------------------------------------
JORNADA 4: REEMBOLSO
--------------------------------------------------------------------------------

AUTOMAÇÃO: "Reembolso - Imersão Cronograma 2.0"

Gatilho:
  → Converteram no evento: "reembolso-cronograma-2-0"
  (Enviado via Pluga quando Hotmart processa reembolso)

Fluxo:
  1. [ENVIAR E-MAIL] RE1 - Confirmação + Feedback

================================================================================
CONFIGURAÇÃO DO PLUGA (Hotmart → RD Station)
================================================================================

CENÁRIO 1: Compra Aprovada
  Gatilho Hotmart: "Compra aprovada"
  Ação RD Station: "Registrar conversão"
  Identificador: "pagamento-cronograma-2-0"
  Mapear campos: nome, email, telefone

CENÁRIO 2: Reembolso
  Gatilho Hotmart: "Compra reembolsada"
  Ação RD Station: "Registrar conversão"
  Identificador: "reembolso-cronograma-2-0"
  Mapear campos: nome, email

CENÁRIO 3: Carrinho Abandonado (se disponível no Hotmart)
  Gatilho Hotmart: "Checkout abandonado"
  Ação RD Station: "Registrar conversão"
  Identificador: "checkout-abandonado-cronograma-2-0"
  Mapear campos: nome, email

================================================================================
`;
