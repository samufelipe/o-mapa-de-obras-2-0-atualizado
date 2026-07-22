import { Flame } from "lucide-react";

const ScarcityBar = () => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Flame className="w-4 h-4 text-[hsl(var(--cta))] flex-shrink-0" />
        <span className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--cta))]">
          Vagas se esgotando
        </span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-primary to-[hsl(var(--cta))]" />
      </div>
    </div>
  );
};

export default ScarcityBar;
