export function StatsSkeleton() {
  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="container-x grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={`stat-skeleton-${idx}`} className="text-center">
            <div className="mx-auto h-10 w-20 animate-pulse rounded-lg bg-secondary-foreground/10 md:h-12" />
            <div className="mx-auto mt-3 h-4 w-24 animate-pulse rounded bg-secondary-foreground/10" />
          </div>
        ))}
      </div>
    </section>
  );
}