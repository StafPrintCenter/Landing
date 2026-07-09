export function RealisationHomeSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-5">
        <div className="h-3 w-16 rounded-full bg-muted" />
        <div className="mt-2 h-5 w-3/4 rounded-md bg-muted" />
        <div className="mt-1 h-4 w-1/2 rounded bg-muted/60" />
      </div>
    </div>
  );
}