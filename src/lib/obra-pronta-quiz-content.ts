// Conteúdo do quiz de qualificação da Imersão Cronograma Obra Pronta (/quiz).
// Copia a mecânica do quiz /natal-v2 (natal-quiz-content.ts), mas com copy
// própria, sem menção a Natal, coerente com a LP oficial (Index.tsx).
// Mantido como arquivo isolado (não importa de natal-quiz-content.ts) pra
// não acoplar as duas ofertas.

export type QuizStepId = "intro" | "question-1" | "question-2" | "profile" | "video" | "social-proof";

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: "question-1" | "question-2";
  prompt: string;
  options: QuizOption[];
}

export type QuizAnswers = Partial<Record<"question-1" | "question-2", string>>;

export const QUIZ_QUESTION_1: QuizQuestion = {
  id: "question-1",
  prompt: "Qual é a sua profissão?",
  options: [
    { id: "arquiteta", label: "Arquiteta" },
    { id: "engenheira", label: "Engenheira" },
    { id: "designer-interiores", label: "Designer de interiores" },
    { id: "outra", label: "Outra" },
  ],
};

// As 4 opções mapeiam 1:1 nos 4 pilares de dor já validados em
// ProblemsSection.tsx (Maior Faturamento, Fim do Retrabalho, Autoridade e
// Segurança, Gestão Inteligente), reescritas em primeira pessoa pra gerar
// identificação imediata ("é, essa dor é minha") em vez de categoria abstrata.
export const QUIZ_QUESTION_2: QuizQuestion = {
  id: "question-2",
  prompt: "Qual dessas situações te descreve melhor hoje?",
  options: [
    { id: "precificar-gestao", label: "Cobro pouco porque não sei precificar gestão de obra" },
    { id: "retrabalho", label: "Já perdi dinheiro com retrabalho por não prever a sequência certa" },
    { id: "frio-na-barriga", label: "Sinto um frio na barriga quando a equipe de obra me questiona" },
    { id: "apaga-incendio", label: "Vivo apagando incêndio em vez de planejar com antecedência" },
  ],
};

const PROFESSION_LABELS: Record<string, string> = {
  arquiteta: "arquiteta",
  engenheira: "engenheira",
  "designer-interiores": "designer de interiores",
  outra: "profissional de arquitetura e interiores",
};

interface ProfileContent {
  headline: string;
  body: string;
}

const PROFILE_BY_PAIN: Record<string, ProfileContent> = {
  "precificar-gestao": {
    headline: "Você está deixando dinheiro na mesa em toda obra que gerencia",
    body: "Quem não sabe precificar gestão de obra cobra como amador e entrega como profissional, o prejuízo é seu. Na Imersão Cronograma Obra Pronta, {profissao} aprende como o domínio do cronograma vira argumento pra cobrar mais caro pelo mesmo trabalho, ao vivo em 08/08, com a Ingrid e a Fernanda.",
  },
  retrabalho: {
    headline: "O retrabalho que já te custou dinheiro vai se repetir na próxima obra",
    body: "Sem a sequência certa de execução, um fornecedor chega antes da hora, material recém-instalado é danificado, e o prejuízo cai no seu colo. É exatamente esse erro que a Imersão Cronograma Obra Pronta elimina em {profissao}, ao vivo em 08/08, com a Ingrid e a Fernanda.",
  },
  "frio-na-barriga": {
    headline: "Enquanto você não domina a sequência técnica, a obra desconfia de você",
    body: "Esse frio na barriga na hora de responder a equipe não é falta de talento, é falta de método. Quem domina a sequência técnica responde com precisão e conquista respeito na hora. É isso que a Imersão Cronograma Obra Pronta constrói em {profissao}, ao vivo em 08/08, com a Ingrid e a Fernanda.",
  },
  "apaga-incendio": {
    headline: "Apagar incêndio todos os dias tem um preço: seu tempo e sua margem",
    body: "Cada obra sem planejamento é uma nova rodada de correria. A Imersão Cronograma Obra Pronta ensina {profissao} a usar cronograma e IA pra prever o problema antes dele acontecer, e trocar a exaustão diária por uma rotina previsível, ao vivo em 08/08, com a Ingrid e a Fernanda.",
  },
};

const DEFAULT_PROFILE: ProfileContent = {
  headline: "Projetos incríveis não sobrevivem a obra sem método",
  body: "É o domínio da sequência de serviços e do cronograma que separa {profissao} que fatura mais dos amadores que vivem no prejuízo. É exatamente isso que a Imersão Cronograma Obra Pronta ensina, ao vivo em 08/08, com a Ingrid e a Fernanda.",
};

export function getProfileAnalysis(answers: QuizAnswers): ProfileContent {
  const professionLabel = PROFESSION_LABELS[answers["question-1"] ?? ""] ?? "arquitetas, engenheiras e designers de interiores";
  const painAnswer = answers["question-2"];
  const content = (painAnswer && PROFILE_BY_PAIN[painAnswer]) || DEFAULT_PROFILE;

  return {
    headline: content.headline,
    body: content.body.replace("{profissao}", professionLabel),
  };
}

// Mesmos depoimentos reais já usados em TestimonialsSection.tsx e no quiz de
// Natal (não são específicos de nenhuma das duas ofertas). Copiados aqui (em
// vez de importados de natal-quiz-content.ts) só pra manter o isolamento
// entre os dois quizzes.
export type { Testimonial as QuizTestimonial } from "@/components/landing/TestimonialCard";
import type { Testimonial } from "@/components/landing/TestimonialCard";

export const QUIZ_TESTIMONIALS: Testimonial[] = [
  {
    handle: "luraarquitetura",
    name: "Lura Arquitetura",
    initials: "LA",
    ringA: "#833ab4", ringB: "#fd1d1d",
    avatarA: "#833ab4", avatarB: "#c13584",
    likes: 127, timeAgo: "12 sem.", verified: false,
    text: "Essa imersão deixa muito claro que projeto e obra não podem caminhar separados. Cronograma, processos e tomada de decisão fazem parte da materialização do projeto.",
  },
  {
    handle: "yasminbarros.arq",
    name: "Yasmin Barros",
    initials: "YB",
    ringA: "#f09433", ringB: "#e6683c",
    avatarA: "#f9a825", avatarB: "#f06292",
    likes: 89, timeAgo: "12 sem.", verified: false,
    text: "Quanto conteúdo váliosooooo! O principal insight: não existe projeto executivo até a obra se iniciar. Saiu um peso das minhas costas sobre alterações que acontecem após a demolição.",
  },
  {
    handle: "saraferreirah",
    name: "Sara Ferreira",
    initials: "SF",
    ringA: "#fd1d1d", ringB: "#833ab4",
    avatarA: "#e91e63", avatarB: "#ff5722",
    likes: 203, timeAgo: "12 sem.", verified: false,
    text: "Adorei muito a imersão. Meu insight foi perceber o quanto é importante realizar o cronograma para evitar problemas futuros. Proporciona uma experiência tranquila para todos os envolvidos: cliente, fornecedores e arquiteto! Todos ganham.",
  },
  {
    handle: "studioantun.3d",
    name: "Studio Antun 3D",
    initials: "SA",
    ringA: "#4776E6", ringB: "#8E54E9",
    avatarA: "#1565c0", avatarB: "#7b1fa2",
    likes: 94, timeAgo: "12 sem.", verified: false,
    text: "O maior aprendizado foi entender os processos e que sem isso você não consegue ser assertivo na resolução dos problemas quando eles aparecerem. Adorei demaaaais!",
  },
  {
    handle: "vsbelga",
    name: "VS Belga",
    initials: "VB",
    ringA: "#667eea", ringB: "#764ba2",
    avatarA: "#667eea", avatarB: "#764ba2",
    likes: 83, timeAgo: "12 sem.", verified: false,
    text: "A imersão me ajudou a enxergar como destrinchar as etapas do projeto torna o cronograma mais realista e facilita o entendimento do cliente sobre demandas e prazos.",
  },
];
