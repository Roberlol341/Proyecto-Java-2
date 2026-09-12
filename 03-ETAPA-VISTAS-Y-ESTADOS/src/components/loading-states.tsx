export function ResultsSkeleton() {
  return (
    <div className="space-y-3" aria-label="Cargando resultados" data-testid="status-loading-results">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 rounded-2xl bg-[hsl(var(--card))] p-3">
          <div className="skeleton-shimmer size-[76px] shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton-shimmer h-2.5 w-1/4 rounded-full" />
            <div className="skeleton-shimmer h-4 w-4/5 rounded-full" />
            <div className="skeleton-shimmer h-3 w-1/3 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Cargando receta" data-testid="status-loading-detail">
      <div className="skeleton-shimmer aspect-[16/9] w-full rounded-[28px]" />
      <div className="space-y-3">
        <div className="skeleton-shimmer h-3 w-1/4 rounded-full" />
        <div className="skeleton-shimmer h-10 w-4/5 rounded-full" />
        <div className="skeleton-shimmer h-4 w-2/5 rounded-full" />
      </div>
      <div className="skeleton-shimmer h-20 w-full rounded-2xl" />
    </div>
  );
}

type StateMessageProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: 'error' | 'empty';
};

export function StateMessage({ title, description, actionLabel, onAction, tone = 'empty' }: StateMessageProps) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[26px] border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card)/.55)] px-6 text-center" data-testid={`status-${tone}`}>
      <div className={`mb-4 flex size-12 items-center justify-center rounded-2xl ${tone === 'error' ? 'bg-[hsl(var(--destructive)/.12)] text-[hsl(var(--destructive))]' : 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]'}`}>
        <span className="text-xl font-semibold" aria-hidden="true">{tone === 'error' ? '!' : '·'}</span>
      </div>
      <h3 className="recipe-display text-2xl text-[hsl(var(--foreground))]">{title}</h3>
      <p className="mt-2 max-w-[330px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">{description}</p>
      {actionLabel && onAction && (
        <button type="button" data-testid={`button-${tone}-action`} onClick={onAction} className="focus-ring mt-5 rounded-full bg-[hsl(var(--primary))] px-4 py-2 text-xs font-semibold text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-0.5 active:translate-y-0">
          {actionLabel}
        </button>
      )}
    </div>
  );
}