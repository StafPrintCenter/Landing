import { SEARCH_TYPES, type SearchType } from "@/data/categories";
import { pluralize } from "@/lib/utils";

interface SearchResultsCountProps {
  query: string;
  type: SearchType | "all";
  category: string;
  count: number;
}

export function SearchResultsCount({ query, type, category, count }: SearchResultsCountProps) {
  const plural = count > 1;
  const hasQuery = query.trim().length > 0;

  // Filtre "Tout" : message générique, on ignore volontairement Type et Catégorie
  if (type === "all") {
    return (
      <p className="text-sm text-muted-foreground">
        {count} résultat{plural ? "s" : ""}
        {hasQuery && (
          <>
            {" "}pour « <span className="font-semibold text-foreground">{query}</span> »
          </>
        )}
      </p>
    );
  }

  const typeLabel = SEARCH_TYPES.find((t) => t.value === type)?.label ?? "";

  // Type précis + catégorie précise : "26 Conseils trouvés dans Articles"
  if (category !== "Toutes") {
    const displayCategory = pluralize(category, count);

    return (
      <p className="text-sm text-muted-foreground">
        {count}{" "}
        <span className="font-semibold text-foreground">
          {displayCategory}
        </span>{" "}
        trouvé{plural ? "s" : ""} dans{" "}
        <span className="font-semibold text-foreground">{typeLabel}</span>
        {hasQuery && (
          <>
            {" "}pour « <span className="font-semibold text-foreground">{query}</span> »
          </>
        )}
      </p>
    );
  }

  // Type précis, toutes catégories confondues : "12 Articles trouvés"
  return (
    <p className="text-sm text-muted-foreground">
      {count}{" "}
      <span className="font-semibold text-foreground">
        {typeLabel}
      </span>
      {hasQuery && (
        <>
          {" "}pour « <span className="font-semibold text-foreground">{query}</span> »
        </>
      )}
    </p>
  );
}
