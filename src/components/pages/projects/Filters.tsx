import { SlidersHorizontal, ArrowDownUp, ArrowUpDown } from "lucide-react";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";

const CATEGORIES: Array<"Tout" | ProjectCategory> = ["Tout", ...PROJECT_CATEGORIES];

export const REALISATION_SORT_OPTIONS = ["default", "alpha", "client"] as const;
export type RealisationSortOption = (typeof REALISATION_SORT_OPTIONS)[number];

export const REALISATION_SORT_DIRECTIONS = ["asc", "desc"] as const;
export type RealisationSortDirection = (typeof REALISATION_SORT_DIRECTIONS)[number];

const DIRECTION_LABELS: Record<RealisationSortOption, { asc: string; desc: string }> = {
  default: { asc: "Par défaut", desc: "Par défaut" },
  alpha: { asc: "Titre A → Z", desc: "Titre Z → A" },
  client: { asc: "Client A → Z", desc: "Client Z → A" },
};

interface RealisationsFiltersProps {
  category: "Tout" | ProjectCategory;
  sortBy: RealisationSortOption;
  sortDir: RealisationSortDirection;
  onCategoryChange: (c: "Tout" | ProjectCategory) => void;
  onSortChange: (s: RealisationSortOption) => void;
  onSortDirChange: (d: RealisationSortDirection) => void;
}

export function RealisationHomeFilters({
  category,
  sortBy,
  sortDir,
  onCategoryChange,
  onSortChange,
  onSortDirChange,
}: RealisationsFiltersProps) {
  const isSortable = sortBy !== "default";
  const directionLabel = DIRECTION_LABELS[sortBy][sortDir];

  const toggleDirection = () => {
    if (!isSortable) return;
    onSortDirChange(sortDir === "asc" ? "desc" : "asc");
  };

  return (
    <div className="mt-10 border-b border-border/60 pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Catégories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer ${category === c
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card hover:border-primary"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Tri */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <SlidersHorizontal size={16} className="shrink-0 text-muted-foreground" />

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as RealisationSortOption)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium focus:border-primary focus:outline-none cursor-pointer"
          >
            <option value="default">Trier par défaut</option>
            <option value="alpha">Ordre alphabétique</option>
            <option value="client">Par client</option>
          </select>

          <button
            type="button"
            onClick={toggleDirection}
            disabled={!isSortable}
            title={isSortable ? `Inverser : ${directionLabel}` : "Choisissez un critère de tri"}
            aria-label="Inverser l'ordre de tri"
            className={[
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-200",
              isSortable
                ? "border-border bg-card text-foreground hover:border-primary hover:text-primary cursor-pointer"
                : "border-border/50 bg-muted text-muted-foreground/40 cursor-not-allowed",
            ].join(" ")}
          >
            {sortDir === "asc" ? <ArrowDownUp size={16} /> : <ArrowUpDown size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
