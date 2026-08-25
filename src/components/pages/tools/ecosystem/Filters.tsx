import { ArrowDownUp, ArrowUpDown, Layers, SlidersHorizontal } from "lucide-react";
import {
  ECOSYSTEM_CATEGORY_LABELS,
  ECOSYSTEM_STATUS_LABELS,
  type EcosystemSiteCategory,
  type EcosystemSiteStatus,
} from "@/data/ecosystem";

const CATEGORIES: EcosystemSiteCategory[] = ["principal", "outil", "formation", "communication", "divertissement"];
const STATUSES: (EcosystemSiteStatus | "Tout")[] = ["Tout", "available", "building"];

export type EcosystemSortOption = "default" | "asc" | "desc";

interface EcosystemFiltersProps {
  category: EcosystemSiteCategory | "Tout";
  onCategoryChange: (c: EcosystemSiteCategory | "Tout") => void;
  status: EcosystemSiteStatus | "Tout";
  onStatusChange: (s: EcosystemSiteStatus | "Tout") => void;
  sortBy: EcosystemSortOption;
  onSortChange: (s: EcosystemSortOption) => void;
}

export function EcosystemFilters({
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sortBy,
  onSortChange,
}: EcosystemFiltersProps) {
  const toggleSort = () => {
    if (sortBy === "default") onSortChange("asc");
    else if (sortBy === "asc") onSortChange("desc");
    else onSortChange("default");
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "asc":
        return "Nom : A → Z";
      case "desc":
        return "Nom : Z → A";
      default:
        return "Ordre par défaut";
    }
  };

  return (
    <div className="border-b border-border/60 pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Filtres par Catégorie (Pills) */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange("Tout")}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer ${category === "Tout"
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-card hover:border-primary"
              }`}
          >
            Tout
          </button>
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
              {ECOSYSTEM_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        {/* Contrôles d'action à droite : Statut (Select) + Tri (Bouton) sur la même ligne */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Liste déroulante Statut */}
          <div className="relative inline-flex items-center">
            <SlidersHorizontal size={14} className="absolute left-3 pointer-events-none text-muted-foreground" />
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value as EcosystemSiteStatus | "Tout")}
              className={`appearance-none rounded-lg border py-2 pl-8 pr-8 text-sm font-medium transition cursor-pointer bg-card focus:outline-none focus:ring-1 focus:ring-primary ${status !== "Tout"
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-foreground hover:border-primary"
                }`}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="bg-card text-foreground">
                  {s === "Tout" ? "Tous les statuts" : ECOSYSTEM_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <span className="absolute right-2.5 pointer-events-none text-xs text-muted-foreground">▼</span>
          </div>

          {/* Tri à 3 états */}
          <button
            type="button"
            onClick={toggleSort}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition cursor-pointer ${sortBy !== "default"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-card hover:border-primary hover:text-primary"
              }`}
            title="Changer le tri (Par défaut / A → Z / Z → A)"
          >
            {sortBy === "default" && <Layers size={16} />}
            {sortBy === "asc" && <ArrowDownUp size={16} />}
            {sortBy === "desc" && <ArrowUpDown size={16} />}
            <span>{getSortLabel()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
