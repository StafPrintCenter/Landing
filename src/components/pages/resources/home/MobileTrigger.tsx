import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

export function ResourceHomeMobileTrigger({ activeFilterCount, onOpen }: { activeFilterCount: number; onOpen: () => void }) {
  return <FilterMobileTrigger activeFilterCount={activeFilterCount} onOpen={onOpen} />;
}
