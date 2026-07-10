import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface FaqHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function FaqHomeResultsCount(props: FaqHomeResultsCountProps) {
  return (
    <ResultsCountText
      {...props}
      unit={{ singular: "question", plural: "questions" }}
      foundParticiple={{ singular: "trouvée", plural: "trouvées" }}
    />
  );
}