import { SlidersHorizontal, ArrowDownUp, ArrowUpDown } from "lucide-react";
import { FORMATION_THEMES, type FormationTheme } from "@/data/trainings";

const THEMES: Array<"Tout" | FormationTheme> = ["Tout", ...FORMATION_THEMES];

export const FORMATION_SORT_OPTIONS = ["default", "alpha", "price", "duration", "level"] as const;
export type FormationSortOption = (typeof FORMATION_SORT_OPTIONS)[number];

export const FORMATION_SORT_DIRECTIONS = ["asc", "desc"] as const;
export type FormationSortDirection = (typeof FORMATION_SORT_DIRECTIONS)[number];

const DIRECTION_LABELS: Record<FormationSortOption, { asc: string; desc: string }> = {
  default: { asc: "Par défaut", desc: "Par défaut" },
  alpha: { asc: "A → Z", desc: "Z → A" },
  price: { asc: "Prix croissant", desc: "Prix décroissant" },
  duration: { asc: "Moins d'heures", desc: "Plus d'heures" },
  level: { asc: "Niveau faible", desc: "Niveau élevé" },
};

interface FormationFiltersProps {
  theme: "Tout" | FormationTheme;
  sortBy: FormationSortOption;
  sortDir: FormationSortDirection;
  onThemeChange: (t: "Tout" | FormationTheme) => void;
  onSortChange: (s: FormationSortOption) => void;
  onSortDirChange: (d: FormationSortDirection) => void;
}

export function FormationHomeFilters({
  theme,
  sortBy,
  sortDir,
  onThemeChange,
  onSortChange,
  onSortDirChange,
}: FormationFiltersProps) {
  const isSortable = sortBy !== "default";
  const directionLabel = DIRECTION_LABELS[sortBy][sortDir];

  const toggleDirection = () => {
    if (!isSortable) return;
    onSortDirChange(sortDir === "asc" ? "desc" : "asc");
  };

  return (
    <div className="mt-10 border-b border-border/60 pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Thèmes */}
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => onThemeChange(t)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer ${theme === t
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card hover:border-primary"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tri */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <SlidersHorizontal size={16} className="shrink-0 text-muted-foreground" />

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as FormationSortOption)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium focus:border-primary focus:outline-none cursor-pointer"
          >
            <option value="default">Trier par défaut</option>
            <option value="alpha">Ordre alphabétique</option>
            <option value="price">Prix</option>
            <option value="duration">Volume horaire</option>
            <option value="level">Niveau de difficulté</option>
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
