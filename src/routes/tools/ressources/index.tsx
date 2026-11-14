import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Pagination, paginate } from "@/components/site/Pagination";
import { SiteShell } from "@/components/site/SiteShell";
import { useResourcesStore } from "@/stores/useResourcesStore";
import {
  ResourceHomeFilters,
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
} from "@/components/pages/resources/home";
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

export const Route = createFileRoute("/tools/ressources/")({
  validateSearch: zodValidator(resourceSearchSchema),
  head: () => ({
    meta: [
      { title: `Ressources & templates | ${SITE.name}` },
      { name: "description", content: "Gabarits, guides et outils gratuits ou premium pour vos projets d'impression, de design et de communication." },
      { property: "og:title", content: `Ressources & templates | ${SITE.name}` },
      { property: "og:description", content: "Des ressources pratiques pour préparer vos projets d'impression et de design." },
      { property: "og:url", content: "/tools/ressources" },
    ],
    links: [{ rel: "canonical", href: "/appointment" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { category, price, sortBy, sortDir, query, page, perPage } = useSearch({ from: "/tools/ressources/" });
  const navigate = useNavigate({ from: "/tools/ressources/" });

  const { resources, isLoading: storeLoading, isError, error, refetch,
  } = useResourcesStore({ category, sortBy, sortDir, query });
  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 350);
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
        <nav aria-label="Fil d'Ariane" className="mb-8 flex flex-wrap items-center gap-3 text-sm text-foreground/60">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <Link to="/tests" className="hover:text-primary">Tests</Link>
          <span>/</span>
          <span className="text-foreground">Ressources</span>
        </nav>

        <ResourceHomeHeader
          totalCount={resources.length}
          freeCount={resources.filter((resource) => resource.price === 0).length}
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
          totalCount={resources.length}
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

      <section className="container-x pb-14">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-lg font-semibold">Une ressource vous manque ?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Dites-nous quel modèle ou quel guide vous ferait gagner du temps.</p>
          </div>
          <a href="/#contact" className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
            Suggérer une ressource
          </a>
        </div>
      </section>

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
