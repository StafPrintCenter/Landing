import { SlidersHorizontal, ArrowDownUp, ArrowUpDown } from "lucide-react";
import { SEARCH_TYPES, type SearchType } from "@/data/categories";

// Source unique pour les critères de tri des résultats de recherche
export const SEARCH_SORT_OPTIONS = ["relevance", "alpha", "category", "type"] as const;
export type SearchSortOption = (typeof SEARCH_SORT_OPTIONS)[number];

export const SEARCH_SORT_DIRECTIONS = ["asc", "desc"] as const;
export type SearchSortDirection = (typeof SEARCH_SORT_DIRECTIONS)[number];

const SORT_OPTION_LABELS: Record<SearchSortOption, string> = {
  relevance: "Pertinence",
  alpha: "Titre",
  category: "Catégorie",
  type: "Type",
};

const DIRECTION_LABELS: Record<SearchSortOption, { asc: string; desc: string }> = {
  relevance: { asc: "Pertinence", desc: "Pertinence" },
  alpha: { asc: "Titre : A → Z", desc: "Titre : Z → A" },
  category: { asc: "Catégorie : A → Z", desc: "Catégorie : Z → A" },
  type: { asc: "Type : A → Z", desc: "Type : Z → A" },
};

interface SearchFiltersProps {
  type: SearchType | "all";
  sortBy: SearchSortOption;
  sortDir: SearchSortDirection;
  category: string;
  categories: string[];
  activeFilterCount: number;
  onTypeChange: (t: SearchType | "all") => void;
  onSortChange: (s: SearchSortOption) => void;
  onSortDirChange: (d: SearchSortDirection) => void;
  onCategoryChange: (c: string) => void;
  onReset: () => void;
}

export function SearchFilters({
  type,
  sortBy,
  sortDir,
  category,
  categories,
  activeFilterCount,
  onTypeChange,
  onSortChange,
  onSortDirChange,
  onCategoryChange,
  onReset,
}: SearchFiltersProps) {
  const isSortable = sortBy !== "relevance";
  const directionLabel = DIRECTION_LABELS[sortBy][sortDir];

  const toggleDirection = () => {
    if (!isSortable) return;
    onSortDirChange(sortDir === "asc" ? "desc" : "asc");
  };

  return (
    <div
      className="max-h-[22rem] space-y-8 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/50 [&::-webkit-scrollbar-track]:bg-transparent"
      style={{ scrollbarWidth: "thin" }}
    >
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type</h2>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as SearchType | "all")}
          className="mt-3 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium focus:border-primary focus:outline-none"
        >
          {SEARCH_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Trier par</h2>
        <div className="mt-3 flex items-center gap-2">
          <SlidersHorizontal size={16} className="shrink-0 text-muted-foreground" />

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SearchSortOption)}
            className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium focus:border-primary focus:outline-none"
          >
            {SEARCH_SORT_OPTIONS.map((s) => (
              <option key={s} value={s}>{SORT_OPTION_LABELS[s]}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={toggleDirection}
            disabled={!isSortable}
            title={isSortable ? `Inverser : ${directionLabel}` : "Choisissez un critère de tri"}
            aria-label="Inverser l'ordre de tri"
            className={[
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200",
              isSortable
                ? "cursor-pointer border-border bg-card text-foreground hover:border-primary hover:text-primary"
                : "cursor-not-allowed border-border/50 bg-muted text-muted-foreground/40",
            ].join(" ")}
          >
            {sortDir === "asc" ? <ArrowDownUp size={16} /> : <ArrowUpDown size={16} />}
          </button>
        </div>
      </div>

      {categories.length > 1 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Catégorie</h2>
          <div className="mt-3 flex flex-col gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => onCategoryChange(c)}
                className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${category === c
                  ? "bg-accent/15 text-foreground ring-1 ring-inset ring-accent/40"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilterCount > 0 && (
        <button
          onClick={onReset}
          className="cursor-pointer text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}