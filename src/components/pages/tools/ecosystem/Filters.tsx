import { ArrowDownUp, ArrowUpDown, Layers } from "lucide-react";
import { ECOSYSTEM_CATEGORY_LABELS, type EcosystemSiteCategory } from "@/data/ecosystem";

const CATEGORIES: EcosystemSiteCategory[] = ["principal", "outil", "formation", "communication"];

export type EcosystemSortOption = "default" | "asc" | "desc";

interface EcosystemFiltersProps {
  category: EcosystemSiteCategory | "Tout";
  onCategoryChange: (c: EcosystemSiteCategory | "Tout") => void;
  sortBy: EcosystemSortOption;
  onSortChange: (s: EcosystemSortOption) => void;
}

export function EcosystemFilters({ category, onCategoryChange, sortBy, onSortChange }: EcosystemFiltersProps) {
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
        {/* Catégories */}
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

        {/* Tri à 3 états (default -> asc -> desc) */}
        <button
          type="button"
          onClick={toggleSort}
          className={`inline-flex items-center gap-2 self-start rounded-lg border px-3 py-2 text-sm font-medium transition cursor-pointer lg:self-auto ${sortBy !== "default"
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
  );
}
