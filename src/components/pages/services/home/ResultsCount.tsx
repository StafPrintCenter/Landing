import { SERVICE_CATEGORIES } from "@/data/services";

interface ServiceHomeResultsCountProps {
  category: string;
  query: string;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function ServiceHomeResultsCount({
  category,
  query,
  filteredCount,
  totalCount,
  isLoading,
}: ServiceHomeResultsCountProps) {
  if (isLoading) {
    return <div className="h-5 w-40 animate-pulse rounded bg-muted" />;
  }

  const plural = filteredCount > 1;
  const hasQuery = query.trim().length > 0;
  const isAll = category === "all" || category === "Tout";
  const categoryLabel = SERVICE_CATEGORIES.find((c) => c.value === category)?.label ?? category;

  // Cas 1 : pas de filtre actif → affichage global
  if (isAll && !hasQuery) {
    return (
      <p className="text-sm text-muted-foreground">
        {totalCount} service{totalCount > 1 ? "s" : ""} disponible{totalCount > 1 ? "s" : ""}
      </p>
    );
  }

  // Cas 2 : recherche + filtres
  return (
    <p className="text-sm text-muted-foreground">
      {filteredCount} service{plural ? "s" : ""} trouvé{plural ? "s" : ""}

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