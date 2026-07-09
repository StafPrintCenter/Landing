import { SiteShell } from "@/components/site/SiteShell";

export function FormationDetailSkeleton() {
  return (
    <SiteShell>
      {/* Skeleton En-tête */}
      <section className="border-b border-border bg-muted animate-pulse">
        <div className="container-x py-12 md:py-16">
          <div className="h-4 w-36 rounded bg-muted-foreground/20" />
          <div className="mt-6 h-6 w-20 rounded-full bg-muted-foreground/15" />
          <div className="mt-4 h-10 w-3/4 max-w-xl rounded bg-muted-foreground/20" />
          <div className="mt-4 h-5 w-full max-w-2xl rounded bg-muted-foreground/15" />
          <div className="mt-6 flex gap-3">
            <div className="h-9 w-28 rounded-full bg-muted-foreground/20" />
            <div className="h-9 w-28 rounded-full bg-muted-foreground/20" />
            <div className="h-9 w-24 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      </section>

      {/* Skeleton Contenu Principal */}
      <section className="container-x grid gap-12 py-16 md:grid-cols-3 animate-pulse">
        <div className="md:col-span-2 space-y-10">
          <div>
            <div className="h-7 w-48 rounded bg-muted-foreground/20" />
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 space-y-3">
                  <div className="h-5 w-1/3 rounded bg-muted-foreground/20" />
                  <div className="h-4 w-5/6 rounded bg-muted-foreground/15" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="h-3 w-16 rounded bg-muted-foreground/15" />
            <div className="h-8 w-32 rounded bg-muted-foreground/20" />
            <div className="h-px bg-border my-5" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-20 rounded bg-muted-foreground/15" />
                  <div className="h-4 w-16 rounded bg-muted-foreground/20" />
                </div>
              ))}
            </div>
            <div className="h-11 w-full rounded-full bg-muted-foreground/20 pt-2" />
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
