import { SlidersHorizontal } from "lucide-react";

interface ServiceMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function ServiceHomeMobileTrigger({ activeFilterCount, onOpen }: ServiceMobileTriggerProps) {
  return (
    <button
      onClick={onOpen}
      className="mt-3 flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium md:hidden"
    >
      <span className="flex items-center gap-2">
        <SlidersHorizontal size={16} />
        Filtres
      </span>
      {activeFilterCount > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
          {activeFilterCount}
        </span>
      )}
    </button>
  );
}