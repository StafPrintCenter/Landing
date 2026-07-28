import { SlidersHorizontal, ArrowDownUp, ArrowUpDown } from "lucide-react";
import { JOB_CONTRACT_TYPES, JOB_CONTRACT_TYPE_LABELS, type JobContractType } from "@/data/jobs";

const CONTRACT_TYPES: Array<"Tout" | JobContractType> = ["Tout", ...JOB_CONTRACT_TYPES];

export const CAREER_SORT_OPTIONS = ["default", "recent", "alpha", "salary", "positions", "work_mode",] as const;

export type CareerSortOption = (typeof CAREER_SORT_OPTIONS)[number];

export const CAREER_SORT_DIRECTIONS = ["asc", "desc"] as const;
export type CareerSortDirection = (typeof CAREER_SORT_DIRECTIONS)[number];

const DIRECTION_LABELS: Record<CareerSortOption, { asc: string; desc: string }> = {
  default: { asc: "Plus récentes", desc: "Plus récentes" },
  recent: { asc: "Anciennes → Récentes", desc: "Récentes → Anciennes" },
  alpha: { asc: "Titre A → Z", desc: "Titre Z → A" },
  salary: { asc: "Salaire croissant", desc: "Salaire décroissant" },
  positions: { asc: "Moins de postes", desc: "Plus de postes" },
  work_mode: { asc: "Mode de travail (A → Z)", desc: "Mode de travail (Z → A)" },
};

interface CareersFiltersProps {
  contractType: "Tout" | JobContractType;
  sortBy: CareerSortOption;
  sortDir: CareerSortDirection;
  onContractTypeChange: (c: "Tout" | JobContractType) => void;
  onSortChange: (s: CareerSortOption) => void;
  onSortDirChange: (d: CareerSortDirection) => void;
}

export function CareersHomeFilters({
  contractType,
  sortBy,
  sortDir,
  onContractTypeChange,
  onSortChange,
  onSortDirChange,
}: CareersFiltersProps) {
  const isSortable = sortBy !== "default";
  const directionLabel = DIRECTION_LABELS[sortBy]?.[sortDir] ?? "";

  const toggleDirection = () => {
    if (!isSortable) return;
    onSortDirChange(sortDir === "asc" ? "desc" : "asc");
  };

  return (
    <div className="mt-10 border-b border-border/60 pb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Types de contrat */}
        <div className="flex flex-wrap gap-2">
          {CONTRACT_TYPES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onContractTypeChange(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer ${contractType === c
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card hover:border-primary"
                }`}
            >
              {c === "Tout" ? "Tous" : JOB_CONTRACT_TYPE_LABELS[c]}
            </button>
          ))}
        </div>

        {/* Tri */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <SlidersHorizontal size={16} className="shrink-0 text-muted-foreground" />

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as CareerSortOption)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium focus:border-primary focus:outline-none cursor-pointer"
          >
            <option value="default">Trier par défaut</option>
            <option value="recent">Date de publication</option>
            <option value="alpha">Ordre alphabétique</option>
            <option value="salary">Niveau de salaire</option>
            <option value="positions">Nombre de postes</option>
            <option value="work_mode">Mode de travail</option>
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