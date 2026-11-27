import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { shuffleFaqs } from "@/data/faqs";
import { Pagination, paginate } from "@/components/site/Pagination";
import { SiteShell } from "@/components/site/SiteShell";
import { fetchPublicResources, useResourcesStore } from "@/stores/useResourcesStore";
import { fetchPublicFaqs } from "@/stores/useFaqsStore";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { prefetchPublicResources, PublicResourcePrefetchProvider } from "@/stores/public-resource-prefetch";
import {
  ResourceHomeFilters,
  ResourceHomeFAQ,
  ResourceHomeGrid,
  ResourceHomeHeader,
  ResourceHomeMobileSheet,
  ResourceHomeMobileTrigger,
  ResourceHomeResultsCount,
  ResourceHomeSearchBar,
  RESOURCE_CATEGORIES,
  RESOURCE_PRICE_FILTERS,
  RESOURCE_SORT_OPTIONS,
  RESOURCE_SORT_DIRECTIONS,
  type ResourceCategoryFilter,
  type ResourcePriceFilter,
  type ResourceSortDirection,
  type ResourceSortOption,
} from "@/components/pages/tools/resources/home";
import { SITE } from "@/data/site";

const resourceSearchSchema = z.object({
  category: z.enum(RESOURCE_CATEGORIES).catch("Tout").default("Tout"),
  price: z.enum(RESOURCE_PRICE_FILTERS).catch("all").default("all"),
  sortBy: z.enum(RESOURCE_SORT_OPTIONS).catch("default").default("default"),
  sortDir: z.enum(RESOURCE_SORT_DIRECTIONS).catch("desc").default("desc"),
  query: z.string().catch("").default(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(9).default(9),
});

const RESOURCE_FAQ_CATEGORIES = new Set(["Conseils", "Actus"]);

export const Route = createFileRoute("/tools/ressources/")({
  validateSearch: zodValidator(resourceSearchSchema),
  loaderDeps: ({ search }) => ({
    category: search.category,
    sortBy: search.sortBy,
    sortDir: search.sortDir,
    query: search.query,
  }),
  loader: async ({ deps }) => {
    const listParams = {
      category: deps.category,
      sortBy: deps.sortBy,
      sortDir: deps.sortDir,
      query: deps.query,
    };
    const allResourcesParams = {};
    const faqParams = { perPage: 50 };
    const faqRequest = fetchPublicFaqs(faqParams);
    const [faqResponse, prefetchedResources] = await Promise.all([
      faqRequest.catch(() => undefined),
      prefetchPublicResources([
        {
          resourceKey: "resources",
          params: listParams,
          fetch: () => fetchPublicResources(listParams),
        },
        {
          resourceKey: "resources",
          params: allResourcesParams,
          fetch: () => fetchPublicResources(allResourcesParams),
        },
        {
          resourceKey: "faqs",
          params: faqParams,
          fetch: () => faqRequest,
        },
      ]),
    ]);

    return {
      prefetchedResources,
      selectedFaqIds: shuffleFaqs(
        (faqResponse?.data ?? []).filter((faq) => RESOURCE_FAQ_CATEGORIES.has(faq.category)),
      )
        .slice(0, 4)
        .map((faq) => faq.id),
    };
  },
  head: () => ({
    meta: [
      { title: `Ressources & templates | ${SITE.name}` },
      { name: "description", content: "Gabarits, guides et outils gratuits ou premium pour vos projets d'impression, de design et de communication." },
      { property: "og:title", content: `Ressources & templates | ${SITE.name}` },
      { property: "og:description", content: "Des ressources pratiques pour préparer vos projets d'impression et de design." },
      { property: "og:url", content: buildShareUrl("/tools/ressources") },
    ],
    links: [{ rel: "canonical", href: buildShareUrl("/tools/ressources") }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { prefetchedResources, selectedFaqIds } = Route.useLoaderData();
  return (
    <PublicResourcePrefetchProvider data={prefetchedResources}>
      <ResourcesPageContent selectedFaqIds={selectedFaqIds} />
    </PublicResourcePrefetchProvider>
  );
}

function ResourcesPageContent({ selectedFaqIds }: { selectedFaqIds: string[] }) {
  const { category, price, sortBy, sortDir, query, page, perPage } = useSearch({ from: "/tools/ressources/" });
  const navigate = useNavigate({ from: "/tools/ressources/" });

  const { resources, isLoading: storeLoading, isError, error, refetch } = useResourcesStore({
    category,
    sortBy,
    sortDir,
    query,
  });
  const { resources: allResources } = useResourcesStore();
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
  }, [category, price, sortBy, sortDir, query, page, perPage]);

  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [filtersOpen]);

  const updateSearch = (params: Partial<z.infer<typeof resourceSearchSchema>>) => {
    navigate({
      search: (previous) => ({
        ...previous,
        ...params,
        page: params.page !== undefined ? params.page : 1,
      }),
      replace: true,
    });
  };

  const handleSortChange = (nextSort: ResourceSortOption) => {
    updateSearch({ sortBy: nextSort, sortDir: nextSort === "alpha" ? "asc" : "desc" });
  };

  const priceFilteredResources = resources.filter((resource) =>
    price === "all" || (price === "free" ? resource.price === 0 : resource.price > 0),
  );
  const { data: visibleResources, meta } = paginate(priceFilteredResources, page, perPage);
  const activeFilterCount =
    (category !== "Tout" ? 1 : 0) +
    (price !== "all" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const filtersPanel = (
    <ResourceHomeFilters
      category={category as ResourceCategoryFilter}
      priceFilter={price as ResourcePriceFilter}
      sortBy={sortBy as ResourceSortOption}
      sortDir={sortDir as ResourceSortDirection}
      onCategoryChange={(nextCategory) => updateSearch({ category: nextCategory })}
      onPriceFilterChange={(nextPrice) => updateSearch({ price: nextPrice })}
      onSortChange={handleSortChange}
      onSortDirChange={(nextDirection) => updateSearch({ sortDir: nextDirection })}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-12 md:py-16">
        <ResourceHomeHeader
          totalCount={allResources.length}
          freeCount={allResources.filter((resource) => resource.price === 0).length}
        />

        <div className="mt-10 pb-6">
          <ResourceHomeSearchBar value={query} onChange={(nextQuery) => updateSearch({ query: nextQuery })} />
          <ResourceHomeMobileTrigger activeFilterCount={activeFilterCount} onOpen={() => setFiltersOpen(true)} />
          <div className="hidden md:mt-4 md:block">{filtersPanel}</div>
        </div>

        <ResourceHomeResultsCount
          category={category}
          query={query}
          filteredCount={meta.total}
          totalCount={allResources.length}
          isLoading={isLoading || storeLoading}
        />
        <ResourceHomeGrid
          isLoading={isLoading || storeLoading}
          isError={isError}
          error={error}
          resources={visibleResources}
          onRetry={() => void refetch()}
        />

        {!isLoading && !storeLoading && !isError && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(nextPage) => updateSearch({ page: nextPage })}
            meta={meta}
          />
        )}
      </section>

      <ResourceHomeFAQ selectedFaqIds={selectedFaqIds} />

      <ResourceHomeMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={priceFilteredResources.length}
      >
        {filtersPanel}
      </ResourceHomeMobileSheet>
    </SiteShell>
  );
}
