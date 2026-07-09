export function BlogSkeleton() {
  return (
    <section className="bg-muted">
      <div className="container-x py-24">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl animate-pulse">
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="mt-2 h-10 w-64 rounded bg-muted" />
          </div>
          <div className="hidden md:block h-5 w-28 animate-pulse rounded bg-muted" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-16/10 bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-20 rounded-full bg-muted" />
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                </div>
                <div className="pt-2">
                  <div className="h-3 w-1/2 rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}