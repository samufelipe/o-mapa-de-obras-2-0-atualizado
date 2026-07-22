import { ReactNode } from "react";
import { Facebook, Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCTA } from "@/lib/cta-context";
import { NATAL_EVENT_DATE_LABEL, NATAL_GUARANTEE_DAYS, NATAL_FOOTER_LINKS, NATAL_PRODUCT_NAME } from "@/lib/natal-constants";

interface FooterNatalLink {
  label: string;
  sectionId: string;
}

interface FooterNatalProps {
  links?: FooterNatalLink[];
  productLabel?: string;
  logoNode?: ReactNode;
}

const FooterNatal = ({ links = NATAL_FOOTER_LINKS, productLabel = NATAL_PRODUCT_NAME, logoNode }: FooterNatalProps) => {
  const handleCTA = useCTA();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background text-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand + CTA */}
          <div className="relative">
            {logoNode && <div className="mb-4">{logoNode}</div>}
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-tight leading-tight">
              Sua obra pronta até o Natal começa aqui
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Ao vivo, dia {NATAL_EVENT_DATE_LABEL}. Vagas limitadas para essa turma.
            </p>
            <button
              onClick={handleCTA}
              className="bg-green-600 text-white px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 active:scale-95"
            >
              Garantir minha vaga
            </button>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          </div>

          {/* Navegação */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Navegação</h3>
            <nav className="space-y-2 text-sm">
              {links.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollToSection(link.sectionId)}
                  className="block text-left text-foreground/70 transition-colors hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Sobre a imersão */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Sobre a Imersão</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>Ao vivo · {NATAL_EVENT_DATE_LABEL}</li>
              <li>Garantia de {NATAL_GUARANTEE_DAYS} dias prevista em lei</li>
              <li>Pagamento seguro via Hotmart</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Siga-nos</h3>
            <div className="flex gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full" asChild>
                      <a
                        href="https://www.facebook.com/inovandonasuaobra"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Siga no Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full" asChild>
                      <a
                        href="https://www.instagram.com/inovandonasuaobra/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Siga no Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            {productLabel} © {new Date().getFullYear()} · Todos os direitos reservados
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-primary"
          >
            Voltar ao topo <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterNatal;
