export function ResourceDetailSkeleton() {
  return (
    <div>
      <div className="bg-secondary py-16">
        <div className="container-x space-y-6">
          <div className="h-4 w-48 rounded bg-secondary-foreground/10" />
          <div className="h-10 w-2/3 rounded bg-secondary-foreground/10" />
          <div className="h-5 w-1/2 rounded bg-secondary-foreground/10" />
        </div>
      </div>
      <div className="container-x space-y-4 py-16 animate-pulse">
        <div className="h-8 w-1/3 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-4/5 rounded bg-muted" />
      </div>
    </div>
  );
}
