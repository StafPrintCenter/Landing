export function ResourcesSkeleton() {
  return (
    <section className="bg-muted/50 border-y border-border/50">
      <div className="container-x py-24">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl animate-pulse">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="mt-2 h-10 w-3/4 rounded bg-muted" />
          </div>
          <div className="hidden h-5 w-32 animate-pulse rounded bg-muted md:block" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={`resource-skeleton-${index}`}
              className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="h-36 bg-muted" />
              <div className="space-y-3 p-6">
                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded bg-muted" />
                  <div className="h-3 w-20 rounded bg-muted" />
                </div>
                <div className="h-6 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="mt-5 flex justify-between border-t border-border pt-4">
                  <div className="h-8 w-20 rounded bg-muted" />
                  <div className="h-8 w-24 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
