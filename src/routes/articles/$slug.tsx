import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { fetchArticleBySlug, useArticlesStore } from "@/stores/useArticlesStore";
import { type APIArticle } from "@/data/articles";
import { SITE } from "@/data/site";
import {
  ArticleDetailHeader,
  ArticleDetailBody,
  ArticleDetailRelated,
  ArticleDetailNotFound,
  ArticleDetailError,
  ArticleDetailSkeleton,
} from "@/components/pages/articles/detail";

export const Route = createFileRoute("/articles/$slug")({
  pendingMs: 0,
  loader: async ({ params }) => {
    const article = await fetchArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const article = loaderData?.article;
    const title = article ? `${article.title} | ${SITE.name}` : `Article ${SITE.name}`;
    const desc = article ? article.excerpt : "";
    const url = `/articles/${params.slug}`;

    return {
      meta: article
        ? [
          { title },
          { name: "description", content: desc },
          { property: "og:type", content: "article" },
          { property: "og:title", content: title },
          { property: "og:description", content: desc },
          { property: "og:image", content: article.cover },
          { property: "og:image:alt", content: article.title },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: article.title },
          { name: "twitter:description", content: article.excerpt },
          { name: "twitter:image", content: article.cover },
          { property: "og:url", content: url },
        ]
        : [],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ArticlePage,
  pendingComponent: ArticleDetailSkeleton,
  notFoundComponent: ArticleDetailNotFound,
  errorComponent: ArticleDetailError,
});

function ArticlePage() {
  const data = Route.useLoaderData() as { article: APIArticle };
  const article = data.article;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Articles liés : même catégorie, hors article courant
  const { articles: relatedRaw } = useArticlesStore({ category: article.category, perPage: 4 });
  const related = relatedRaw.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <SiteShell>
      <div className="fixed left-0 top-16 z-40 h-1 w-full bg-transparent md:top-20">
        <div
          className="h-full bg-primary transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="pb-16">
        <ArticleDetailHeader article={article} />
        <ArticleDetailBody html={article.body ?? ""} />
      </article>

      <ArticleDetailRelated related={related} />
    </SiteShell>
  );
}