export function TestimonialsSkeleton() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="container-x">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-10 w-80 max-w-full animate-pulse rounded-lg bg-muted" />
        <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-muted" />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="h-80 animate-pulse rounded-3xl border border-border bg-card lg:col-span-7" />
          <div className="grid gap-6 lg:col-span-5">
            <div className="h-24 animate-pulse rounded-3xl border border-border bg-card" />
            <div className="h-28 animate-pulse rounded-2xl border border-border bg-card" />
            <div className="h-28 animate-pulse rounded-2xl border border-border bg-card" />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="h-40 animate-pulse rounded-2xl border border-border bg-card" />
          <div className="h-40 animate-pulse rounded-2xl border border-border bg-card" />
        </div>
      </div>
    </section>
  );
}