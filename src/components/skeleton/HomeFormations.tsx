export function FormationsSkeleton() {
  return (
    <section className="bg-muted/50 border-y border-border/50">
      <div className="container-x py-24">
        <div className="max-w-2xl animate-pulse">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-2 h-10 w-3/4 rounded bg-muted" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="flex h-[380px] animate-pulse flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="h-5 w-20 rounded-full bg-muted" />
              <div className="mt-4 h-6 w-3/4 rounded bg-muted" />
              <div className="mt-2 h-4 w-full rounded bg-muted" />

              <div className="flex-1 min-h-4" />

              <div className="mt-4 space-y-3 border-t border-border/40 pt-4">
                <div className="h-3.5 w-1/2 rounded bg-muted" />
                <div className="h-3.5 w-1/3 rounded bg-muted" />
                <div className="h-3.5 w-2/5 rounded bg-muted" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-border/60 pt-4">
                <div className="h-9 rounded-xl bg-muted" />
                <div className="h-9 rounded-xl bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}