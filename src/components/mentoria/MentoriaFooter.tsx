import { MENTORIA_WHATSAPP } from "@/lib/mentoria-constants";
import { MessageCircle } from "lucide-react";

export default function MentoriaFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-background/70">
              © {currentYear} Cronograma Inteligente. Todos os direitos reservados.
            </p>
            <p className="text-xs text-background/50 mt-1">
              CNPJ: 00.000.000/0001-00
            </p>
          </div>

          <a
            href={MENTORIA_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Suporte via WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
