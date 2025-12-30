/**
 * Templates de E-mail - A Virada da Arquiteta
 * 
 * Todos os templates estão formatados para copiar e colar no RD Station.
 * Variáveis dinâmicas: {{nome}}, {{email}}
 * 
 * INSTRUÇÕES:
 * 1. Crie o header no Canva (600x150px) com logo
 * 2. Hospede a imagem do header (use imgur.com ou similar)
 * 3. Substitua HEADER_IMAGE_URL pela URL da imagem
 * 4. Copie o HTML para o RD Station
 */

// ============================================================
// CONFIGURAÇÕES GLOBAIS
// ============================================================

export const EMAIL_CONFIG = {
  headerImageUrl: "HEADER_IMAGE_URL", // Substituir pela URL real
  checkoutUrl: "https://pay.hotmart.com/W98444850C?checkoutMode=10",
  instagramUrl: "https://www.instagram.com/inovandonasuaobra/",
  whatsappGroupUrl: "WHATSAPP_GROUP_URL", // Substituir pela URL real
  zoomLink: "ZOOM_LINK", // Substituir pela URL real
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

const createEmailWrapper = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #18181B; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #18181B;">
    <tr>
      <td align="center" style="padding: 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #18181B; max-width: 600px;">
          <!-- Header com Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <img src="${EMAIL_CONFIG.headerImageUrl}" alt="A Virada da Arquiteta" width="600" style="max-width: 100%; height: auto;">
            </td>
          </tr>
          <!-- Conteúdo -->
          <tr>
            <td style="padding: 0 20px; color: #FFFFFF; font-size: 16px; line-height: 1.6;">
              ${content}
            </td>
          </tr>
          <!-- Assinatura -->
          <tr>
            <td style="padding: 40px 20px 20px; color: #FFFFFF; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0;">Um abraço,</p>
              <p style="margin: 10px 0 0; color: #D4AF37; font-weight: bold;">Ingrid Zarza e Fernanda Bradaschia</p>
              <p style="margin: 5px 0 0; color: #A1A1AA; font-size: 14px;">Mentoras da Virada da Arquiteta</p>
              <p style="margin: 15px 0 0;">
                <a href="${EMAIL_CONFIG.instagramUrl}" style="color: #D4AF37; text-decoration: none;">@inovandonasuaobra</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 30px 20px; border-top: 1px solid #27272A;">
              <p style="margin: 0; color: #71717A; font-size: 12px;">
                © 2025 A Virada da Arquiteta. Todos os direitos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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
// Gatilho: Converteram em "inscricao-imersao-virada-arquiteta"
// Condição de saída: Converteram em "pagamento-imersao-virada-arquiteta"
// ============================================================

export const JORNADA_RESGATE = {
  nome: "Resgate Inscrição",
  gatilho: "inscricao-imersao-virada-arquiteta",
  condicaoSaida: "pagamento-imersao-virada-arquiteta",
  emails: [
    {
      id: "R1",
      nome: "Lembrete + Dor Principal",
      delay: "D+1 (24 horas)",
      assunto: "Sua vaga ainda está reservada, {{nome}} 🔒",
      previewText: "Mas por quanto tempo você vai deixar o retrabalho consumir seu lucro?",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">Olá, {{nome}}!</p>
        
        <p style="margin: 0 0 20px;">Vi que você se inscreveu na <strong style="color: #D4AF37;">Imersão A Virada da Arquiteta</strong>, mas ainda não garantiu sua vaga.</p>
        
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
        
        <p style="margin: 0 0 20px;">Na <strong style="color: #D4AF37;">Imersão A Virada da Arquiteta</strong>, elas vão compartilhar o método exato que usam há anos.</p>
        
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
        
        <p style="margin: 0 0 20px;">Quem se inscrever na <strong style="color: #D4AF37;">Imersão A Virada da Arquiteta</strong> vai receber <strong>3 bônus exclusivos</strong> que, sozinhos, já valem o investimento:</p>
        
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
        
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37;">A Imersão A Virada da Arquiteta começa em poucos dias.</strong></p>
        
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
// Gatilho: Converteram em "pagamento-imersao-virada-arquiteta"
// ============================================================

export const JORNADA_BOAS_VINDAS = {
  nome: "Boas-vindas Comprador",
  gatilho: "pagamento-imersao-virada-arquiteta",
  emails: [
    {
      id: "B1",
      nome: "Confirmação + Próximos Passos",
      delay: "Imediato",
      assunto: "🎉 Parabéns! Você está oficialmente na Virada",
      previewText: "Sua vaga está confirmada. Veja os próximos passos.",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;"><strong style="color: #D4AF37; font-size: 24px;">Parabéns, {{nome}}! 🎉</strong></p>
        
        <p style="margin: 0 0 20px;">Você acabou de dar um passo gigante para transformar a gestão das suas obras.</p>
        
        <p style="margin: 0 0 20px;">Sua vaga na <strong style="color: #D4AF37;">Imersão A Virada da Arquiteta</strong> está <strong>CONFIRMADA!</strong></p>
        
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
        
        <p style="margin: 0 0 20px;">A <strong>Imersão A Virada da Arquiteta</strong> começa em <strong>1 hora</strong>.</p>
        
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
  gatilho: "checkout-abandonado-virada-arquiteta",
  emails: [
    {
      id: "C1",
      nome: "Esqueceu algo?",
      delay: "30 minutos após abandono",
      assunto: "Esqueceu algo no checkout? 🛒",
      previewText: "Sua vaga está esperando por você",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">Oi, {{nome}}!</p>
        
        <p style="margin: 0 0 20px;">Percebi que você iniciou a inscrição na <strong style="color: #D4AF37;">Imersão A Virada da Arquiteta</strong> mas não finalizou.</p>
        
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
        
        <p style="margin: 0 0 20px;">A <strong style="color: #D4AF37;">Imersão A Virada da Arquiteta</strong> existe para resolver exatamente isso. Em 2 dias, você vai aprender o sistema que usamos para entregar +250 obras sem perder o controle.</p>
        
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
// Gatilho: Converteram em "reembolso-imersao-virada-arquiteta"
// ============================================================

export const JORNADA_REEMBOLSO = {
  nome: "Reembolso",
  gatilho: "reembolso-imersao-virada-arquiteta",
  emails: [
    {
      id: "RE1",
      nome: "Confirmação + Feedback",
      delay: "Imediato",
      assunto: "Seu reembolso foi processado ✓",
      previewText: "Confirmação do reembolso + uma pergunta rápida",
      html: createEmailWrapper(`
        <p style="margin: 0 0 20px;">Olá, {{nome}}.</p>
        
        <p style="margin: 0 0 20px;">Confirmamos que seu reembolso da <strong>Imersão A Virada da Arquiteta</strong> foi processado com sucesso.</p>
        
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
// EXPORTAÇÃO COMPLETA
// ============================================================

export const TODAS_JORNADAS = {
  resgate: JORNADA_RESGATE,
  boasVindas: JORNADA_BOAS_VINDAS,
  carrinho: JORNADA_CARRINHO,
  reembolso: JORNADA_REEMBOLSO,
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

AUTOMAÇÃO: "Resgate - Imersão Virada Arquiteta"

Gatilho: 
  → Converteram no evento: "inscricao-imersao-virada-arquiteta"

Condição de saída:
  → Converteram no evento: "pagamento-imersao-virada-arquiteta"

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

AUTOMAÇÃO: "Boas-vindas - Imersão Virada Arquiteta"

Gatilho:
  → Converteram no evento: "pagamento-imersao-virada-arquiteta"

Fluxo:
  1. [ENVIAR E-MAIL] B1 - Confirmação + Próximos Passos
  2. [ESPERAR ATÉ] 30/01 às 10h
  3. [ENVIAR E-MAIL] B2 - Preparação + Apostila
  4. [ESPERAR ATÉ] 31/01 às 08h
  5. [ENVIAR E-MAIL] B3 - Lembrete + Link Zoom

--------------------------------------------------------------------------------
JORNADA 3: CARRINHO ABANDONADO
--------------------------------------------------------------------------------

AUTOMAÇÃO: "Carrinho Abandonado - Imersão Virada Arquiteta"

Gatilho:
  → Converteram no evento: "checkout-abandonado-virada-arquiteta"
  (Enviado via Pluga quando Hotmart detecta checkout abandonado)

Condição de saída:
  → Converteram no evento: "pagamento-imersao-virada-arquiteta"

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

AUTOMAÇÃO: "Reembolso - Imersão Virada Arquiteta"

Gatilho:
  → Converteram no evento: "reembolso-imersao-virada-arquiteta"
  (Enviado via Pluga quando Hotmart processa reembolso)

Fluxo:
  1. [ENVIAR E-MAIL] RE1 - Confirmação + Feedback

================================================================================
CONFIGURAÇÃO DO PLUGA (Hotmart → RD Station)
================================================================================

CENÁRIO 1: Compra Aprovada
  Gatilho Hotmart: "Compra aprovada"
  Ação RD Station: "Registrar conversão"
  Identificador: "pagamento-imersao-virada-arquiteta"
  Mapear campos: nome, email, telefone

CENÁRIO 2: Reembolso
  Gatilho Hotmart: "Compra reembolsada"
  Ação RD Station: "Registrar conversão"
  Identificador: "reembolso-imersao-virada-arquiteta"
  Mapear campos: nome, email

CENÁRIO 3: Carrinho Abandonado (se disponível no Hotmart)
  Gatilho Hotmart: "Checkout abandonado"
  Ação RD Station: "Registrar conversão"
  Identificador: "checkout-abandonado-virada-arquiteta"
  Mapear campos: nome, email

================================================================================
`;
