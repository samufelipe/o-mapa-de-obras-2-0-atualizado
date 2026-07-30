// Conteudo exclusivo da pagina oficial (Index.tsx, inscricao.imersao...), evento 08/08/2026.
// Separado de constants.ts de proposito: /v2 e /v3 continuam usando a oferta antiga
// (nome, preco e data anteriores) sem qualquer alteracao.

// Checkout direto (sem formulario de nome/telefone): todos os CTAs da pagina
// oficial vao direto para esse link, exclusivo dessa oferta.
export const OBRA_PRONTA_CHECKOUT_URL =
  "https://pay.hotmart.com/T106814287G?checkoutMode=10&bid=1785439547163";

export const AGENDA_OBRA_PRONTA = [
  {
    day: "MÓDULO MANHÃ",
    date: "SÁBADO 08/08 • 09h às 12h",
    title: "Fundamentos da Execução Inteligente",
    topics: [
      "Por que profissionais que dominam obra ganham até 3x mais",
      "Planejamento da Obra: O passo-a-passo que elimina 80% dos problemas antes de começar a obra",
      "Escopo de Obra: Como criar escopos profissionais usando IA",
      "Sequência de Serviços: Monte a ordem perfeita que evita retrabalho"
    ]
  },
  {
    day: "MÓDULO TARDE",
    date: "SÁBADO 08/08 • 13h às 16h",
    title: "Cronograma, Lucro e Próximos Passos",
    topics: [
      "Cronograma de Obra em 8 Passos: O método validado para nunca mais errar prazos",
      "Cronograma de Obra: Como estruturar um cronograma pronto para aplicar na sua obra",
      "Como Ganhar Mais: Estratégias para cobrar honorários premium pelo gerenciamento",
      "Planejando faturar mais: conheça o seu próximo passo e como se tornar uma profissional da gestão de obra com a Mentoria Inovando na Sua Obra"
    ],
    surprise: {
      title: "Momento Especial",
      description: "Uma surpresa exclusiva será revelada ao vivo para quem permanecer até o final"
    }
  }
];

export const BONUSES_OBRA_PRONTA = [
  {
    title: "Aulas Preparatórias para Construir seu Cronograma de Obras de Forma Completa",
    value: "R$ 197,00",
    description: "Conteúdo exclusivo com temas como Contexto do Mercado, Método Inovando, Oportunidades 2026 e muito mais para você chegar na imersão pronta.",
    release: "ACESSO IMEDIATO"
  },
  {
    title: "Modelo de Cronograma",
    value: "R$ 59,90",
    description: "Template pronto para aplicar no seu escritório e nas suas obras. Personalize e tenha controle absoluto de cada projeto.",
    release: "LIBERADO PÓS-LIVE (08/08)"
  },
  {
    title: "Guia de 7 Prompts de IA para Obras",
    value: "R$ 50,00",
    description: "Ferramenta de organização para garantir que nenhum detalhe passe despercebido no levantamento e planejamento da obra.",
    release: "LIBERADO PÓS-LIVE (08/08)"
  }
];

export const PRICING_ITEMS_OBRA_PRONTA = [
  { name: "Imersão Cronograma Obra Pronta (Ao Vivo)", price: "R$ 197,00" },
  { name: "Aulas Preparatórias para Construir seu Cronograma de Obras de Forma Completa (Acesso Imediato)", price: "R$ 197,00" },
  { name: "Modelo de Cronograma", price: "R$ 59,90" },
  { name: "Guia de 7 Prompts de IA para Obras", price: "R$ 50,00" },
  { name: "Acesso ao Grupo VIP", price: "Incluso" },
];

export const FAQ_ITEMS_OBRA_PRONTA = [
  {
    question: "Como faço para participar da imersão ao vivo?",
    answer: "A imersão acontecerá AO VIVO pelo Zoom no dia 08/08. Para participar, basta baixar o aplicativo Zoom gratuitamente: no celular, acesse a App Store (iPhone) ou Google Play (Android) e busque por 'Zoom'. No computador, acesse zoom.us/download e instale o 'Zoom Desktop Client'. No dia do evento, você receberá o link de acesso no Grupo VIP do WhatsApp, é só clicar e entrar!"
  },
  {
    question: "Quando receberei os bônus e materiais?",
    answer: "As Aulas Preparatórias para Construir seu Cronograma de Obras de Forma Completa são liberadas imediatamente após a confirmação do pagamento. O Modelo de Cronograma e o Guia de 7 Prompts de IA para Obras serão liberados logo após o encerramento da imersão no dia 08/08, garantindo que você saiba exatamente como aplicá-los."
  },
  {
    question: "Como funciona o Grupo VIP de WhatsApp?",
    answer: "É o nosso canal oficial de avisos. Assim que o pagamento for aprovado, você recebe o link. Lá você receberá todos os comunicados importantes, lembretes e o link direto para a nossa sala de ZOOM no dia do evento."
  },
  {
    question: "O valor de R$ 29,90 é real? Tem pegadinha?",
    answer: "É real e sem pegadinhas. Este valor é simbólico para o 1º Lote, criado para reunir arquitetas comprometidas em elevar o nível técnico do mercado. O objetivo é que você conheça nosso método e tenha resultados imediatos na sua próxima obra."
  },
  {
    question: "A imersão será cansativa por ser o dia todo?",
    answer: "De forma alguma! Nossa dinâmica é focada em blocos curtos de conteúdo denso seguidos de interação e intervalos. Foi projetada para ser o sábado mais produtivo da sua carreira, não uma palestra monótona."
  },
  {
    question: "Como funcionam as aulas preparatórias para construir seu cronograma de obras de forma completa?",
    answer: "São aulas em vídeo liberadas imediatamente após a confirmação do pagamento. Incluem desde o tutorial de como usar o Zoom até conteúdos sobre o mercado atual, método Inovando, oportunidades para 2026 e quebra de objeções. Foram criadas para você construir a base necessária e chegar no dia 08/08 pronta para absorver o conteúdo avançado da imersão."
  }
];
