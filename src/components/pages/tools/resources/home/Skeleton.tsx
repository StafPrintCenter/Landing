export function ResourceHomeSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-36 bg-muted" />
      <div className="space-y-4 p-6">
        <div className="h-3 w-1/3 rounded bg-muted" />
        <div className="h-6 w-4/5 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-9 w-full rounded bg-muted" />
      </div>
    </div>
  );
}
