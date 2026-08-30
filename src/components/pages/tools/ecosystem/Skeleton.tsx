export function EcosystemSkeleton() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 animate-pulse">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="h-12 w-12 rounded-xl bg-muted" />
          <div className="h-6 w-24 rounded-full bg-muted" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-5 w-1/2 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted/60" />
          <div className="h-4 w-4/5 rounded bg-muted/60" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 border-t border-border/40 pt-4">
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-3 w-28 rounded bg-muted/60" />
      </div>
    </div>
  );
}