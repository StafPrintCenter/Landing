import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { ECOSYSTEM_CATEGORY_LABELS, type EcosystemSiteCategory } from "@/data/ecosystem";

const CATEGORIES: EcosystemSiteCategory[] = ["principal", "outil", "formation", "communication"];

export type EcosystemSortDirection = "asc" | "desc";

interface EcosystemFiltersProps {
  category: EcosystemSiteCategory | "Tout";
  onCategoryChange: (c: EcosystemSiteCategory | "Tout") => void;
  sortDir: EcosystemSortDirection;
  onSortDirChange: (d: EcosystemSortDirection) => void;
}

export function EcosystemFilters({ category, onCategoryChange, sortDir, onSortDirChange }: EcosystemFiltersProps) {
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

        {/* Tri */}
        <button
          type="button"
          onClick={() => onSortDirChange(sortDir === "asc" ? "desc" : "asc")}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary cursor-pointer lg:self-auto"
          title={sortDir === "asc" ? "Trier Z → A" : "Trier A → Z"}
        >
          {sortDir === "asc" ? <ArrowDownUp size={16} /> : <ArrowUpDown size={16} />}
          <span>{sortDir === "asc" ? "A → Z" : "Z → A"}</span>
        </button>
      </div>
    </div>
  );
}
