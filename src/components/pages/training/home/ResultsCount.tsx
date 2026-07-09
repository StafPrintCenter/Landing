interface FormationHomeResultsCountProps {
  theme: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function FormationHomeResultsCount({
  theme,
  query,
  filteredCount,
  totalCount,
  isLoading,
}: FormationHomeResultsCountProps) {
  if (isLoading) {
    return <div className="h-5 w-40 animate-pulse rounded bg-muted" />;
  }

  const plural = filteredCount > 1;
  const hasQuery = query.trim().length > 0;
  const isAll = theme === "Tout";

  // Cas 1 : pas de filtre actif → affichage global
  if (isAll && !hasQuery) {
    return (
      <p className="text-sm text-muted-foreground">
        {totalCount} formation{totalCount > 1 ? "s" : ""} disponible{totalCount > 1 ? "s" : ""}
      </p>
    );
  }

  // Cas 2 : recherche + filtres
  return (
    <p className="text-sm text-muted-foreground">
      {filteredCount} formation{plural ? "s" : ""} trouvée{plural ? "s" : ""}

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
          <span className="font-medium text-foreground">{theme}</span>
        </>
      )}
    </p>
  );
}