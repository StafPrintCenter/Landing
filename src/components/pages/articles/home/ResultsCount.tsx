interface ArticleHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function ArticleHomeResultsCount({
  category,
  query,
  filteredCount,
  totalCount,
  isLoading,
}: ArticleHomeResultsCountProps) {
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
        {totalCount} article{totalCount > 1 ? "s" : ""} rédigé{totalCount > 1 ? "s" : ""}
      </p>
    );
  }

  // Cas 2 : recherche + filtres
  return (
    <p className="mt-6 text-sm text-muted-foreground">
      {filteredCount} article{plural ? "s" : ""} trouvé{plural ? "s" : ""}

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