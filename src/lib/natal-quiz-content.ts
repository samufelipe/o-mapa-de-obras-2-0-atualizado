// Conteúdo do quiz de qualificação da variação /natal-v2.
// Perguntas e reconhecimento de resposta usam só fatos já aprovados
// (mesmo público-alvo e mesma dor de PainMechanismSection/natal-constants.ts).
// Nenhum score ou porcentagem calculada: é reconhecimento da resposta, não
// um resultado fictício.

export type QuizStepId = "intro" | "question-1" | "question-2" | "transition" | "result";

export const QUIZ_STEPS: QuizStepId[] = ["intro", "question-1", "question-2", "transition", "result"];

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
  prompt: "Qual desses papéis é o seu?",
  options: [
    { id: "arquiteta", label: "Arquiteta" },
    { id: "engenheira", label: "Engenheira" },
    { id: "designer-interiores", label: "Designer de interiores" },
  ],
};

export const QUIZ_QUESTION_2: QuizQuestion = {
  id: "question-2",
  prompt: "O que mais aperta no seu momento até o Natal?",
  options: [
    { id: "prazo-impossivel", label: "Medo de aceitar um prazo impossível" },
    { id: "precificar-fim-de-ano", label: "Não sei precificar o gerenciamento até o fim do ano" },
    { id: "fornecedor-atrasa", label: "Fornecedor atrasa e a culpa cai em mim" },
  ],
};

const RESULT_ACKNOWLEDGEMENTS: Record<string, string> = {
  "prazo-impossivel":
    "Você não está sozinha: aprender a defender o prazo com segurança na frente do cliente é um dos pontos centrais da Imersão Cronograma Especial de Natal.",
  "precificar-fim-de-ano":
    "Saber quantas semanas úteis você realmente tem até o Natal, e como distribuir os serviços dentro desse prazo, é exatamente um dos pontos que a Imersão ensina.",
  "fornecedor-atrasa":
    "Qualificar fornecedor pelo critério que importa nessa época do ano (prazo de entrega) é um dos pontos centrais da Imersão Cronograma Especial de Natal.",
};

const DEFAULT_ACKNOWLEDGEMENT =
  "É exatamente isso que a Imersão Cronograma Especial de Natal resolve, ao vivo, com a Ingrid e a Fernanda.";

export function getResultAcknowledgement(answers: QuizAnswers): string {
  const answer = answers["question-2"];
  if (answer && RESULT_ACKNOWLEDGEMENTS[answer]) {
    return RESULT_ACKNOWLEDGEMENTS[answer];
  }
  return DEFAULT_ACKNOWLEDGEMENT;
}
