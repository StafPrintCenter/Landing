interface ResultsCountTextProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
  unit: { singular: string; plural: string };
  globalParticiple?: { singular: string; plural: string };
  foundParticiple?: { singular: string; plural: string };
  resolveCategoryLabel?: (category: string) => string;
}

export function ResultsCountText({
  category,
  query,
  filteredCount,
  totalCount,
  isLoading,
  unit,
  globalParticiple = { singular: "disponible", plural: "disponibles" },
  foundParticiple = { singular: "trouvé", plural: "trouvés" },
  resolveCategoryLabel,
}: ResultsCountTextProps) {
  if (isLoading) {
    return <div className="h-5 w-40 animate-pulse rounded bg-muted" />;
  }

  const plural = filteredCount > 1;
  const hasQuery = query.trim().length > 0;
  const isAll = category === "Tout";
  const categoryLabel = resolveCategoryLabel ? resolveCategoryLabel(category) : category;

  if (isAll && !hasQuery) {
    return (
      <p className="text-sm text-muted-foreground">
        {totalCount} {totalCount > 1 ? unit.plural : unit.singular}{" "}
        {totalCount > 1 ? globalParticiple.plural : globalParticiple.singular}
      </p>
    );
  }

  return (
    <p className="text-sm text-muted-foreground">
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