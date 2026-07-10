interface FaqHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function FaqHomeResultsCount({
  category,
  query,
  filteredCount,
  totalCount,
  isLoading,
}: FaqHomeResultsCountProps) {
  if (isLoading) {
    return <div className="mt-6 h-5 w-40 animate-pulse rounded bg-muted" />;
  }

  const plural = filteredCount > 1;
  const hasQuery = query.trim().length > 0;
  const isAll = category === "Tout";

  if (isAll && !hasQuery) {
    return (
      <p className="mt-6 text-sm text-muted-foreground">
        {totalCount} question{totalCount > 1 ? "s" : ""} disponible{totalCount > 1 ? "s" : ""}
      </p>
    );
  }

  return (
    <p className="mt-6 text-sm text-muted-foreground">
      {filteredCount} question{plural ? "s" : ""} trouvée{plural ? "s" : ""}

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