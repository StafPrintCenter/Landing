import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface FormationHomeResultsCountProps {
  theme: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function FormationHomeResultsCount({ theme, ...rest }: FormationHomeResultsCountProps) {
  return (
    <ResultsCountText
      {...rest}
      category={theme}
      unit={{ singular: "formation", plural: "formations" }}
      foundParticiple={{ singular: "trouvée", plural: "trouvées" }}
    />
  );
}