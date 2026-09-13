import { SlidersHorizontal, ArrowDownUp, ArrowUpDown, Construction } from "lucide-react";
import {
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_CATEGORY_LABELS,
  ECOSYSTEM_STATUS_LABELS,
  type EcosystemSiteCategory,
  type EcosystemSiteStatus,
} from "@/data/ecosystem";

const CATEGORIES: Array<"Tout" | EcosystemSiteCategory> = ["Tout", ...ECOSYSTEM_CATEGORIES];
const STATUSES: Array<"Tout" | EcosystemSiteStatus> = ["Tout", "available", "building"];

export const ECOSYSTEM_SORT_OPTIONS = ["default", "alpha", "date"] as const;
export type EcosystemSortOption = (typeof ECOSYSTEM_SORT_OPTIONS)[number];

export const ECOSYSTEM_SORT_DIRECTIONS = ["asc", "desc"] as const;
export type EcosystemSortDirection = (typeof ECOSYSTEM_SORT_DIRECTIONS)[number];

const DIRECTION_LABELS: Record<EcosystemSortOption, { asc: string; desc: string }> = {
  default: { asc: "Par défaut", desc: "Par défaut" },
  alpha: { asc: "Nom A → Z", desc: "Nom Z → A" },
  date: { asc: "Plus ancien", desc: "Plus récent" },
};

interface EcosystemFiltersProps {
  category: "Tout" | EcosystemSiteCategory;
  status: "Tout" | EcosystemSiteStatus;
  sortBy: EcosystemSortOption;
  sortDir: EcosystemSortDirection;
  onCategoryChange: (c: "Tout" | EcosystemSiteCategory) => void;
  onStatusChange: (s: "Tout" | EcosystemSiteStatus) => void;
  onSortChange: (s: EcosystemSortOption) => void;
  onSortDirChange: (d: EcosystemSortDirection) => void;
}

export function EcosystemFilters({
  category,
  status,
  sortBy,
  sortDir,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onSortDirChange,
}: EcosystemFiltersProps) {
  const isSortable = sortBy !== "default";
  const directionLabel = DIRECTION_LABELS[sortBy][sortDir];

  const toggleDirection = () => {
    if (!isSortable) return;
    onSortDirChange(sortDir === "asc" ? "desc" : "asc");
  };

  return (
    <div className="mt-10 border-b border-border/60 pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Catégories (Pills) */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCategoryChange(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer ${category === c
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card hover:border-primary"
                }`}
            >
              {c === "Tout" ? "Tout" : ECOSYSTEM_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        {/* Filtrage par Statut + Contrôles de Tri */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Menu déroulant Statut */}
          <div className="flex items-center gap-2">
            <Construction size={16} className="shrink-0 text-muted-foreground" />
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value as "Tout" | EcosystemSiteStatus)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium focus:border-primary focus:outline-none cursor-pointer transition ${status !== "Tout"
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border bg-card text-foreground"
                }`}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="bg-card text-foreground">
                  {ECOSYSTEM_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          <div className="h-6 w-px bg-border/60 hidden sm:block" />

          {/* Tri dynamique */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="shrink-0 text-muted-foreground" />

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as EcosystemSortOption)}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="default">Trier par défaut</option>
              <option value="alpha">Ordre alphabétique</option>
              <option value="date">Date d'ajout</option>
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
    </div>
  );
}
