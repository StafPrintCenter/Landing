import { SiteShell } from "@/components/site/SiteShell";

export function ServiceDetailSkeleton() {
  return (
    <SiteShell>
      <section className="border-b border-border bg-muted/40 animate-pulse">
        <div className="container-x py-16 md:py-24">
          <div className="h-4 w-32 rounded bg-muted-foreground/20" />
          <div className="mt-8 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-muted-foreground/20" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-20 rounded bg-muted-foreground/15" />
              <div className="h-8 w-1/3 rounded bg-muted-foreground/20" />
            </div>
          </div>
          <div className="mt-6 h-5 w-full max-w-2xl rounded bg-muted-foreground/15" />
          <div className="mt-8 flex gap-3">
            <div className="h-11 w-36 rounded-full bg-muted-foreground/20" />
            <div className="h-11 w-28 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      </section>
      <div className="container-x py-20 animate-pulse space-y-4">
        <div className="h-6 w-48 rounded bg-muted-foreground/20" />
        <div className="h-4 w-full max-w-xl rounded bg-muted-foreground/15" />
      </div>
    </SiteShell>
  );
}