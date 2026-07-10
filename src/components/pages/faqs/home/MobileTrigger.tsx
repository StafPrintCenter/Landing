// MobileTrigger.tsx
import { SlidersHorizontal } from "lucide-react";

interface FaqHomeMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function FaqHomeMobileTrigger({ activeFilterCount, onOpen }: FaqHomeMobileTriggerProps) {
  return (
    <button
      onClick={onOpen}
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium md:hidden cursor-pointer"
    >
      <SlidersHorizontal size={16} />
      Filtres
      {activeFilterCount > 0 && (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {activeFilterCount}
        </span>
      )}
    </button>
  );
}