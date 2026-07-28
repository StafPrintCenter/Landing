import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

interface CareersMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function CareersHomeMobileTrigger(props: CareersMobileTriggerProps) {
  return <FilterMobileTrigger {...props} />;
}