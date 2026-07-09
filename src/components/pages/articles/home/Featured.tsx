import { Link } from "@tanstack/react-router";
import { Clock, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getArticleCategoryColor, formatArticleDate, type APIArticle } from "@/data/articles";

interface ArticleFeaturedProps {
  article: APIArticle;
}

export function ArticleHomeFeatured({ article: a }: ArticleFeaturedProps) {
  return (
    <Reveal delay={0.05}>
      <Link
        to="/articles/$slug"
        params={{ slug: a.slug }}
        className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-card transition hover:shadow-lg md:grid-cols-2"
      >
        <div className="aspect-16/10 md:aspect-auto">
          <img
            src={a.cover}
            alt={a.title}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
          <span
            className={[
              "w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
              getArticleCategoryColor(a.category),
            ].join(" ")}
          >
            À LA UNE · {a.category}
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">{a.title}</h2>
          <p className="text-muted-foreground">{a.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
              <span className="h-5 w-5 rounded-full bg-primary/20 text-[10px] font-bold text-primary flex items-center justify-center">
                {a.author.charAt(0)}
              </span>
              {a.author}
            </span>
            <span>{formatArticleDate(a.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} /> {a.readMinutes} min
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Lire l'article <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
