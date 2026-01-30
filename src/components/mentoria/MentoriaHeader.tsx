import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MENTORIA_IMAGES } from "@/lib/mentoria-constants";
import { cn } from "@/lib/utils";

interface MentoriaHeaderProps {
  onCtaClick: () => void;
}

export default function MentoriaHeader({ onCtaClick }: MentoriaHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#f5f0e8]/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4 pointer-events-none"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className={cn(isScrolled ? "opacity-100" : "opacity-0")}>
          <a href="/mentoria" className="flex items-center pointer-events-auto">
            <img
              src={MENTORIA_IMAGES.logo}
              alt="Mentoria Inovando na sua Obra"
              className="h-10 md:h-12 w-auto"
            />
          </a>
        </div>

        <Button
          onClick={onCtaClick}
          className={cn(
            "bg-[#9ACD32] hover:bg-[#8BC52A] text-foreground font-bold transition-all duration-300 pointer-events-auto uppercase",
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          Quero Entrar na Mentoria
        </Button>
      </div>
    </header>
  );
}
