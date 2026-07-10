import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

interface FormationMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function FormationHomeMobileTrigger(props: FormationMobileTriggerProps) {
  return <FilterMobileTrigger {...props} />;
}