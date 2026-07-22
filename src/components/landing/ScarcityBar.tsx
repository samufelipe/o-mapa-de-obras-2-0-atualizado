const ScarcityBar = () => {
  return (
    <div className="mb-4 md:mb-6">
      <span className="inline-block bg-[hsl(var(--cta))] text-background text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
        Vagas se esgotando
      </span>

      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs md:text-sm font-bold uppercase tracking-wide text-foreground">
          Turma Nova
        </span>
        <span className="text-xs md:text-sm font-bold uppercase tracking-wide text-[hsl(var(--cta))]">
          Quase Lotando
        </span>
      </div>

      <div className="h-2.5 md:h-3 w-full bg-secondary rounded-full overflow-hidden">
        <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-primary to-[hsl(var(--cta))]" />
      </div>
    </div>
  );
};

export default ScarcityBar;
