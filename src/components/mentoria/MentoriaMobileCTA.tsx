import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MentoriaMobileCTAProps {
  onClick: () => void;
}

export default function MentoriaMobileCTA({ onClick }: MentoriaMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 transform",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
        <Button
          onClick={onClick}
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg py-6 animate-pulse-subtle"
        >
          Quero Entrar na Mentoria
          <ArrowUp className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
