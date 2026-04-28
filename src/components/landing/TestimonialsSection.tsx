import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const testimonials = [
  {
    handle: "luraarquitetura",
    name: "Lura Arquitetura",
    initials: "LA",
    ringA: "#833ab4",
    ringB: "#fd1d1d",
    avatarA: "#833ab4",
    avatarB: "#c13584",
    likes: 127,
    timeAgo: "3 sem.",
    text: "Essa imersão deixa muito claro que projeto e obra não podem caminhar separados. Cronograma, processos e tomada de decisão fazem parte da materialização do projeto.",
  },
  {
    handle: "yasminbarros.arq",
    name: "Yasmin Barros",
    initials: "YB",
    ringA: "#f09433",
    ringB: "#e6683c",
    avatarA: "#f9a825",
    avatarB: "#f06292",
    likes: 89,
    timeAgo: "3 sem.",
    text: "Quanto conteúdo váliosooooo! O principal insight: não existe projeto executivo até a obra se iniciar. Saiu um peso das minhas costas sobre alterações que acontecem após a demolição.",
  },
  {
    handle: "saraferreirah",
    name: "Sara Ferreira",
    initials: "SF",
    ringA: "#fd1d1d",
    ringB: "#833ab4",
    avatarA: "#e91e63",
    avatarB: "#ff5722",
    likes: 203,
    timeAgo: "3 sem.",
    text: "Meu insight foi perceber o quanto é importante realizar o cronograma para evitar problemas futuros. Todos ganham: cliente, fornecedores e arquiteto! Só sabe detalhar projeto quem sabe como é executado na obra.",
  },
  {
    handle: "ervadoce.arq",
    name: "Erva Doce Arq",
    initials: "EA",
    ringA: "#11998e",
    ringB: "#38ef7d",
    avatarA: "#43a047",
    avatarB: "#1de9b6",
    likes: 156,
    timeAgo: "3 sem.",
    text: "Sacada do dia: organizar o cronograma de forma semanal para ter mais flexibilidade quando algo não sair como o planejado. É importante mapear também os dias de compras de materiais. Imersão excelente, meninas!",
  },
  {
    handle: "studioantun.3d",
    name: "Studio Antun 3D",
    initials: "SA",
    ringA: "#4776E6",
    ringB: "#8E54E9",
    avatarA: "#1565c0",
    avatarB: "#7b1fa2",
    likes: 94,
    timeAgo: "3 sem.",
    text: "O maior aprendizado foi entender os processos e que sem isso você não consegue ser assertivo na resolução dos problemas quando eles aparecerem. Adorei demaaaais!",
  },
  {
    handle: "eliizabete_bruuna",
    name: "Eliizabete Bruuna",
    initials: "EB",
    ringA: "#f093fb",
    ringB: "#f5576c",
    avatarA: "#e91e63",
    avatarB: "#9c27b0",
    likes: 312,
    timeAgo: "3 sem.",
    text: "Melhor forma de iniciar 2026!! Tá muito pago.",
  },
  {
    handle: "diegocramosoficial",
    name: "Diego C. Ramos",
    initials: "DC",
    ringA: "#2193b0",
    ringB: "#6dd5ed",
    avatarA: "#0288d1",
    avatarB: "#26c6da",
    likes: 178,
    timeAgo: "3 sem.",
    text: "Conhecimento que vai agregar demais. Imersão surreal. Tá pago.",
  },
  {
    handle: "danielajaquelinemilesi",
    name: "Daniela J. Milesi",
    initials: "DJ",
    ringA: "#ff6a00",
    ringB: "#ee0979",
    avatarA: "#ff5722",
    avatarB: "#e91e63",
    likes: 241,
    timeAgo: "3 sem.",
    text: "Maravilha!!! Eu amei.",
  },
];

const AUTOPLAY_DELAY = 4500;

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FBBF24">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [likedCards, setLikedCards] = useState<Set<number>>(new Set());
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, AUTOPLAY_DELAY);
  }, [emblaApi, stopAutoplay]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    startAutoplay();
  }, [emblaApi, startAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    startAutoplay();
  }, [emblaApi, startAutoplay]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      startAutoplay();
    },
    [emblaApi, startAutoplay]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const toggleLike = (idx: number) => {
    setLikedCards((prev: Set<number>) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#fafafa] overflow-hidden reveal">
      {/* Shared SVG gradient for Instagram icon */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="40%" stopColor="#dc2743" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-bold text-[9px] uppercase tracking-[0.35em] block mb-3">
            QUEM JÁ PARTICIPOU, APROVOU
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight leading-tight text-foreground">
            O que dizem as arquitetas{" "}
            <span className="text-primary">da edição anterior</span>
          </h2>
        </div>

        {/* Embla viewport */}
        <div
          className="overflow-hidden"
          ref={emblaRef}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className="flex items-stretch">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-none w-[85vw] sm:w-[45vw] lg:w-1/3 px-2 md:px-3 py-2"
              >
                {/* Instagram Comment Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">

                  {/* Card Header */}
                  <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar with Instagram gradient ring */}
                      <div
                        className="w-11 h-11 rounded-full p-[2.5px] flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${t.ringA}, ${t.ringB})` }}
                      >
                        <div className="w-full h-full rounded-full bg-white p-[2px]">
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${t.avatarA}, ${t.avatarB})` }}
                          >
                            <span className="text-white font-bold text-[10px] tracking-wide select-none">
                              {t.initials}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Username + Instagram label */}
                      <div>
                        <p className="text-[13px] font-semibold text-gray-900 leading-tight">
                          @{t.handle}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="url(#ig-grad)">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          <span className="text-[10px] text-gray-400">Instagram</span>
                        </div>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  </div>

                  {/* Stars */}
                  <div className="px-4 pb-2.5 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>

                  {/* Comment Text */}
                  <div className="px-4 pb-3 flex-1">
                    <p className="text-[13px] text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">@{t.handle} </span>
                      {t.text}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="mx-4 border-t border-gray-100" />

                  {/* Card Footer */}
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(idx)}
                        className="flex items-center gap-1.5 group"
                        aria-label="Curtir"
                      >
                        <Heart
                          className={`w-4 h-4 transition-all duration-200 ${
                            likedCards.has(idx)
                              ? "fill-red-500 text-red-500 scale-110"
                              : "text-gray-400 group-hover:text-red-400"
                          }`}
                        />
                        <span className={`text-[11px] font-medium transition-colors ${
                          likedCards.has(idx) ? "text-red-500" : "text-gray-500"
                        }`}>
                          {likedCards.has(idx) ? t.likes + 1 : t.likes}
                        </span>
                      </button>
                      <span className="text-[11px] text-gray-400 cursor-default">Responder</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{t.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="w-9 h-9 border border-foreground/20 hover:border-primary text-foreground/40 hover:text-primary flex items-center justify-center transition-all duration-200 active:scale-95 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_: number, idx: number) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                aria-label={`Ir para depoimento ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === selectedIndex
                    ? "w-5 h-[6px] bg-primary"
                    : "w-[6px] h-[6px] bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            aria-label="Próximo"
            className="w-9 h-9 border border-foreground/20 hover:border-primary text-foreground/40 hover:text-primary flex items-center justify-center transition-all duration-200 active:scale-95 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Social proof footer */}
        <p className="text-center mt-8 text-[9px] font-bold text-foreground/30 uppercase tracking-[0.3em]">
          Quase 500 arquitetas na edição anterior • Avaliação 4.9/5
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;