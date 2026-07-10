export function FaqHomeSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm animate-pulse">
      {/* Cover placeholder */}
      <div className="aspect-16/10 bg-muted" />

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="h-5 w-20 rounded-full bg-muted" />
        <div className="mt-3 h-5 w-3/4 rounded-md bg-muted" />
        <div className="mt-1 h-5 w-full rounded-md bg-muted" />
        <div className="mt-4 flex-1 space-y-2 pt-1">
          <div className="h-4 w-full rounded bg-muted/60" />
          <div className="h-4 w-5/6 rounded bg-muted/60" />
        </div>
        <div className="mt-4 flex gap-3 border-t border-border/40 pt-4">
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-4 w-12 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
