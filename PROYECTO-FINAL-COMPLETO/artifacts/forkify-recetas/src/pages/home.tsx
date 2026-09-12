import { ChefHat, ChevronRight, CircleDot, Search, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useRecipe, useRecipeSearch } from '@/hooks/use-forkify';
import { Pagination } from '@/components/pagination';
import { RecipeCard } from '@/components/recipe-card';
import { RecipeDetail } from '@/components/recipe-detail';
import { ResultsSkeleton, StateMessage } from '@/components/loading-states';
import { SearchBar } from '@/components/search-bar';

const RESULTS_PER_PAGE = 10;

function readHash() {
  return typeof window === 'undefined' ? null : window.location.hash.replace(/^#/, '') || null;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(readHash);
  const [draftQuery, setDraftQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [page, setPage] = useState(1);
  const { data: results, isLoading: isSearching, error: searchError, search, reset } = useRecipeSearch();
  const { data: recipe, isLoading: isLoadingRecipe, error: recipeError, retry } = useRecipe(selectedId);

  useEffect(() => {
    const onHashChange = () => setSelectedId(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const totalPages = results ? Math.ceil(results.length / RESULTS_PER_PAGE) : 0;
  const visibleResults = useMemo(() => {
    if (!results) return [];
    const start = (page - 1) * RESULTS_PER_PAGE;
    return results.slice(start, start + RESULTS_PER_PAGE);
  }, [page, results]);

  function selectRecipe(id: string) {
    window.location.hash = id;
    setSelectedId(id);
  }

  function clearSelectedRecipe() {
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
    setSelectedId(null);
  }

  function handleSearch(query: string) {
    const cleanQuery = query.trim();
    setDraftQuery(cleanQuery);
    setActiveQuery(cleanQuery);
    setPage(1);
    clearSelectedRecipe();
    void search(query);
  }

  function handleClearSearch() {
    setDraftQuery('');
    setActiveQuery('');
    setPage(1);
    clearSelectedRecipe();
    reset();
  }

  return (
    <div className="grain min-h-[100dvh] bg-[hsl(var(--background))]">
      <header className="relative overflow-hidden bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]">
        <div className="pointer-events-none absolute -right-20 -top-32 size-[430px] rounded-full border border-[hsl(var(--sidebar-primary)/.16)]" />
        <div className="pointer-events-none absolute right-24 top-12 size-3 rounded-full bg-[hsl(var(--sidebar-primary)/.65)]" />
        <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <button type="button" data-testid="button-home-logo" onClick={handleClearSearch} className="focus-ring group flex items-center gap-2.5 rounded-xl text-left">
              <span className="flex size-10 items-center justify-center rounded-[13px] bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] transition-transform group-hover:rotate-[-7deg]">
                <ChefHat className="size-5" strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold tracking-[-.02em]">Forkify</span>
                <span className="block text-[10px] uppercase tracking-[.2em] text-[hsl(var(--sidebar-foreground)/.62)]">Recetas</span>
              </span>
            </button>
            <div className="hidden items-center gap-2 text-xs text-[hsl(var(--sidebar-foreground)/.72)] sm:flex">
              <Sparkles className="size-3.5 text-[hsl(var(--sidebar-primary))]" aria-hidden="true" />
              <span>Una idea rica está cerca</span>
            </div>
          </div>
          <div className="mx-auto mt-12 flex max-w-[830px] flex-col items-center text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.26em] text-[hsl(var(--sidebar-primary))]">Sabores de México</p>
            <h1 className="recipe-display max-w-[690px] text-4xl leading-[.98] tracking-[-.03em] sm:text-6xl">¿Qué se te antoja preparar hoy?</h1>
            <p className="mt-4 max-w-[490px] text-sm leading-6 text-[hsl(var(--sidebar-foreground)/.7)]">Encuentra el platillo mexicano que estabas buscando, desde tacos hasta enchiladas.</p>
            <div className="mt-7 w-full">
              <SearchBar value={draftQuery} onValueChange={setDraftQuery} isLoading={isSearching} onSearch={handleSearch} onClear={handleClearSearch} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[minmax(360px,480px)_1fr]">
        <section className="border-b border-[hsl(var(--border))] px-5 py-8 sm:px-8 lg:min-h-[680px] lg:border-b-0 lg:border-r lg:px-10 lg:py-10" aria-label="Resultados de búsqueda">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-[hsl(var(--accent))]">
                <CircleDot className="size-3 fill-current" aria-hidden="true" />
                {activeQuery ? 'Resultados encontrados' : 'Descubre algo nuevo'}
              </div>
              <h2 className="recipe-display mt-1 text-3xl text-[hsl(var(--foreground))]" data-testid="text-results-heading">
                {activeQuery ? `Para «${activeQuery}»` : 'Tu recetario mexicano empieza aquí'}
              </h2>
            </div>
            {results && <span className="shrink-0 rounded-full bg-[hsl(var(--secondary))] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))]" data-testid="text-results-count">{results.length} recetas</span>}
          </div>

          {isSearching && <ResultsSkeleton />}
          {!isSearching && searchError && <StateMessage title="La cocina está en pausa" description={searchError} actionLabel="Reintentar búsqueda" onAction={() => void search(activeQuery)} tone="error" />}
          {!isSearching && !searchError && results?.length === 0 && <StateMessage title="No salió nada del horno" description="Prueba con otro ingrediente o con el nombre de un plato más sencillo." actionLabel="Nueva búsqueda" onAction={handleClearSearch} />}
          {!isSearching && !searchError && !results && (
            <div className="rounded-[26px] bg-[hsl(var(--card)/.55)] px-6 py-8">
              <Search className="mb-4 size-6 text-[hsl(var(--accent))]" aria-hidden="true" />
              <h3 className="recipe-display text-2xl">Empieza por un antojo</h3>
              <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Escribe arriba y descubre recetas mexicanas listas para llevar a tu mesa.</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {['tacos', 'enchiladas', 'guacamole'].map((suggestion) => (
                  <button type="button" key={suggestion} data-testid={`button-suggestion-${suggestion}`} onClick={() => handleSearch(suggestion)} className="focus-ring rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1.5 text-xs font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--primary))]">
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!isSearching && !searchError && visibleResults.length > 0 && (
            <>
              <div className="space-y-3">
                {visibleResults.map((result, index) => (
                  <div key={result.id} className="animate-rise-in" style={{ animationDelay: `${Math.min(index, 5) * 55}ms` }}>
                    <RecipeCard recipe={result} isSelected={selectedId === result.id} onSelect={selectRecipe} />
                  </div>
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </section>

        <section className="bg-[hsl(var(--background))] px-5 py-8 sm:px-8 lg:px-14 lg:py-10" aria-label="Detalle de receta">
          <RecipeDetail recipe={recipe} isLoading={isLoadingRecipe} error={recipeError} onBack={clearSelectedRecipe} onRetry={retry} />
        </section>
      </main>
      <footer className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-[hsl(var(--border))] px-5 py-6 text-xs text-[hsl(var(--muted-foreground))] sm:px-8 lg:px-12">
        <span>Forkify Recetas</span>
        <span className="flex items-center gap-1">Hecho con sabor mexicano <ChevronRight className="size-3" aria-hidden="true" /></span>
      </footer>
    </div>
  );
}