import { Button } from "@/components/ui/button";
import { MENTORIA_VIDEO_TESTIMONIALS } from "@/lib/mentoria-constants";
import { Play } from "lucide-react";

interface MentoriaTestimonialsProps {
  onCtaClick: () => void;
}

export default function MentoriaTestimonials({ onCtaClick }: MentoriaTestimonialsProps) {
  return (
    <section className="py-16 md:py-20 bg-[#5D4037]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-12 animate-fade-up">
          Veja o que dizem <span className="italic">nossas alunas:</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {MENTORIA_VIDEO_TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden bg-foreground/20 aspect-[9/16] animate-fade-up group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Placeholder for video thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 to-foreground/80" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-foreground ml-1" />
                </div>
              </div>

              {/* Name and role */}
              <div className="absolute top-4 left-4 right-4 text-white">
                <p className="text-lg font-bold text-primary">{testimonial.name}</p>
                <p className="text-xs text-white/80">{testimonial.role}</p>
              </div>

              {/* Quote */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm italic">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up">
          <Button
            onClick={onCtaClick}
            size="lg"
            className="bg-[#9ACD32] hover:bg-[#8BC52A] text-foreground font-bold text-base px-12 py-6 uppercase"
          >
            Quero entrar na mentoria
          </Button>
        </div>
      </div>
    </section>
  );
}
