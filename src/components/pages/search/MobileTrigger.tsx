import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

interface SearchMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function SearchMobileTrigger(props: SearchMobileTriggerProps) {
  return <FilterMobileTrigger {...props} />;
}