interface ResultsCountTextProps {
  category: string;
  isAllValue: string | string[]; // ex: "Tout", ou ["all", "Tout"] pour services
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
  unit: { singular: string; plural: string };
  /** Participe accordé pour "disponible(s)" en vue globale, ex: "disponible" / "disponibles" */
  globalParticiple?: { singular: string; plural: string };
  /** Participe accordé pour "trouvé(e)(s)" en vue filtrée, ex: "trouvé" / "trouvés" ou "trouvée" / "trouvées" */
  foundParticiple?: { singular: string; plural: string };
  /** Résout le libellé affiché d'une catégorie (ex: SERVICE_CATEGORIES.find(...)) */
  resolveCategoryLabel?: (category: string) => string;
  className?: string;
}

export function ResultsCountText({
  category,
  isAllValue,
  query,
  filteredCount,
  totalCount,
  isLoading,
  unit,
  globalParticiple = { singular: "disponible", plural: "disponibles" },
  foundParticiple = { singular: "trouvé", plural: "trouvés" },
  resolveCategoryLabel,
  className = "text-sm text-muted-foreground",
}: ResultsCountTextProps) {
  if (isLoading) {
    return <div className={`h-5 w-40 animate-pulse rounded bg-muted ${className.includes("mt-") ? className.match(/mt-\S+/)?.[0] : ""}`} />;
  }

  const plural = filteredCount > 1;
  const hasQuery = query.trim().length > 0;
  const isAll = Array.isArray(isAllValue) ? isAllValue.includes(category) : category === isAllValue;
  const categoryLabel = resolveCategoryLabel ? resolveCategoryLabel(category) : category;

  if (isAll && !hasQuery) {
    return (
      <p className={className}>
        {totalCount} {totalCount > 1 ? unit.plural : unit.singular}{" "}
        {totalCount > 1 ? globalParticiple.plural : globalParticiple.singular}
      </p>
    );
  }

  return (
    <p className={className}>
      {filteredCount} {plural ? unit.plural : unit.singular}{" "}
      {plural ? foundParticiple.plural : foundParticiple.singular}

      {hasQuery && (
        <>
          {" "}pour «{" "}
          <span className="font-semibold text-foreground">{query}</span>
          {" »"}
        </>
      )}

      {!isAll && (
        <>
          {" "}dans{" "}
          <span className="font-medium text-foreground">{categoryLabel}</span>
        </>
      )}
    </p>
  );
}