import { ArrowLeft, Clock3, ExternalLink, Flame, UsersRound } from 'lucide-react';
import type { Recipe } from '@/services/forkify-api';
import { DetailSkeleton, StateMessage } from '@/components/loading-states';

type RecipeDetailProps = {
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
  onRetry: () => void;
};

function formatQuantity(quantity: number | null) {
  if (quantity === null || quantity === undefined) return '';
  return Number.isInteger(quantity) ? String(quantity) : String(Number(quantity.toFixed(2)));
}

export function RecipeDetail({ recipe, isLoading, error, onBack, onRetry }: RecipeDetailProps) {
  if (isLoading) return <DetailSkeleton />;
  if (error) {
    return (
      <div className="pt-4">
        <button type="button" data-testid="button-back-from-error" onClick={onBack} className="focus-ring mb-8 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]">
          <ArrowLeft className="size-4" aria-hidden="true" /> Volver a resultados
        </button>
        <StateMessage title="No pudimos abrirla" description={error} actionLabel="Intentar de nuevo" onAction={onRetry} tone="error" />
      </div>
    );
  }
  if (!recipe) {
    return (
      <div className="flex min-h-[560px] flex-col items-center justify-center px-4 text-center">
        <div className="relative mb-8 flex size-36 items-center justify-center rounded-full bg-[hsl(var(--secondary))]">
          <div className="absolute inset-3 rounded-full border border-dashed border-[hsl(var(--accent)/.55)]" />
          <Flame className="size-14 text-[hsl(var(--accent))]" strokeWidth={1.35} aria-hidden="true" />
        </div>
        <span className="mb-3 text-[10px] font-bold uppercase tracking-[.22em] text-[hsl(var(--accent))]">Tu próxima receta</span>
        <h2 className="recipe-display max-w-[390px] text-4xl leading-[1.04] text-[hsl(var(--foreground))]">Elige un antojo para empezar</h2>
        <p className="mt-4 max-w-[350px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Explora los resultados y descubre todos los detalles de cada platillo mexicano.</p>
      </div>
    );
  }

  return (
    <article className="animate-rise-in">
      <button type="button" data-testid="button-back-to-results" onClick={onBack} className="focus-ring mb-6 flex items-center gap-2 text-sm font-semibold text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]">
        <ArrowLeft className="size-4" aria-hidden="true" /> Todos los resultados
      </button>
      <div className="relative overflow-hidden rounded-[28px] bg-[hsl(var(--secondary))] shadow-[0_18px_36px_hsl(158_17%_18%/0.1)]">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="aspect-[16/9] w-full object-cover"
          data-testid={`img-recipe-detail-${recipe.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(158_17%_10%/.72)] via-transparent to-transparent" />
        <span className="absolute bottom-5 left-5 rounded-full bg-[hsl(var(--card)/.88)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))] backdrop-blur-sm">
          {recipe.publisher}
        </span>
      </div>

      <div className="px-1 pt-7">
        <h1 className="recipe-display max-w-[680px] text-4xl leading-[1.02] text-[hsl(var(--foreground))] sm:text-5xl" data-testid={`text-recipe-title-${recipe.id}`}>
          {recipe.title}
        </h1>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[hsl(var(--muted-foreground))]">
          <span className="flex items-center gap-2"><Clock3 className="size-4 text-[hsl(var(--accent))]" aria-hidden="true" /><strong className="font-semibold text-[hsl(var(--foreground))]">{recipe.cooking_time} min</strong> de cocina</span>
          <span className="flex items-center gap-2"><UsersRound className="size-4 text-[hsl(var(--accent))]" aria-hidden="true" /><strong className="font-semibold text-[hsl(var(--foreground))]">{recipe.servings}</strong> porciones</span>
        </div>

        <div className="mt-9 border-t border-[hsl(var(--border))] pt-7">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[.17em] text-[hsl(var(--accent))]">Lo que necesitas</span>
              <h2 className="recipe-display mt-1 text-2xl text-[hsl(var(--foreground))]">Ingredientes</h2>
            </div>
            <span className="rounded-full bg-[hsl(var(--secondary))] px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))]">{recipe.ingredients.length} en total</span>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2" data-testid={`list-ingredients-${recipe.id}`}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${ingredient.description}-${index}`} className="flex items-start gap-3 text-sm leading-5 text-[hsl(var(--foreground))]">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
                <span><strong className="font-semibold">{formatQuantity(ingredient.quantity)} {ingredient.unit}</strong>{ingredient.quantity || ingredient.unit ? ' ' : ''}{ingredient.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={recipe.source_url}
          target="_blank"
          rel="noreferrer"
          data-testid={`link-source-recipe-${recipe.id}`}
          className="focus-ring mt-9 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-0.5 hover:bg-[hsl(162_40%_29%)]"
        >
          Ver preparación completa <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}