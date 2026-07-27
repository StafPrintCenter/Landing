import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface CareersHomeResultsCountProps {
  contractType: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function CareersHomeResultsCount(props: CareersHomeResultsCountProps) {
  return (
    <ResultsCountText
      category={props.contractType}
      query={props.query}
      filteredCount={props.filteredCount}
      totalCount={props.totalCount}
      isLoading={props.isLoading}
      unit={{ singular: "offre d'emploi", plural: "offres d'emploi" }}
      foundParticiple={{ singular: "trouvée", plural: "trouvées" }}
      globalParticiple={{ singular: "disponible", plural: "disponibles" }}
    />
  );
}