import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Instagram, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    handle: "@luraarquitetura",
    text: "Essa imersão deixa muito claro que projeto e obra não podem caminhar separados. Cronograma, processos e tomada de decisão fazem parte da materialização do projeto.",
  },
  {
    handle: "@yasminbarros.arq",
    text: "Quanto conteúdo váliosooooo! O principal insight: não existe projeto executivo até a obra se iniciar. Saiu um peso das minhas costas sobre alterações que acontecem após a demolição.",
  },
  {
    handle: "@saraferreirah",
    text: "Meu insight foi perceber o quanto é importante realizar o cronograma para evitar problemas futuros. Todos ganham: cliente, fornecedores e arquiteto! Só sabe detalhar projeto quem sabe como é executado na obra.",
  },
  {
    handle: "@ervadoce.arq",
    text: "Sacada do dia: organizar o cronograma de forma semanal para ter mais flexibilidade quando algo não sair como o planejado. É importante mapear também os dias de compras de materiais. Imersão excelente, meninas!",
  },
  {
    handle: "@studioantun.3d",
    text: "O maior aprendizado foi entender os processos e que sem isso você não consegue ser assertivo na resolução dos problemas quando eles aparecerem. Adorei demaaaais!",
  },
  {
    handle: "@eliizabete_bruuna",
    text: "Melhor forma de iniciar 2026!! Tá muito pago.",
  },
  {
    handle: "@diegocramosoficial",
    text: "Conhecimento que vai agregar demais. Imersão surreal. Tá pago.",
  },
  {
    handle: "@danielajaquelinemilesi",
    text: "Maravilha!!! Eu amei.",
  },
];

const AUTOPLAY_DELAY = 4500;

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
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

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white overflow-hidden reveal">
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
          <div className="flex">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex-none w-full md:w-1/2 lg:w-1/3 px-3"
              >
                <div className="border border-foreground/10 hover:border-primary/60 bg-white hover:shadow-md transition-all duration-300 p-6 h-full flex flex-col gap-4 group shadow-sm">

                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-foreground/70 font-medium leading-relaxed flex-1 group-hover:text-foreground/90 transition-colors duration-300">
                    "{t.text}"
                  </p>

                  {/* Instagram handle */}
                  <div className="flex items-center gap-2.5 pt-3 border-t border-foreground/10">
                    <div className="w-7 h-7 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-primary font-bold text-[10px] uppercase tracking-[0.15em]">
                      {t.handle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="w-9 h-9 border border-foreground/20 hover:border-primary text-foreground/40 hover:text-primary flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_: number, idx: number) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                aria-label={`Ir para depoimento ${idx + 1}`}
                className={`transition-all duration-300 rounded-none ${
                  idx === selectedIndex
                    ? "w-6 h-[3px] bg-primary"
                    : "w-[6px] h-[3px] bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            aria-label="Próximo"
            className="w-9 h-9 border border-foreground/20 hover:border-primary text-foreground/40 hover:text-primary flex items-center justify-center transition-all duration-200 active:scale-95"
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