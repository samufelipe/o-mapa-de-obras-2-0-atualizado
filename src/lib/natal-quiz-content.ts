// Conteúdo do quiz de qualificação da variação /natal-v2.
// Perguntas e análise de perfil usam só fatos já aprovados (mesmo
// público-alvo e mesma dor de PainMechanismSection/natal-constants.ts).
// Nenhum score ou porcentagem calculada: é reconhecimento real da
// resposta da pessoa, não um resultado fictício.

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
  prompt: "O que mais pesa no seu gerenciamento de obra agora, com o Natal chegando?",
  options: [
    { id: "prazo-impossivel", label: "Medo de aceitar um prazo impossível" },
    { id: "precificar-fim-de-ano", label: "Não sei precificar o gerenciamento até o fim do ano" },
    { id: "cronograma-desorganizado", label: "Não sei montar um cronograma até o fim do ano de forma organizada" },
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
    body: "Aceitar o prazo que o cliente impõe por medo de decepcionar é uma das dores mais comuns entre {profissao}. O problema não é trabalhar mais rápido, é não saber defender o prazo certo com segurança na frente do cliente. É exatamente isso que a Imersão Cronograma Especial de Natal ensina, ao vivo, com a Ingrid e a Fernanda.",
  },
  "precificar-fim-de-ano": {
    headline: "Seu maior risco agora: não saber quanto tempo real você tem até o Natal",
    body: "Não saber quantas semanas úteis realmente sobram até o Natal, e como distribuir os serviços dentro desse prazo, é o erro mais comum na correria de fim de ano entre {profissao}. É exatamente isso que a Imersão Cronograma Especial de Natal ensina, ao vivo, com a Ingrid e a Fernanda.",
  },
  "cronograma-desorganizado": {
    headline: "Seu maior risco agora: chegar no fim do ano sem um cronograma organizado",
    body: "Não saber montar um cronograma organizado até o fim do ano é a raiz da maioria dos atrasos entre {profissao}. É exatamente isso que a Imersão Cronograma Especial de Natal ensina, ao vivo, com a Ingrid e a Fernanda.",
  },
  "fornecedor-atrasa": {
    headline: "Seu maior risco agora: a culpa do atraso do fornecedor cair em você",
    body: "Fornecedor atrasando e a culpa caindo em você é uma dor real de quem gerencia obra nessa época do ano. Saber qualificar fornecedor pelo critério que importa agora (prazo de entrega) é um dos pontos centrais da Imersão Cronograma Especial de Natal, ao vivo, com a Ingrid e a Fernanda.",
  },
};

const DEFAULT_PROFILE: ProfileContent = {
  headline: "A obra até o Natal não precisa ser correria",
  body: "Atraso na obra pesa pra {profissao}, mesmo quando a culpa é do fornecedor ou do cliente que demorou pra aprovar orçamento. É exatamente isso que a Imersão Cronograma Especial de Natal resolve, ao vivo, com a Ingrid e a Fernanda.",
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

// Depoimentos reais, os mesmos já aprovados e usados em TestimonialsSection.tsx
// (edição anterior da imersão) — selecionados os 5 com relato mais substancial
// pra tela de prova social do quiz. Mesmo shape de dado do TestimonialCard,
// pra reaproveitar o modelo visual exato (avatar, anel gradiente, curtidas).
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
