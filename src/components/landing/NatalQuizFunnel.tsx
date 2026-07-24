import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, Lock, ShieldCheck, Check, Quote } from "lucide-react";
import { useCTA } from "@/lib/cta-context";
import { trackPageView as trackMetaPageView } from "@/lib/tracking";
import {
  trackPageView as trackGtmPageView,
  trackQuizStepView,
  trackQuizAnswer,
  trackCTAClick,
  trackVideoInteraction,
} from "@/lib/gtm-tracking";
import { NATAL_GUARANTEE_DAYS, NATAL_EVENT_DATE_LABEL } from "@/lib/natal-constants";
import {
  QUIZ_QUESTION_1,
  QUIZ_QUESTION_2,
  QUIZ_TESTIMONIALS,
  getProfileAnalysis,
  type QuizAnswers,
  type QuizQuestion,
  type QuizStepId,
} from "@/lib/natal-quiz-content";

// Cada etapa tem URL própria (em vez de só um estado interno) pra que o
// Pixel do Meta e o GTM registrem PageView de verdade por etapa do funil,
// permitindo remarketing e análise de abandono por URL.
const STEP_PATHS: Record<QuizStepId, string> = {
  intro: "/natal-v2",
  "question-1": "/natal-v2/pergunta-1",
  "question-2": "/natal-v2/pergunta-2",
  profile: "/natal-v2/perfil",
  video: "/natal-v2/video",
  "social-proof": "/natal-v2/depoimentos",
};

const STEP_ORDER: QuizStepId[] = ["intro", "question-1", "question-2", "profile", "video", "social-proof"];

const STEP_PAGE_NAMES: Record<QuizStepId, string> = {
  intro: "Quiz Natal - Abertura",
  "question-1": "Quiz Natal - Pergunta 1",
  "question-2": "Quiz Natal - Pergunta 2",
  profile: "Quiz Natal - Perfil",
  video: "Quiz Natal - Video",
  "social-proof": "Quiz Natal - Depoimentos",
};

const stepFromPath = (pathname: string): QuizStepId => {
  const match = (Object.entries(STEP_PATHS) as [QuizStepId, string][]).find(([, path]) => path === pathname);
  return match ? match[0] : "intro";
};

const STEP_PROGRESS: Record<QuizStepId, number> = {
  intro: 0,
  "question-1": 20,
  "question-2": 40,
  profile: 60,
  video: 80,
  "social-proof": 100,
};

const SELECTION_DELAY_MS = 350;
const ANSWERS_SESSION_KEY = "natal_quiz_answers";

// Cada etapa é uma URL/rota própria (necessário pro Pixel do Meta), então
// as respostas não podem depender só de estado de componente sobrevivendo
// entre navegações — persistimos em sessionStorage como reforço.
const readStoredAnswers = (): QuizAnswers => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(ANSWERS_SESSION_KEY);
    return raw ? (JSON.parse(raw) as QuizAnswers) : {};
  } catch {
    return {};
  }
};

const NatalQuizFunnel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<QuizAnswers>(readStoredAnswers);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const handleCTA = useCTA();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const currentStep = stepFromPath(location.pathname);
  const stepIndex = STEP_ORDER.indexOf(currentStep);
  const progress = STEP_PROGRESS[currentStep] ?? 0;

  useEffect(() => {
    trackMetaPageView();
    trackGtmPageView(STEP_PAGE_NAMES[currentStep]);
    trackQuizStepView(currentStep, stepIndex);
    setSelectedOptionId(null);
    headingRef.current?.focus();
  }, [currentStep, stepIndex]);

  const goTo = (step: QuizStepId) => navigate(STEP_PATHS[step]);

  const answerQuestion = (question: QuizQuestion, optionId: string, optionLabel: string, nextStep: QuizStepId) => {
    setSelectedOptionId(optionId);
    trackQuizAnswer(question.id, optionId, optionLabel);
    setAnswers((prev) => {
      const next = { ...prev, [question.id]: optionId };
      try {
        window.sessionStorage.setItem(ANSWERS_SESSION_KEY, JSON.stringify(next));
      } catch {
        // sessionStorage indisponível (modo privado etc.) — segue só com o state em memória
      }
      return next;
    });
    setTimeout(() => goTo(nextStep), SELECTION_DELAY_MS);
  };

  const handleFinalCTA = () => {
    trackCTAClick("quiz_final_cta", "quiz_video", "GARANTIR MINHA VAGA");
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
        {currentStep === "profile" && "Seu perfil está pronto"}
        {currentStep === "video" && "Assista o vídeo"}
        {currentStep === "social-proof" && "Veja os depoimentos e garanta sua vaga"}
      </div>

      <main key={currentStep} className="flex-1 flex items-center justify-center px-4 py-10 animate-fade-up">
        <div className="w-full max-w-md mx-auto">
          {currentStep === "intro" && (
            <IntroScreen headingRef={headingRef} onStart={() => goTo("question-1")} />
          )}

          {currentStep === "question-1" && (
            <QuestionScreen
              question={QUIZ_QUESTION_1}
              headingRef={headingRef}
              selectedOptionId={selectedOptionId}
              onSelect={(q, id, label) => answerQuestion(q, id, label, "question-2")}
            />
          )}

          {currentStep === "question-2" && (
            <QuestionScreen
              question={QUIZ_QUESTION_2}
              headingRef={headingRef}
              selectedOptionId={selectedOptionId}
              onSelect={(q, id, label) => answerQuestion(q, id, label, "profile")}
            />
          )}

          {currentStep === "profile" && (
            <ProfileScreen headingRef={headingRef} answers={answers} onContinue={() => goTo("video")} />
          )}

          {currentStep === "video" && (
            <VideoScreen headingRef={headingRef} onContinue={() => goTo("social-proof")} />
          )}

          {currentStep === "social-proof" && (
            <SocialProofScreen headingRef={headingRef} onFinalCTA={handleFinalCTA} />
          )}
        </div>
      </main>
    </div>
  );
};

const IntroScreen = ({
  headingRef,
  onStart,
}: {
  headingRef: React.RefObject<HTMLHeadingElement>;
  onStart: () => void;
}) => (
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
      Entregue a obra até o Natal, sem aceitar prazo impossível
    </h1>
    <p className="text-muted-foreground font-medium mb-8">
      Responda algumas perguntas rápidas e veja como a Imersão Cronograma Especial de Natal, ao vivo em{" "}
      {NATAL_EVENT_DATE_LABEL}, pode te ajudar. Vagas limitadas pra essa turma.
    </p>
    <button
      onClick={onStart}
      className="w-full bg-green-600 text-white py-4 text-base font-bold uppercase tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Começar
    </button>
    <p className="text-sm text-muted-foreground font-medium mt-4">
      Ao vivo · {NATAL_EVENT_DATE_LABEL}
    </p>
  </div>
);

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

const ProfileScreen = ({
  headingRef,
  answers,
  onContinue,
}: {
  headingRef: React.RefObject<HTMLHeadingElement>;
  answers: QuizAnswers;
  onContinue: () => void;
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => setIsAnalyzing(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (isAnalyzing) {
    return (
      <div className="text-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin motion-reduce:animate-none mx-auto mb-6" />
        <h1 ref={headingRef} tabIndex={-1} className="text-xl font-bold uppercase tracking-tight outline-none">
          Montando seu perfil...
        </h1>
      </div>
    );
  }

  const analysis = getProfileAnalysis(answers);

  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3 text-center">Seu perfil</p>
      <h1 ref={headingRef} tabIndex={-1} className="text-xl md:text-2xl font-bold mb-4 outline-none leading-snug text-center">
        {analysis.headline}
      </h1>
      <p className="text-muted-foreground font-medium leading-relaxed mb-8 text-center">{analysis.body}</p>
      <button
        onClick={onContinue}
        className="w-full bg-green-600 text-white py-4 text-base font-bold uppercase tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Continuar
      </button>
      <p className="text-sm text-muted-foreground font-medium mt-4 text-center">
        Veja como a Ingrid e a Fernanda vão te mostrar isso, ao vivo
      </p>
    </div>
  );
};

const VideoScreen = ({
  headingRef,
  onContinue,
}: {
  headingRef: React.RefObject<HTMLHeadingElement>;
  onContinue: () => void;
}) => (
  <div className="text-center">
    <h1 ref={headingRef} tabIndex={-1} className="text-xl md:text-2xl font-bold uppercase mb-3 outline-none leading-snug">
      Assista o vídeo e veja como a Imersão vai te ajudar
    </h1>
    <p className="text-muted-foreground font-medium mb-6">
      Esse vídeo de apenas 30 segundos, direto e reto, te mostra como a Imersão Cronograma Especial de Natal vai te
      ajudar a entregar sua obra até o Natal.
    </p>

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
      onClick={onContinue}
      className="w-full bg-green-600 text-white py-4 text-base font-bold uppercase tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Continuar
    </button>
  </div>
);

const SocialProofScreen = ({
  headingRef,
  onFinalCTA,
}: {
  headingRef: React.RefObject<HTMLHeadingElement>;
  onFinalCTA: () => void;
}) => (
  <div>
    <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3 text-center">
      Quem já participou, aprovou
    </p>
    <h1 ref={headingRef} tabIndex={-1} className="text-xl md:text-2xl font-bold mb-6 outline-none leading-snug text-center">
      Arquitetas, engenheiras e designers de interiores que já aplicaram o método
    </h1>

    <div className="space-y-4 mb-8">
      {QUIZ_TESTIMONIALS.map((testimonial) => (
        <div key={testimonial.handle} className="border-2 border-border bg-card p-4">
          <Quote className="w-5 h-5 text-primary mb-2" />
          <p className="text-sm font-medium leading-relaxed mb-3">{testimonial.text}</p>
          <p className="text-sm font-bold">
            {testimonial.name} <span className="font-normal text-muted-foreground">{testimonial.handle}</span>
          </p>
        </div>
      ))}
    </div>

    <button
      onClick={onFinalCTA}
      className="w-full bg-green-600 text-white py-4 flex items-center justify-center gap-2 text-base sm:text-lg font-bold tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 uppercase active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      Garantir minha vaga
    </button>
    <p className="text-sm font-bold uppercase tracking-wide text-[hsl(var(--cta))] mt-3 text-center">
      Vagas limitadas pra essa turma
    </p>

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

export default NatalQuizFunnel;
