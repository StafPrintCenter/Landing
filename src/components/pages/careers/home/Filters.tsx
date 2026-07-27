import { SlidersHorizontal } from "lucide-react";
import { JOB_CONTRACT_TYPES, JOB_CONTRACT_TYPE_LABELS, type JobContractType } from "@/data/jobs";

interface CareersFiltersProps {
  contractType: JobContractType | "";
  onContractTypeChange: (v: JobContractType | "") => void;
}

export function CareersHomeFilters({ contractType, onContractTypeChange }: CareersFiltersProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <SlidersHorizontal size={16} className="shrink-0 text-muted-foreground" />
      <button
        onClick={() => onContractTypeChange("")}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer ${contractType === "" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"
          }`}
      >
        Tous
      </button>
      {JOB_CONTRACT_TYPES.map((c) => (
        <button
          key={c}
          onClick={() => onContractTypeChange(c)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer ${contractType === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"
            }`}
        >
          {JOB_CONTRACT_TYPE_LABELS[c]}
        </button>
      ))}
    </div>
  );
}