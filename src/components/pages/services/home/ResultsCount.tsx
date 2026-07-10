import { SERVICE_CATEGORIES } from "@/data/services";
import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface ServiceHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function ServiceHomeResultsCount(props: ServiceHomeResultsCountProps) {
  return (
    <ResultsCountText
      {...props}
      unit={{ singular: "service", plural: "services" }}
      resolveCategoryLabel={(c) => SERVICE_CATEGORIES.find((sc) => sc.value === c)?.label ?? c}
    />
  );
}