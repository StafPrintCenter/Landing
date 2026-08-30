export function EcosystemSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="h-12 w-12 rounded-xl bg-muted" />
        <div className="h-6 w-20 rounded-md bg-muted" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-5 w-3/4 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted/60" />
        <div className="h-4 w-2/3 rounded bg-muted/60" />
      </div>
    </div>
  );
}