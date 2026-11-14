import { ArrowDownUp, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import type { ResourceCategory } from "@/data/resources";

export const RESOURCE_CATEGORIES = ["Tout", "Gabarit", "Guide", "Outil"] as const;
export type ResourceCategoryFilter = (typeof RESOURCE_CATEGORIES)[number];
export const RESOURCE_PRICE_FILTERS = ["all", "free", "paid"] as const;
export type ResourcePriceFilter = (typeof RESOURCE_PRICE_FILTERS)[number];
export const RESOURCE_SORT_OPTIONS = ["default", "alpha", "downloads", "views"] as const;
export type ResourceSortOption = (typeof RESOURCE_SORT_OPTIONS)[number];
export const RESOURCE_SORT_DIRECTIONS = ["asc", "desc"] as const;
export type ResourceSortDirection = (typeof RESOURCE_SORT_DIRECTIONS)[number];

const PRICE_FILTER_LABELS: Record<ResourcePriceFilter, string> = {
  all: "Toutes",
  free: "Gratuites",
  paid: "Payantes",
};

const SORT_LABELS: Record<ResourceSortOption, string> = {
  default: "Par défaut",
  alpha: "Ordre alphabétique",
  downloads: "Téléchargements",
  views: "Nombre de vues",
};

interface ResourceFiltersProps {
  category: ResourceCategoryFilter;
  priceFilter: ResourcePriceFilter;
  sortBy: ResourceSortOption;
  sortDir: ResourceSortDirection;
  onCategoryChange: (category: ResourceCategory | "Tout") => void;
  onPriceFilterChange: (filter: ResourcePriceFilter) => void;
  onSortChange: (sort: ResourceSortOption) => void;
  onSortDirChange: (direction: ResourceSortDirection) => void;
}

export function ResourceHomeFilters({
  category,
  priceFilter,
  sortBy,
  sortDir,
  onCategoryChange,
  onPriceFilterChange,
  onSortChange,
  onSortDirChange,
}: ResourceFiltersProps) {
  const isSortable = sortBy !== "default";

  return (
    <div className="mt-8 border-b border-border/60 pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {RESOURCE_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => onCategoryChange(item)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card hover:border-primary"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-border bg-card p-1" aria-label="Filtrer par tarif">
            {RESOURCE_PRICE_FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={priceFilter === item}
                onClick={() => onPriceFilterChange(item)}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  priceFilter === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {PRICE_FILTER_LABELS[item]}
              </button>
            ))}
          </div>
          <SlidersHorizontal size={16} className="ml-1 shrink-0 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as ResourceSortOption)}
            aria-label="Trier les ressources"
            className="cursor-pointer rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium focus:border-primary focus:outline-none"
          >
            {RESOURCE_SORT_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {SORT_LABELS[item]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onSortDirChange(sortDir === "asc" ? "desc" : "asc")}
            disabled={!isSortable}
            title={isSortable ? `Inverser : ${SORT_LABELS[sortBy]}` : "Choisissez un critère de tri"}
            aria-label="Inverser l'ordre de tri"
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${
              isSortable
                ? "cursor-pointer border-border bg-card text-foreground hover:border-primary hover:text-primary"
                : "cursor-not-allowed border-border/50 bg-muted text-muted-foreground/40"
            }`}
          >
            {sortDir === "asc" ? <ArrowDownUp size={16} /> : <ArrowUpDown size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
