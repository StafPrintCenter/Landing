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
      isAllValue="Tout"
      unit={{ singular: "article", plural: "articles" }}
      globalParticiple={{ singular: "rédigé", plural: "rédigés" }}
      className="mt-6 text-sm text-muted-foreground"
    />
  );
}