import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { SearchResult } from '@/services/forkify-api';

type RecipeCardProps = {
  recipe: SearchResult;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export function RecipeCard({ recipe, isSelected, onSelect }: RecipeCardProps) {
  return (
    <button
      type="button"
      data-testid={`card-recipe-${recipe.id}`}
      onClick={() => onSelect(recipe.id)}
      className={`focus-ring group relative flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-[transform,box-shadow,border-color,background-color] duration-300 ${isSelected
        ? 'border-[hsl(var(--accent))] bg-[hsl(var(--secondary))] shadow-[0_8px_20px_hsl(17_70%_65%/0.14)]'
        : 'border-transparent bg-[hsl(var(--card))] hover:-translate-y-0.5 hover:border-[hsl(var(--border))] hover:shadow-[0_9px_22px_hsl(158_17%_18%/0.07)]'}`}
    >
      <div className="relative size-[76px] shrink-0 overflow-hidden rounded-xl bg-[hsl(var(--muted))]">
        <img
          src={recipe.image_url}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
      </div>
      <span className="min-w-0 flex-1 py-1">
        <span className="mb-1 block truncate text-[10px] font-bold uppercase tracking-[.14em] text-[hsl(var(--accent))]">
          {recipe.publisher}
        </span>
        <span className="recipe-display block line-clamp-2 text-[17px] leading-[1.12] text-[hsl(var(--foreground))]">
          {recipe.title}
        </span>
        <span className="mt-2 flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
          <Clock3 className="size-3.5" aria-hidden="true" />
          <span>Platillo mexicano</span>
        </span>
      </span>
      <ArrowUpRight className={`mr-1 size-[17px] shrink-0 transition-transform duration-300 ${isSelected ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--muted-foreground))] group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`} aria-hidden="true" />
    </button>
  );
}