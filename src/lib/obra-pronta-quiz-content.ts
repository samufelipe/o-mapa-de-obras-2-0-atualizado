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

export const QUIZ_QUESTION_2: QuizQuestion = {
  id: "question-2",
  prompt: "O que mais pesa no seu gerenciamento de obra agora?",
  options: [
    { id: "prazo-impossivel", label: "Medo de aceitar um prazo impossível" },
    { id: "precificar-gestao", label: "Não sei precificar minha gestão de obra" },
    { id: "cronograma-desorganizado", label: "Não sei montar um cronograma organizado" },
    { id: "fornecedor-atrasa", label: "Fornecedor atrasa e a culpa cai em mim" },
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
  "prazo-impossivel": {
    headline: "Seu maior risco agora: aceitar um prazo que você já sabe que não vai cumprir",
    body: "Aceitar o prazo que o cliente impõe por medo de decepcionar é uma das dores mais comuns entre {profissao}. O problema não é trabalhar mais rápido, é não saber defender o prazo certo com segurança na frente do cliente. É exatamente isso que a Imersão Cronograma Obra Pronta ensina, ao vivo em 08/08, com a Ingrid e a Fernanda.",
  },
  "precificar-gestao": {
    headline: "Seu maior risco agora: não saber precificar sua gestão de obra",
    body: "Não saber cobrar pelo que realmente vale o seu trabalho de gerenciamento é um dos erros mais comuns entre {profissao}. É exatamente isso que a Imersão Cronograma Obra Pronta ensina, ao vivo em 08/08, com a Ingrid e a Fernanda.",
  },
  "cronograma-desorganizado": {
    headline: "Seu maior risco agora: seguir sem um cronograma organizado",
    body: "Não saber montar um cronograma organizado é a raiz da maioria dos atrasos entre {profissao}. É exatamente isso que a Imersão Cronograma Obra Pronta ensina, ao vivo em 08/08, com a Ingrid e a Fernanda.",
  },
  "fornecedor-atrasa": {
    headline: "Seu maior risco agora: a culpa do atraso do fornecedor cair em você",
    body: "Fornecedor atrasando e a culpa caindo em você é uma dor real de quem gerencia obra. Saber qualificar fornecedor pelo critério que realmente importa, o prazo de entrega, é um dos pontos centrais da Imersão Cronograma Obra Pronta, ao vivo em 08/08, com a Ingrid e a Fernanda.",
  },
};

const DEFAULT_PROFILE: ProfileContent = {
  headline: "Sua obra não precisa ser correria",
  body: "Atraso na obra pesa pra {profissao}, mesmo quando a culpa é do fornecedor ou do cliente que demorou pra aprovar orçamento. É exatamente isso que a Imersão Cronograma Obra Pronta resolve, ao vivo em 08/08, com a Ingrid e a Fernanda.",
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
