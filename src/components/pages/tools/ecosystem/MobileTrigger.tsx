import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

interface EcosystemMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function EcosystemMobileTrigger(props: EcosystemMobileTriggerProps) {
  return <FilterMobileTrigger {...props} />;
}