import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

interface ServiceMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function ServiceHomeMobileTrigger(props: ServiceMobileTriggerProps) {
  return <FilterMobileTrigger {...props} />;
}