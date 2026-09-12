import { Search, X } from 'lucide-react';
import type { FormEvent } from 'react';

type SearchBarProps = {
  value: string;
  isLoading: boolean;
  onValueChange: (value: string) => void;
  onSearch: (query: string) => void;
  onClear: () => void;
};

export function SearchBar({ value, isLoading, onValueChange, onSearch, onClear }: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.trim()) onSearch(value);
  }

  function handleClear() {
    onValueChange('');
    onClear();
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-[610px]">
      <label htmlFor="recipe-search" className="sr-only">Busca por ingrediente o receta</label>
      <Search className="pointer-events-none absolute left-5 top-1/2 size-[19px] -translate-y-1/2 text-[hsl(var(--muted-foreground))]" aria-hidden="true" />
      <input
        id="recipe-search"
        data-testid="input-recipe-search"
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Ej. tacos, enchiladas, guacamole..."
        className="focus-ring h-[56px] w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] pl-13 pr-32 text-[15px] text-[hsl(var(--foreground))] shadow-[0_7px_18px_hsl(158_17%_18%/0.04)] outline-none transition-shadow placeholder:text-[hsl(var(--muted-foreground))] focus:shadow-[0_10px_28px_hsl(162_40%_35%/0.13)]"
      />
      {value && (
        <button
          type="button"
          data-testid="button-clear-search"
          onClick={handleClear}
          className="focus-ring absolute right-[92px] top-1/2 -translate-y-1/2 rounded-full p-2 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
          aria-label="Limpiar búsqueda"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
      <button
        type="submit"
        data-testid="button-submit-search"
        disabled={isLoading || !value.trim()}
        className="focus-ring absolute right-1.5 top-1.5 flex h-[44px] items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition-transform transition-colors hover:bg-[hsl(162_40%_29%)] active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Search className="size-4" aria-hidden="true" />
        <span>{isLoading ? 'Buscando...' : 'Buscar'}</span>
      </button>
    </form>
  );
}