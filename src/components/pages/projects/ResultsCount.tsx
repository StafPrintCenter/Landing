import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface RealisationHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function RealisationHomeResultsCount(props: RealisationHomeResultsCountProps) {
  return (
    <ResultsCountText
      {...props}
      isAllValue="Tout"
      unit={{ singular: "projet", plural: "projets" }}
      className="mt-6 text-sm text-muted-foreground"
    />
  );
}