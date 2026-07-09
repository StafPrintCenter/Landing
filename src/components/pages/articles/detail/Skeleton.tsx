export function ArticleDetailSkeleton() {
  return (
    <div className="container-x py-12 md:py-16 animate-pulse">
      {/* Back button link placeholder */}
      <div className="h-5 w-28 rounded bg-muted" />

      {/* Header Info */}
      <div className="mt-8 max-w-3xl space-y-4">
        {/* Category badge */}
        <div className="h-6 w-24 rounded-full bg-muted" />

        {/* Title */}
        <div className="h-10 w-3/4 rounded bg-muted md:h-12" />
        <div className="h-10 w-1/2 rounded bg-muted md:h-12" />

        {/* Excerpt */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full rounded bg-muted/70" />
          <div className="h-4 w-5/6 rounded bg-muted/70" />
        </div>

        {/* Author & Date metadata */}
        <div className="flex gap-4 pt-4">
          <div className="h-6 w-28 rounded bg-muted" />
          <div className="h-6 w-24 rounded bg-muted" />
        </div>
      </div>

      {/* Cover image placeholder */}
      <div className="mt-10 aspect-[16/9] w-full rounded-2xl bg-muted" />

      {/* Article Body content placeholder */}
      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        <div className="h-4 w-full rounded bg-muted/60" />
        <div className="h-4 w-11/12 rounded bg-muted/60" />
        <div className="h-4 w-4/5 rounded bg-muted/60" />
        <div className="h-4 w-full rounded bg-muted/60" />
        <div className="h-4 w-9/12 rounded bg-muted/60" />
      </div>
    </div>
  );
}
