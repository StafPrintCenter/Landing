import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

interface RealisationMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function RealisationHomeMobileTrigger(props: RealisationMobileTriggerProps) {
  return <FilterMobileTrigger {...props} />;
}