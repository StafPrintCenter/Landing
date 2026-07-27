interface CareersHomeResultsCountProps {
  count: number;
  isLoading?: boolean;
}

export function CareersHomeResultsCount({ count, isLoading }: CareersHomeResultsCountProps) {
  if (isLoading) {
    return <div className="mt-6 h-5 w-40 animate-pulse rounded bg-muted" />;
  }
  return (
    <p className="mt-6 text-sm text-muted-foreground">
      {count} offre{count > 1 ? "s" : ""} disponible{count > 1 ? "s" : ""}
    </p>
  );
}