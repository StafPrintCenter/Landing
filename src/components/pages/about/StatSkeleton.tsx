export function StatSkeleton() {
  return (
    <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 sm:grid-cols-2 md:p-10 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={`about-stat-skeleton-${idx}`} className="text-center lg:text-left">
          <div className="h-10 w-24 animate-pulse rounded-xl bg-muted mx-auto lg:mx-0" />
          <div className="mt-2 h-4 w-32 animate-pulse rounded bg-muted/70 mx-auto lg:mx-0" />
        </div>
      ))}
    </div>
  );
}