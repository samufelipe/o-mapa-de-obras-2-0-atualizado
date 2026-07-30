import { ArrowRight, Check, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCTA } from "@/lib/cta-context";
import { trackCTAClick } from "@/lib/gtm-tracking";
import { cn } from "@/lib/utils";

type PricingFeature = string | { label: string; price?: string };

interface PricingCardObraProntaProps {
  variant?: "light" | "dark";
  eyebrow?: string;
  badgeLabel?: string;
  title: string;
  description?: string;
  priceOriginal: string;
  priceFinal: string;
  features: PricingFeature[];
  ctaLabel: string;
  ctaTrackingName: string;
  ctaTrackingLocation: string;
  className?: string;
}

const PricingCardObraPronta = ({
  variant = "light",
  eyebrow,
  badgeLabel,
  title,
  description,
  priceOriginal,
  priceFinal,
  features,
  ctaLabel,
  ctaTrackingName,
  ctaTrackingLocation,
  className,
}: PricingCardObraProntaProps) => {
  const handleCTA = useCTA();
  const isDark = variant === "dark";

  const onCTAClick = () => {
    trackCTAClick(ctaTrackingName, ctaTrackingLocation, ctaLabel);
    handleCTA();
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 p-6 sm:p-8 shadow-premium",
        isDark
          ? "bg-foreground border-primary shadow-premium-gold"
          : "bg-card border-foreground",
        className
      )}
    >
      {badgeLabel && (
        <Badge
          className={cn(
            "absolute -top-3 right-4 sm:right-6 rounded-none border-transparent px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap",
            isDark ? "bg-primary text-primary-foreground" : "bg-foreground text-primary"
          )}
        >
          {badgeLabel}
        </Badge>
      )}

      <div className="space-y-1 mb-6">
        {eyebrow && (
          <span className={cn("block text-xs font-bold uppercase tracking-widest", isDark ? "text-primary" : "text-muted-foreground")}>
            {eyebrow}
          </span>
        )}
        <h3 className={cn("text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight", isDark ? "text-background" : "text-foreground")}>
          {title}
        </h3>
        {description && (
          <p className={cn("text-sm sm:text-base font-medium leading-relaxed", isDark ? "text-background/80" : "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>

      <div className="mb-6">
        <span className={cn("block text-xs sm:text-sm font-medium mb-1", isDark ? "text-background/70" : "text-muted-foreground")}>
          Valor total se comprado separadamente:{" "}
          <span className="line-through">{priceOriginal}</span>
        </span>
        <span className={cn("block text-3xl sm:text-4xl font-bold tracking-tighter animate-pulse-slow", isDark ? "text-background" : "text-foreground")}>
          {priceFinal}
        </span>
      </div>

      <Separator className={isDark ? "bg-background/20" : "bg-border"} />

      <ul className="space-y-3.5 my-6">
        {features.map((feature, idx) => {
          const isObject = typeof feature !== "string";
          const label = isObject ? feature.label : feature;
          const price = isObject ? feature.price : undefined;
          return (
            <li key={idx} className="flex items-start gap-2.5">
              <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
              <div className={cn("flex flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-base font-medium leading-snug", isDark ? "text-background/95" : "text-foreground")}>
                <span>{label}</span>
                {price && (
                  <span className={cn("font-bold shrink-0", price === "Incluso" ? "text-primary" : "")}>
                    {price}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <button
        onClick={onCTAClick}
        className="w-full bg-green-600 text-white py-4 flex items-center justify-center gap-2 text-sm sm:text-base font-bold tracking-widest hover:bg-green-700 transition-all duration-300 border-2 border-green-600 shadow-premium hover:shadow-premium-gold hover:-translate-y-1 uppercase group"
      >
        {ctaLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
      </button>

      <p className={cn("mt-4 text-center text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-1", isDark ? "text-background/70" : "text-muted-foreground")}>
        <Lock className="w-3 h-3 flex-shrink-0" /> Pagamento 100% Seguro via Hotmart
      </p>
    </div>
  );
};

export default PricingCardObraPronta;
