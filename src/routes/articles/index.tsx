import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteShell } from "@/components/site/SiteShell";
import { ARTICLE_CATEGORIES, type ArticleCategory } from "@/data/articles";
import { fetchPublicArticles, useArticlesStore } from "@/stores/useArticlesStore";
import { SITE } from "@/data/site";
import { buildShareUrl } from "@/lib/share/build-share-url";
import {
  prefetchPublicResources,
  PublicResourcePrefetchProvider,
} from "@/stores/public-resource-prefetch";
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
  loaderDeps: ({ search }) => ({
    category: search.category,
    sortBy: search.sortBy,
    sortDir: search.sortDir,
    query: search.query,
    page: search.page,
    perPage: search.perPage,
  }),
  loader: async ({ deps }) => {
    const featuredParams = { sortBy: "date", sortDir: "desc", perPage: 1 };
    const isDefaultListing =
      deps.category === "Tout" && deps.sortBy === "default" && deps.query.trim() === "";
    const listParams = {
      category: deps.category,
      sortBy: deps.sortBy,
      sortDir: deps.sortDir,
      query: deps.query,
      page: isDefaultListing ? 1 : deps.page,
      perPage: isDefaultListing ? deps.page * deps.perPage + 1 : deps.perPage,
    };

    return {
      prefetchedResources: await prefetchPublicResources([
        {
          resourceKey: "articles",
          params: featuredParams,
          fetch: () => fetchPublicArticles(featuredParams),
        },
        {
          resourceKey: "articles",
          params: listParams,
          fetch: () => fetchPublicArticles(listParams),
        },
      ]),
    };
  },
  head: () => ({
    meta: [
      { title: `Blog | ${SITE.name}` },
      { name: "description", content: `Conseils design, astuces impression, actualités web : le blog du studio ${SITE.name}.` },
      { property: "og:title", content: `Blog | ${SITE.name}` },
      { property: "og:description", content: "Tous nos articles pour mieux concevoir et imprimer au Bénin." },
      { property: "og:url", content: buildShareUrl("/articles") },
    ],
    links: [{ rel: "canonical", href: buildShareUrl("/articles") }],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { prefetchedResources } = Route.useLoaderData();
  return (
    <PublicResourcePrefetchProvider data={prefetchedResources}>
      <ArticlesPageContent />
    </PublicResourcePrefetchProvider>
  );
}

function ArticlesPageContent() {
  const { category, sortBy, sortDir, query, page, perPage } = useSearch({ from: "/articles/" });
  const navigate = useNavigate({ from: "/articles/" });

  const isDefaultListing = category === "Tout" && sortBy === "default" && query.trim() === "";
  const isDefaultView = isDefaultListing && page === 1;

  // Article "à la une" : le plus récent, indépendamment des filtres
  const {
    articles: featuredList,
    isLoading: featuredLoading,
  } = useArticlesStore({ sortBy: "date", sortDir: "desc", perPage: 1 });
  const featured = featuredList[0] ?? null;

  const {
    articles: fetchedArticles,
    meta,
    isLoading: articlesLoading,
  } = useArticlesStore({
    category,
    sortBy,
    sortDir,
    query,
    page: isDefaultListing ? 1 : page,
    perPage: isDefaultListing ? page * perPage + 1 : perPage,
  });
  const storeLoading = articlesLoading || (isDefaultListing && featuredLoading);
  const defaultListingArticles = featured
    ? fetchedArticles.filter((article) => article.id !== featured.id)
    : fetchedArticles;
  const displayedArticles = isDefaultListing
    ? defaultListingArticles.slice((page - 1) * perPage, page * perPage)
    : fetchedArticles;
  const gridTotal = Math.max(0, (meta?.total ?? fetchedArticles.length) - (isDefaultListing && featured ? 1 : 0));
  const gridLastPage = Math.max(1, Math.ceil(gridTotal / perPage));
  const gridMeta =
    meta && isDefaultListing && featured
      ? {
          ...meta,
          current_page: Math.min(page, gridLastPage),
          last_page: gridLastPage,
          per_page: perPage,
          total: gridTotal,
          from: gridTotal === 0 ? 0 : (page - 1) * perPage + 1,
          to: Math.min(page * perPage, gridTotal),
        }
      : meta;

  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

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
          filteredCount={meta?.total ?? fetchedArticles.length}
          totalCount={meta?.total ?? fetchedArticles.length}
          isLoading={isLoading || storeLoading}
        />

        <ArticleHomeGrid isLoading={isLoading || storeLoading} articles={displayedArticles} />

        {!isLoading && !storeLoading && gridMeta && gridMeta.last_page > 1 && (
          <Pagination
            currentPage={gridMeta.current_page}
            lastPage={gridMeta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={gridMeta}
          />
        )}
      </section>

      <ArticleHomeMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={meta?.total ?? fetchedArticles.length}
      >
        {filtersPanel}
      </ArticleHomeMobileSheet>
    </SiteShell>
  );
}
