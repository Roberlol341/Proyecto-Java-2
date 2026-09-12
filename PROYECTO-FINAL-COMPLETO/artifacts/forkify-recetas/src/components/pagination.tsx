import { ArrowLeft, ArrowRight } from 'lucide-react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav className="mt-7 flex items-center justify-between border-t border-[hsl(var(--border))] pt-5" aria-label="Paginación de resultados">
      <button
        type="button"
        data-testid="button-previous-page"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="focus-ring flex items-center gap-2 rounded-full px-1 py-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))] disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Anterior
      </button>
      <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]" data-testid="text-page-status">
        Página <strong className="text-[hsl(var(--foreground))]">{page}</strong> de {totalPages}
      </span>
      <button
        type="button"
        data-testid="button-next-page"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="focus-ring flex items-center gap-2 rounded-full px-1 py-2 text-xs font-semibold text-[hsl(var(--primary))] transition-colors hover:text-[hsl(162_40%_29%)] disabled:cursor-not-allowed disabled:opacity-35"
      >
        Siguiente <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}