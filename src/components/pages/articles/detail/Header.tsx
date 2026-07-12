import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { getArticleCategoryColor, formatArticleDate, type APIArticle } from "@/data/articles";
import { ShareModal } from "@/components/modal";
import { getShortlinkCategory } from "@/data/shortlinks";
import { buildShareUrl } from "@/lib/share/build-share-url";

interface ArticleDetailHeaderProps {
  article: APIArticle;
}

export function ArticleDetailHeader({ article: a }: ArticleDetailHeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareUrl = buildShareUrl(`/articles/${a.slug}`);

  return (
    <header className="container-x pt-10 md:pt-14">
      <div className="flex items-center justify-between">
        <Link
          to="/articles"
          search={{ category: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 6 }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} /> Retour au blog
        </Link>

        <button
          onClick={() => setIsShareOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
        >
          <Share2 size={14} /> Partager
        </button>
      </div>

      {/* Meta */}
      <div className="mt-8 max-w-3xl">
        <span
          className={[
            "inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
            getArticleCategoryColor(a.category),
          ].join(" ")}
        >
          {a.category}
        </span>

        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          {a.title}
        </h1>

        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{a.excerpt}</p>

        {/* Author + date + read time */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
              {a.author.charAt(0)}
            </span>
            {a.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            {formatArticleDate(a.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {a.readMinutes} min de lecture
          </span>
        </div>
      </div>

      {/* Cover */}
      <div className="mt-10 aspect-video overflow-hidden rounded-2xl">
        <img src={a.cover} alt={a.title} className="h-full w-full object-cover" />
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        title={a.title}
        text={a.excerpt}
        shortlinkCategory={getShortlinkCategory(a.category)}
      />
    </header>
  );
}