export function ServiceHomeSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-card p-7">
      <div className="h-12 w-12 rounded-xl bg-muted-foreground/15" />
      <div className="mt-5 h-5 w-2/3 rounded bg-muted-foreground/20" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-muted-foreground/15" />
        <div className="h-3 w-5/6 rounded bg-muted-foreground/15" />
      </div>
      <div className="mt-6 h-4 w-24 rounded bg-muted-foreground/15" />
    </div>
  );
}
