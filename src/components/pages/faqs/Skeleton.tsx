export function FaqHomeSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        {/* Placeholder catégorie + question */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 rounded-full bg-muted" />
          <div className="h-4 w-48 rounded bg-muted sm:w-64" />
        </div>
        {/* Placeholder icône Plus/Minus */}
        <div className="mt-1 h-4.5 w-4.5 shrink-0 rounded-full bg-muted" />
      </div>
    </div>
  );
}