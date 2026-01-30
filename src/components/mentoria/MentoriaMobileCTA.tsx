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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-[#f5f0e8]/95 backdrop-blur-sm border-t border-foreground/10 p-4 shadow-lg">
        <Button
          onClick={onClick}
          size="lg"
          className="w-full bg-[#9ACD32] hover:bg-[#8BC52A] text-foreground font-bold text-lg py-6 uppercase"
        >
          Quero Entrar na Mentoria
          <ArrowUp className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
