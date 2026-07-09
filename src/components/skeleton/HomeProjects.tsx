export function ProjectsSkeleton() {
  return (
    <section className="container-x py-24">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl animate-pulse">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-2 h-10 w-3/4 rounded bg-muted" />
        </div>
        <div className="hidden md:block h-5 w-20 animate-pulse rounded bg-muted" />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={`skeleton-${idx}`}
            className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="aspect-4/3 bg-muted" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}