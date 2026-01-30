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
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/mentoria" className="flex items-center">
          <img
            src={MENTORIA_IMAGES.logo}
            alt="Mentoria Inovando na sua Obra"
            className="h-10 md:h-12 w-auto"
          />
        </a>

        <Button
          onClick={onCtaClick}
          className={cn(
            "hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300",
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          Quero Entrar na Mentoria
        </Button>
      </div>
    </header>
  );
}
