import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useMemo } from "react";

export type PaginationMeta = {
  current_page: number;
  last_page: number;
  from?: number | null;
  to?: number | null;
  total?: number;
  per_page?: number;
};

type Props = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  /** Affiche "X — Y sur Z" quand fourni. */
  meta?: Pick<PaginationMeta, "from" | "to" | "total">;
  className?: string;
};

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPages(current: number, last: number, siblings: number): (number | "…")[] {
  const total = siblings * 2 + 5;
  if (last <= total) return range(1, last);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, last);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < last - 1;

  // Début : Affichage de 3 pages à gauche : [1, 2, 3, "…", last]
  if (!showLeftDots && showRightDots) {
    return [1, 2, 3, "…", last];
  }

  // Fin : Affichage de 3 pages à droite : [1, "…", last - 2, last - 1, last]
  if (showLeftDots && !showRightDots) {
    return [1, "…", last - 2, last - 1, last];
  }

  // Milieu : [1, "…", current - 1, current, current + 1, "…", last]
  return [1, "…", ...range(leftSibling, rightSibling), "…", last];
}

export function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  siblingCount = 1,
  meta,
  className = "",
}: Props) {
  const pages = useMemo(
    () => getPages(currentPage, lastPage, siblingCount),
    [currentPage, lastPage, siblingCount],
  );

  if (lastPage <= 1) return null;

  const go = (p: number) => {
    const next = Math.min(Math.max(1, p), lastPage);
    if (next !== currentPage) onPageChange(next);
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= lastPage;

  const btnBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="Pagination"
      className={`mt-10 flex flex-col items-center justify-between gap-4 md:flex-row ${className}`}
    >
      {meta && typeof meta.total === "number" ? (
        <p className="text-sm text-muted-foreground">
          {meta.from ?? 0} à {meta.to ?? 0} sur {meta.total}
        </p>
      ) : (
        <span className="hidden md:block" />
      )}

      <ul className="flex flex-wrap items-center gap-1.5">
        <li>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={isFirst}
            aria-label="Première page"
            title="Première page"
            className={`${btnBase} border-border bg-card hover:border-primary`}
          >
            <ChevronsLeft size={16} />
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => go(currentPage - 1)}
            disabled={isFirst}
            aria-label="Page précédente"
            title="Page précédente"
            className={`${btnBase} border-border bg-card hover:border-primary`}
          >
            <ChevronLeft size={16} />
          </button>
        </li>

        {pages.map((p, i) =>
          p === "…" ? (
            <li key={`dots-${i}`} className="px-2 text-sm text-muted-foreground">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => go(p)}
                aria-current={p === currentPage ? "page" : undefined}
                aria-label={`Page ${p}`}
                title={`Aller à la page ${p}`}
                className={`${btnBase} ${p === currentPage
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary"
                  }`}
              >
                {p}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => go(currentPage + 1)}
            disabled={isLast}
            aria-label="Page suivante"
            title="Page suivante"
            className={`${btnBase} border-border bg-card hover:border-primary`}
          >
            <ChevronRight size={16} />
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => go(lastPage)}
            disabled={isLast}
            aria-label="Dernière page"
            title="Dernière page"
            className={`${btnBase} border-border bg-card hover:border-primary`}
          >
            <ChevronsRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

/** Utilitaire client-side pour paginer un tableau et produire un `meta` similaire à l'API. */
export function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const last_page = Math.max(1, Math.ceil(total / perPage));
  const current_page = Math.min(Math.max(1, page), last_page);
  const start = (current_page - 1) * perPage;
  const end = start + perPage;
  const data = items.slice(start, end);
  return {
    data,
    meta: {
      current_page,
      last_page,
      per_page: perPage,
      total,
      from: total === 0 ? 0 : start + 1,
      to: Math.min(end, total),
    } satisfies PaginationMeta,
  };
}