import { useEffect, useRef, useState } from "react";
import { Loader2, Lock, ShieldCheck, Check } from "lucide-react";
import { useCTA } from "@/lib/cta-context";
import { trackQuizStepView, trackQuizAnswer, trackCTAClick, trackVideoInteraction } from "@/lib/gtm-tracking";
import { NATAL_PRICE, NATAL_GUARANTEE_DAYS, NATAL_EVENT_DATE_LABEL } from "@/lib/natal-constants";
import {
  QUIZ_STEPS,
  QUIZ_QUESTION_1,
  QUIZ_QUESTION_2,
  getResultAcknowledgement,
  type QuizAnswers,
  type QuizQuestion,
} from "@/lib/natal-quiz-content";

const STEP_PROGRESS: Record<string, number> = {
  intro: 0,
  "question-1": 33,
  "question-2": 66,
  transition: 90,
  result: 100,
};

const TRANSITION_DURATION_MS = 1500;
const SELECTION_DELAY_MS = 350;

const NatalQuizFunnel = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const handleCTA = useCTA();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const currentStep = QUIZ_STEPS[stepIndex];
  const progress = STEP_PROGRESS[currentStep] ?? 0;

  useEffect(() => {
    trackQuizStepView(currentStep, stepIndex);
    setSelectedOptionId(null);
    headingRef.current?.focus();
  }, [currentStep, stepIndex]);

  useEffect(() => {
    if (currentStep !== "transition") return;
    const timer = setTimeout(() => setStepIndex((i) => i + 1), TRANSITION_DURATION_MS);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const goToStart = () => setStepIndex((i) => i + 1);

  const answerQuestion = (question: QuizQuestion, optionId: string, optionLabel: string) => {
    setSelectedOptionId(optionId);
    trackQuizAnswer(question.id, optionId, optionLabel);
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    setTimeout(() => setStepIndex((i) => i + 1), SELECTION_DELAY_MS);
  };

  const handleFinalCTA = () => {
    trackCTAClick("quiz_final_cta", "quiz_result", "GARANTIR MINHA VAGA");
    handleCTA();
  };

  return (
    <div className="natal-theme min-h-[100dvh] flex flex-col bg-background text-foreground">
      {currentStep !== "intro" && (
        <div
          className="fixed top-0 inset-x-0 h-1.5 bg-secondary z-50"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do quiz"
        >
          <div
            className="h-full bg-primary transition-all duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {currentStep === "question-1" && "Pergunta 1 de 2"}
        {currentStep === "question-2" && "Pergunta 2 de 2"}
        {currentStep === "transition" && "Preparando seu resultado"}
        {currentStep === "result" && "Seu resultado está pronto"}
      </div>

      <main key={currentStep} className="flex-1 flex items-center justify-center px-4 py-10 animate-fade-up">
        <div className="w-full max-w-md mx-auto">
          {currentStep === "intro" && (
            <div className="text-center">
              <img
                src="/brand-natal/simbolo.png"
                alt="Cronograma: Obra Pronta até o Natal"
                className="h-12 w-auto object-contain mx-auto mb-8"
              />
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3 outline-none"
              >
                Responda 2 perguntas rápidas
              </h1>
              <p className="text-muted-foreground font-medium mb-8">
                E veja como a Imersão Cronograma Especial de Natal se encaixa no seu momento.
              </p>
              <button
                onClick={goToStart}
                className="w-full bg-green-600 text-white py-4 text-base font-bold uppercase tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Começar
              </button>
              <p className="text-sm text-muted-foreground font-medium mt-4">
                Ao vivo · {NATAL_EVENT_DATE_LABEL} · R$ {NATAL_PRICE.toFixed(2).replace(".", ",")}
              </p>
            </div>
          )}

          {(currentStep === "question-1" || currentStep === "question-2") && (
            <QuestionScreen
              question={currentStep === "question-1" ? QUIZ_QUESTION_1 : QUIZ_QUESTION_2}
              headingRef={headingRef}
              selectedOptionId={selectedOptionId}
              onSelect={answerQuestion}
            />
          )}

          {currentStep === "transition" && (
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin motion-reduce:animate-none mx-auto mb-6" />
              <h1 ref={headingRef} tabIndex={-1} className="text-xl font-bold uppercase tracking-tight outline-none">
                Preparando seu resultado...
              </h1>
            </div>
          )}

          {currentStep === "result" && (
            <ResultScreen headingRef={headingRef} answers={answers} onFinalCTA={handleFinalCTA} />
          )}
        </div>
      </main>
    </div>
  );
};

const QuestionScreen = ({
  question,
  headingRef,
  selectedOptionId,
  onSelect,
}: {
  question: QuizQuestion;
  headingRef: React.RefObject<HTMLHeadingElement>;
  selectedOptionId: string | null;
  onSelect: (question: QuizQuestion, optionId: string, optionLabel: string) => void;
}) => (
  <div>
    <h1 ref={headingRef} tabIndex={-1} className="text-xl md:text-2xl font-bold text-center mb-8 outline-none">
      {question.prompt}
    </h1>
    <fieldset className={selectedOptionId ? "pointer-events-none" : undefined}>
      <legend className="sr-only">{question.prompt}</legend>
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(question, option.id, option.label)}
              className={`w-full flex items-center justify-between gap-3 text-left px-5 py-4 border-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span>{option.label}</span>
              {isSelected && <Check className="w-5 h-5 text-primary flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </fieldset>
  </div>
);

const ResultScreen = ({
  headingRef,
  answers,
  onFinalCTA,
}: {
  headingRef: React.RefObject<HTMLHeadingElement>;
  answers: QuizAnswers;
  onFinalCTA: () => void;
}) => {
  const acknowledgement = getResultAcknowledgement(answers);

  return (
    <div className="text-center">
      <h1 ref={headingRef} tabIndex={-1} className="text-xl md:text-2xl font-bold mb-4 outline-none leading-snug">
        {acknowledgement}
      </h1>

      <div className="mb-6 border-2 border-foreground shadow-premium overflow-hidden">
        <video
          className="w-full h-auto block"
          controls
          playsInline
          preload="metadata"
          poster="/videos/imersao-natal-cuidado-poster.jpg"
          onPlay={() => trackVideoInteraction("play", "quiz_result_video")}
          onPause={(e) => trackVideoInteraction("pause", "quiz_result_video", e.currentTarget.currentTime)}
          onEnded={() => trackVideoInteraction("complete", "quiz_result_video")}
        >
          <source src="/videos/imersao-natal-cuidado.mp4" type="video/mp4" />
        </video>
      </div>

      <button
        onClick={onFinalCTA}
        className="w-full bg-green-600 text-white py-4 flex items-center justify-center gap-2 text-base sm:text-lg font-bold tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 uppercase active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Garantir minha vaga · R$ {NATAL_PRICE.toFixed(2).replace(".", ",")}
      </button>

      <p className="text-center text-sm text-muted-foreground font-medium flex items-center justify-center gap-1 mt-3">
        <Lock className="w-3.5 h-3.5" /> Pagamento seguro via Hotmart
      </p>

      <div className="flex items-center justify-center gap-2 text-muted-foreground mt-4">
        <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
        <p className="text-xs font-medium text-left">
          Garantia de {NATAL_GUARANTEE_DAYS} dias prevista em lei, sem burocracia.
        </p>
      </div>
    </div>
  );
};

export default NatalQuizFunnel;
