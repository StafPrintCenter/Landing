interface RealisationHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function RealisationHomeResultsCount({
  category,
  query,
  filteredCount,
  totalCount,
  isLoading,
}: RealisationHomeResultsCountProps) {
  if (isLoading) {
    return <div className="mt-6 h-5 w-40 animate-pulse rounded bg-muted" />;
  }

  const plural = filteredCount > 1;
  const hasQuery = query.trim().length > 0;
  const isAll = category === "Tout";

  // Cas 1 : pas de filtre actif → affichage global
  if (isAll && !hasQuery) {
    return (
      <p className="mt-6 text-sm text-muted-foreground">
        {totalCount} projet{totalCount > 1 ? "s" : ""} disponible{totalCount > 1 ? "s" : ""}
      </p>
    );
  }

  // Cas 2 : recherche + filtres
  return (
    <p className="mt-6 text-sm text-muted-foreground">
      {filteredCount} projet{plural ? "s" : ""} trouvé{plural ? "s" : ""}

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
          <span className="font-medium text-foreground">{category}</span>
        </>
      )}
    </p>
  );
}