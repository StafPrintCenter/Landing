import { Link } from "@tanstack/react-router";
import { getArticleCategoryColor, type APIArticle } from "@/data/articles";
import { Clock, User } from "lucide-react";

interface ArticleRelatedProps {
  related: APIArticle[];
}

export function ArticleDetailRelated({ related }: ArticleRelatedProps) {
  if (related.length === 0) return null;

  return (
    <section className="bg-muted">
      <div className="container-x py-16">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Articles similaires</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.slug}
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={a.cover}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span
                  className={[
                    "inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
                    getArticleCategoryColor(a.category),
                  ].join(" ")}
                >
                  {a.category}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <User size={11} /> {a.author}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} /> {a.readMinutes} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
