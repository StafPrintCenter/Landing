export function FormationHomeSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="h-5 w-20 rounded-full bg-muted" />
        <div className="h-6 w-24 rounded-md bg-muted" />
      </div>
      <div className="mt-5 h-6 w-3/4 rounded-md bg-muted" />
      <div className="mt-2 h-4 w-full rounded-md bg-muted" />
      <div className="mt-1 h-4 w-5/6 rounded-md bg-muted" />
      <div className="mt-4 flex gap-4">
        <div className="h-5 w-24 rounded-md bg-muted" />
        <div className="h-5 w-24 rounded-md bg-muted" />
      </div>
      <div className="mt-6 space-y-2 flex-1 pt-2">
        <div className="h-4 w-full rounded bg-muted/60" />
        <div className="h-4 w-11/12 rounded bg-muted/60" />
        <div className="h-4 w-4/5 rounded bg-muted/60" />
      </div>
      <div className="mt-6 flex gap-2 pt-4 border-t border-border/40">
        <div className="h-10 w-28 rounded-full bg-muted" />
        <div className="h-10 w-24 rounded-full bg-muted" />
      </div>
    </div>
  );
}
