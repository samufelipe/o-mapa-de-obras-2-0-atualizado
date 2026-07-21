// Configuração da oferta "Imersão Cronograma Especial de Natal" (evento 08/08/2026)
// Separado de constants.ts de propósito: não é a mesma oferta da Imersão Cronograma 2.0.

export const NATAL_CHECKOUT_URL =
  "https://pay.hotmart.com/T106814287G?off=b5og3zzg&bid=1784598771309";

export const NATAL_PRICE = 29.9;

export const NATAL_PRODUCT_NAME = "Imersão Cronograma Especial de Natal";

// Data/hora do evento ao vivo. Usada pela contagem regressiva do Hero.
export const NATAL_EVENT_DATE = new Date("2026-08-08T23:59:59-03:00");

export const NATAL_EVENT_DATE_LABEL = "08/08";

// Os 6 pontos do mecanismo, extraídos do briefing original, reescritos como
// competência ("o que você sai sabendo fazer"), não como bônus com valor de R$.
export const NATAL_MECHANISM_POINTS = [
  "Quantas semanas úteis você realmente tem até o Natal, e como distribuir os serviços dentro desse prazo",
  "Qual ordem seguir quando marcenaria e marmoraria disputam o cronograma",
  "Até quando fechar todos os orçamentos sem comprometer a entrega",
  "Como qualificar fornecedores pelo critério que importa nessa época do ano: prazo de entrega",
  "Como montar um cronograma que você defende com segurança na frente do cliente",
  "Como conduzir o cliente para aprovar orçamentos rápido, sem depender da sorte",
];

// GARANTIA: 7 dias corridos, confirmado com o Samuel (2026-07-21). Não é uma
// escolha comercial: é o mínimo exigido pelo CDC art. 49 (direito de
// arrependimento em compra online), mesmo passando da data do evento (08/08).
export const NATAL_GUARANTEE_DAYS = 7;

export const NATAL_FAQ = [
  {
    question: "R$ 29,90 é o valor real? Tem pegadinha?",
    answer:
      "É o valor real, sem pegadinha. A imersão acontece ao vivo, no dia 08/08, e o acesso é confirmado assim que o pagamento é aprovado.",
  },
  {
    question: "Recebo algum material pronto ou é só a live?",
    answer:
      "É uma imersão 100% ao vivo. Você constrói o cronograma da sua própria obra ao vivo, com a Ingrid e a Fernanda te orientando direto, em vez de receber um material genérico pronto.",
  },
  {
    question: "Como eu entro na live do Zoom no dia?",
    answer:
      "Depois da confirmação do pagamento, você recebe o link de acesso com antecedência. No dia 08/08, é só clicar no link e entrar.",
  },
  {
    question: "E se eu não conseguir participar ao vivo?",
    answer:
      "A imersão acontece ao vivo, no dia 08/08, das 9h às 17h. Reserve o dia inteiro para você: é nele que você monta o cronograma com a Ingrid e a Fernanda, tirando dúvidas em tempo real.",
  },
  {
    question: "Tem garantia?",
    answer:
      "Sim. Garantia de 7 dias prevista em lei (Código de Defesa do Consumidor): você pode pedir reembolso total, sem burocracia, caso sinta que não é para você.",
  },
];

export const NATAL_FOOTER_LINKS = [
  { label: "Início", sectionId: "hero" },
  { label: "Depoimentos", sectionId: "testimonials" },
  { label: "O Método", sectionId: "mechanism" },
  { label: "Oferta", sectionId: "offer" },
  { label: "Dúvidas", sectionId: "faq" },
];
