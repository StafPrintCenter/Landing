// src/components/pages/articles/home/ResultsCount.tsx
import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface ArticleHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function ArticleHomeResultsCount(props: ArticleHomeResultsCountProps) {
  return (
    <ResultsCountText
      {...props}
      unit={{ singular: "article", plural: "articles" }}
      globalParticiple={{ singular: "rédigé", plural: "rédigés" }}
    />
  );
}