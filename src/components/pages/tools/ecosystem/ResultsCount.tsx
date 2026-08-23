import { ResultsCountText } from "@/components/shared/ResultsCountText";

interface EcosystemResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function EcosystemResultsCount(props: EcosystemResultsCountProps) {
  return (
    <ResultsCountText
      {...props}
      unit={{ singular: "outil", plural: "outils" }}
      foundParticiple={{ singular: "trouvé", plural: "trouvés" }}
      globalParticiple={{ singular: "disponible", plural: "disponibles" }}
    />
  );
}