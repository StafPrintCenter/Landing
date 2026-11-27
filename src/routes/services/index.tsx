import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { shuffleFaqs, type APIFaq } from "@/data/faqs";
import { SITE } from "@/data/site";
import { SiteShell } from "@/components/site/SiteShell";
import { fetchPublicServices, useServicesStore } from "@/stores/useServicesStore";
import { fetchPublicFaqs } from "@/stores/useFaqsStore";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { prefetchPublicResources, PublicResourcePrefetchProvider } from "@/stores/public-resource-prefetch";
import { SERVICE_CATEGORIES } from "@/data/services";
import { Pagination } from "@/components/site/Pagination";
import {
  ServiceHomeHeader,
  ServiceHomeFAQ,
  ServiceHomeSearchBar,
  ServiceHomeFilters,
  ServiceHomeMobileTrigger,
  ServiceHomeMobileSheet,
  ServiceHomeResultsCount,
  ServiceHomeGrid,
  SERVICE_SORT_OPTIONS,
  SERVICE_SORT_DIRECTIONS,
  type ServiceSortOption,
  type ServiceSortDirection,
} from "@/components/pages/services/home";

const CATEGORY_VALUES = SERVICE_CATEGORIES.map((c) => c.value);
const SERVICE_FAQ_EXCLUDED_CATEGORIES = new Set(["formation", "formations", "conseils", "actus"]);

function selectServiceFaqs(faqs: APIFaq[]): APIFaq[] {
  const grouped = faqs
    .filter((faq) => !SERVICE_FAQ_EXCLUDED_CATEGORIES.has(faq.category.toLowerCase()))
    .reduce<Record<string, APIFaq[]>>((acc, faq) => {
      (acc[faq.category] ??= []).push(faq);
      return acc;
    }, {});

  const onePerCategory = Object.values(grouped)
    .map((items) => shuffleFaqs(items)[0])
    .filter((faq): faq is APIFaq => faq !== undefined);

  return shuffleFaqs(onePerCategory);
}

const servicesSearchSchema = z.object({
  category: z.enum(["Tout", ...CATEGORY_VALUES] as [string, ...string[]]).catch("Tout").default("Tout"),
  sortBy: z.enum(SERVICE_SORT_OPTIONS).catch("default").default("default"),
  sortDir: z.enum(SERVICE_SORT_DIRECTIONS).catch("asc").default("asc"),
  query: z.string().catch("").default(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(9).default(9),
});

export const Route = createFileRoute("/services/")({
  validateSearch: zodValidator(servicesSearchSchema),
  loaderDeps: ({ search }) => ({
    category: search.category,
    sortBy: search.sortBy,
    sortDir: search.sortDir,
    query: search.query,
    page: search.page,
    perPage: search.perPage,
  }),
  loader: async ({ deps }) => {
    const listParams = {
      category: deps.category,
      sortBy: deps.sortBy,
      sortDir: deps.sortDir,
      query: deps.query,
      page: deps.page,
      perPage: deps.perPage,
    };
    const allServicesParams = { perPage: 100 };
    const faqParams = { perPage: 50 };
    const faqRequest = fetchPublicFaqs(faqParams);
    const [faqResponse, prefetchedResources] = await Promise.all([
      faqRequest.catch(() => undefined),
      prefetchPublicResources([
        {
          resourceKey: "services",
          params: listParams,
          fetch: () => fetchPublicServices(listParams),
        },
        {
          resourceKey: "services",
          params: allServicesParams,
          fetch: () => fetchPublicServices(allServicesParams),
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
      selectedFaqIds: selectServiceFaqs(faqResponse?.data ?? []).map((faq) => faq.id),
    };
  },
  head: () => ({
    meta: [
      { title: `Nos services | ${SITE.name}` },
      { name: "description", content: "Design graphique, impression, sites web, vidéo, badges, roll-up et formations." },
      { property: "og:title", content: `Nos services | ${SITE.name}` },
      { property: "og:description", content: "Un studio complet pour donner forme à vos idées." },
      { property: "og:url", content: buildShareUrl("/services") },
    ],
    links: [{ rel: "canonical", href: buildShareUrl("/services") }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { prefetchedResources, selectedFaqIds } = Route.useLoaderData();
  return (
    <PublicResourcePrefetchProvider data={prefetchedResources}>
      <ServicesPageContent selectedFaqIds={selectedFaqIds} />
    </PublicResourcePrefetchProvider>
  );
}

function ServicesPageContent({ selectedFaqIds }: { selectedFaqIds: string[] }) {
  const { category, sortBy, sortDir, query, page, perPage } = useSearch({ from: "/services/" });
  const navigate = useNavigate({ from: "/services/" });
  const { services: processedList, meta, isLoading: storeLoading } = useServicesStore({ category, sortBy, sortDir, query, page, perPage });
  const { services: allServices } = useServicesStore({ perPage: 100 });

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

  const updateSearch = (params: Partial<z.infer<typeof servicesSearchSchema>>) => {
    navigate({
      search: (prev) => {
        const nextPage = params.page !== undefined ? params.page : 1;
        return { ...prev, ...params, page: nextPage };
      },
      replace: true,
    });
  };

  const handleSortChange = (s: ServiceSortOption) => {
    updateSearch({ sortBy: s, sortDir: "asc" });
  };

  const activeFilterCount = (category !== "Tout" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);

  const filtersPanel = (
    <ServiceHomeFilters
      category={category as any}
      sortBy={sortBy as ServiceSortOption}
      sortDir={sortDir as ServiceSortDirection}
      onCategoryChange={(c) => updateSearch({ category: c })}
      onSortChange={handleSortChange}
      onSortDirChange={(d) => updateSearch({ sortDir: d })}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <ServiceHomeHeader />

        <div className="mt-10 pb-6">
          <ServiceHomeSearchBar value={query} onChange={(q) => updateSearch({ query: q })} />

          {/* Mobile */}
          <ServiceHomeMobileTrigger activeFilterCount={activeFilterCount} onOpen={() => setFiltersOpen(true)} />

          {/* Desktop */}
          <div className="hidden md:mt-4 md:block">{filtersPanel}</div>
        </div>

        <ServiceHomeResultsCount
          category={category as any}
          query={query}
          filteredCount={meta?.total ?? processedList.length}
          totalCount={allServices.length}
          isLoading={isLoading || storeLoading}
        />

        <ServiceHomeGrid isLoading={isLoading || storeLoading} services={processedList} />

        {!isLoading && !storeLoading && meta && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={meta}
          />
        )}
      </section>

      {/* Section FAQ & CTA latéral */}
      <ServiceHomeFAQ selectedFaqIds={selectedFaqIds} />

      {/* Tiroir mobile */}
      <ServiceHomeMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={meta?.total ?? processedList.length}
      >
        {filtersPanel}
      </ServiceHomeMobileSheet>
    </SiteShell>
  );
}