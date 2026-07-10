import { FilterMobileTrigger } from "@/components/shared/FilterMobileTrigger";

interface ArticleMobileTriggerProps {
  activeFilterCount: number;
  onOpen: () => void;
}

export function ArticleHomeMobileTrigger(props: ArticleMobileTriggerProps) {
  return <FilterMobileTrigger {...props} />;
}