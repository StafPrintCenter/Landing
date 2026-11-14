import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface ResourceResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function ResourceHomeResultsCount(props: ResourceResultsCountProps) {
  return <ResultsCountText {...props} unit={{ singular: "ressource", plural: "ressources" }} />;
}
