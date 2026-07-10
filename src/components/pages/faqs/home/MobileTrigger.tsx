import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

interface FaqMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function FaqHomeMobileTrigger(props: FaqMobileTriggerProps) {
  return <FilterMobileTrigger {...props} />;
}