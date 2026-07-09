import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteShell } from "@/components/site/SiteShell";
import { ARTICLE_CATEGORIES, type ArticleCategory } from "@/data/articles";
import { useArticlesStore } from "@/stores/useArticlesStore";
import { SITE } from "@/data/site";
import { Pagination } from "@/components/site/Pagination";
import {
  ArticleHomeHeader,
  ArticleHomeFeatured,
  ArticleHomeSearchBar,
  ArticleHomeFilters,
  ArticleHomeMobileTrigger,
  ArticleHomeMobileSheet,
  ArticleHomeResultsCount,
  ArticleHomeGrid,
  ARTICLE_SORT_OPTIONS,
  ARTICLE_SORT_DIRECTIONS,
  type ArticleSortOption,
  type ArticleSortDirection,
} from "@/components/pages/articles/home";

const articlesSearchSchema = z.object({
  category: z.enum(["Tout", ...ARTICLE_CATEGORIES] as [string, ...string[]]).catch("Tout").default("Tout"),
  sortBy: z.enum(ARTICLE_SORT_OPTIONS).catch("default").default("default"),
  sortDir: z.enum(ARTICLE_SORT_DIRECTIONS).catch("asc").default("asc"),
  query: z.string().catch("").default(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(6).default(6),
});

export const Route = createFileRoute("/articles/")({
  validateSearch: zodValidator(articlesSearchSchema),
  head: () => ({
    meta: [
      { title: `Blog | ${SITE.name}` },
      { name: "description", content: `Conseils design, astuces impression, actualités web : le blog du studio ${SITE.name}.` },
      { property: "og:title", content: `Blog | ${SITE.name}` },
      { property: "og:description", content: "Tous nos articles pour mieux concevoir et imprimer au Bénin." },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { category, sortBy, sortDir, query, page, perPage } = useSearch({ from: "/articles/" });
  const navigate = useNavigate({ from: "/articles/" });

  // Article "à la une" : le plus récent, indépendamment des filtres
  const { articles: featuredList } = useArticlesStore({ sortBy: "date", sortDir: "desc", perPage: 1 });
  const featured = featuredList[0] ?? null;

  const { articles: displayedArticles, meta, isLoading: storeLoading } = useArticlesStore({ category, sortBy, sortDir, query, page, perPage, });

  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [category, sortBy, sortDir, query, page, perPage]);

  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [filtersOpen]);

  const updateSearch = (params: Partial<z.infer<typeof articlesSearchSchema>>) => {
    navigate({
      search: (prev) => {
        const nextPage = params.page !== undefined ? params.page : 1;
        return { ...prev, ...params, page: nextPage };
      },
      replace: true,
    });
  };

  const handleSortChange = (s: ArticleSortOption) => {
    updateSearch({ sortBy: s, sortDir: "asc" });
  };

  // Le bloc "à la une" ne s'affiche que sur la vue par défaut (page 1, sans filtre ni recherche).
  const isDefaultView = category === "Tout" && sortBy === "default" && query.trim() === "" && page === 1;

  const activeFilterCount = (category !== "Tout" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);

  const filtersPanel = (
    <ArticleHomeFilters
      category={category as "Tout" | ArticleCategory}
      sortBy={sortBy as ArticleSortOption}
      sortDir={sortDir as ArticleSortDirection}
      onCategoryChange={(c) => updateSearch({ category: c })}
      onSortChange={handleSortChange}
      onSortDirChange={(d) => updateSearch({ sortDir: d })}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <ArticleHomeHeader />

        {isDefaultView && featured && <ArticleHomeFeatured article={featured} />}

        <div className="mt-12 pb-6">
          <ArticleHomeSearchBar value={query} onChange={(q) => updateSearch({ query: q })} />

          <ArticleHomeMobileTrigger activeFilterCount={activeFilterCount} onOpen={() => setFiltersOpen(true)} />

          <div className="hidden md:mt-4 md:block">{filtersPanel}</div>
        </div>

        <ArticleHomeResultsCount
          category={category as "Tout" | ArticleCategory}
          query={query}
          filteredCount={meta?.total ?? displayedArticles.length}
          totalCount={meta?.total ?? displayedArticles.length}
          isLoading={isLoading || storeLoading}
        />

        <ArticleHomeGrid isLoading={isLoading || storeLoading} articles={displayedArticles} />

        {!isLoading && !storeLoading && meta && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={meta}
          />
        )}
      </section>

      <ArticleHomeMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={meta?.total ?? displayedArticles.length}
      >
        {filtersPanel}
      </ArticleHomeMobileSheet>
    </SiteShell>
  );
}
