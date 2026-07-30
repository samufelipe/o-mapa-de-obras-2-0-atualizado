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

// Identico ao FAQ da LP de Natal (NATAL_FAQ, em natal-constants.ts) por pedido
// da cliente, exceto a resposta de "E se eu não conseguir participar ao vivo?",
// atualizada com a regra de gravação disponível por 48h. Mantido como copia
// (em vez de importar de natal-constants.ts) pra nao acoplar as duas ofertas.
export const FAQ_ITEMS_OBRA_PRONTA = [
  {
    question: "R$ 29,90 é o valor real? Tem pegadinha?",
    answer: "É o valor real, sem pegadinha. A imersão acontece ao vivo, no dia 08/08, e o acesso é confirmado assim que o pagamento é aprovado."
  },
  {
    question: "Recebo algum material pronto ou é só a live?",
    answer: "É uma imersão 100% ao vivo. Você aprende tudo o que precisa saber para entregar sua obra no prazo, com a Ingrid e a Fernanda ensinando ao vivo, em vez de receber um material genérico pronto."
  },
  {
    question: "Como eu entro na live do Zoom no dia?",
    answer: "Depois da confirmação do pagamento, você recebe o link de acesso com antecedência. No dia 08/08, é só clicar no link e entrar."
  },
  {
    question: "E se eu não conseguir participar ao vivo?",
    answer: "A gravação ficará disponível apenas por 48h. Mas aconselhamos você a reservar o dia inteiro. É ao vivo que você aprende tudo o que precisa saber para entregar sua obra no prazo, tirando dúvidas em tempo real."
  },
  {
    question: "Tem garantia?",
    answer: "Sim. Garantia de 7 dias prevista em lei (Código de Defesa do Consumidor): você pode pedir reembolso total, sem burocracia, caso sinta que não é para você."
  }
];
