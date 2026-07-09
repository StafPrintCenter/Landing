import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getArticleCategoryColor, formatArticleDate } from "@/data/articles";
import { useArticlesStore } from "@/stores/useArticlesStore";
import { BlogSkeleton } from "@/components/skeleton/HomeBlog";

export function BlogPreview() {
  // Destructuration de isError depuis ton store d'articles
  const { articles, isLoading, isError } = useArticlesStore({ perPage: 3 });

  // 1. Gestion de l'état de chargement
  if (isLoading) {
    return <BlogSkeleton />;
  }

  // 2. Gestion de l'état d'erreur
  if (isError) {
    return (
      <section className="bg-muted">
        <div className="container-x py-24 text-center">
          <div className="inline-block rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-destructive max-w-xl mx-auto">
            <p className="font-semibold text-lg">Oups, une erreur est survenue</p>
            <p className="mt-1 text-sm text-destructive/80">
              Impossible de charger les derniers articles du blog. Veuillez vérifier votre connexion.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted">
      <div className="container-x py-24">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Blog</p>
            <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Conseils & inspirations.</h2>
          </Reveal>
          <Link
            to="/articles"
            search={{ category: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Tous les articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.05}>
              <Link
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card h-full flex flex-col"
              >
                <div className="aspect-16/10 overflow-hidden">
                  <img
                    src={a.cover}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span
                      className={[
                        "inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
                        getArticleCategoryColor(a.category),
                      ].join(" ")}
                    >
                      {a.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground pt-4 border-t border-border/40">
                    {formatArticleDate(a.date)} · {a.readMinutes} min de lecture
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}