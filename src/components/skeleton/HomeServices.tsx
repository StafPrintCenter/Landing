export function ServicesSkeleton() {
  return (
    <section className="container-x py-24">
      <div className="max-w-2xl animate-pulse">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="mt-4 h-10 w-3/4 rounded bg-muted" />
        <div className="mt-3 h-4 w-1/2 rounded bg-muted" />
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-border bg-card p-6 flex flex-col h-[280px] justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-xl bg-muted" />
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div className="h-8 w-8 rounded-full bg-muted" />
              </div>
            </div>

            <div className="space-y-3 mt-6 flex-1">
              <div className="h-5 w-2/3 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/40">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-5 w-16 rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}