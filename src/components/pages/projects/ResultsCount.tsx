import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface RealisationHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function RealisationHomeResultsCount(props: RealisationHomeResultsCountProps) {
  return <ResultsCountText {...props} unit={{ singular: "projet", plural: "projets" }} />;
}