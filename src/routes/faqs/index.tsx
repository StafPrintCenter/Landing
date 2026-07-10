import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteShell } from "@/components/site/SiteShell";
import { DISCIPLINES } from "@/data/categories";
import { useFaqsStore } from "@/stores/useFaqsStore";
import { SITE } from "@/data/site";
import { Pagination } from "@/components/site/Pagination";
import {
  FaqHomeHeader,
  FaqHomeSearchBar,
  FaqHomeFilters,
  FaqHomeMobileTrigger,
  FaqHomeMobileSheet,
  FaqHomeResultsCount,
  FaqHomeGrid,
  FAQ_SORT_OPTIONS,
  FAQ_SORT_DIRECTIONS,
  type FaqSortOption,
  type FaqSortDirection,
} from "@/components/pages/faqs";

const faqsSearchSchema = z.object({
  category: z.enum(["Tout", ...DISCIPLINES] as [string, ...string[]]).catch("Tout").default("Tout"),
  sortBy: z.enum(FAQ_SORT_OPTIONS).catch("default").default("default"),
  sortDir: z.enum(FAQ_SORT_DIRECTIONS).catch("asc").default("asc"),
  query: z.string().catch("").default(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(20).default(20),
  open: z.string().optional(),
});

export const Route = createFileRoute("/faqs/")({
  validateSearch: zodValidator(faqsSearchSchema),
  head: () => ({
    meta: [
      { title: `FAQ | ${SITE.name}` },
      { name: "description", content: `Toutes les réponses à vos questions sur les services, formations et réalisations de ${SITE.name}.` },
      { property: "og:title", content: `FAQ | ${SITE.name}` },
      { property: "og:url", content: "/faqs" },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  const { category, sortBy, sortDir, query, page, perPage, open } = useSearch({ from: "/faqs/" });
  const navigate = useNavigate({ from: "/faqs/" });

  const { faqs, meta, isLoading: storeLoading } = useFaqsStore({ category, sortBy, sortDir, query, page, perPage });

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

  const updateSearch = (params: Partial<z.infer<typeof faqsSearchSchema>>) => {
    navigate({
      search: (prev) => {
        const nextPage = params.page !== undefined ? params.page : 1;
        return { ...prev, ...params, page: nextPage };
      },
      replace: true,
    });
  };

  const handleSortChange = (s: FaqSortOption) => {
    updateSearch({ sortBy: s, sortDir: "asc" });
  };

  const activeFilterCount = (category !== "Tout" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);

  const filtersPanel = (
    <FaqHomeFilters
      category={category as any}
      sortBy={sortBy as FaqSortOption}
      sortDir={sortDir as FaqSortDirection}
      onCategoryChange={(c) => updateSearch({ category: c })}
      onSortChange={handleSortChange}
      onSortDirChange={(d) => updateSearch({ sortDir: d })}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <FaqHomeHeader />

        <div className="mt-10 pb-6">
          <FaqHomeSearchBar value={query} onChange={(q) => updateSearch({ query: q })} />

          <FaqHomeMobileTrigger activeFilterCount={activeFilterCount} onOpen={() => setFiltersOpen(true)} />

          <div className="hidden md:mt-4 md:block">{filtersPanel}</div>
        </div>

        <FaqHomeResultsCount
          category={category}
          query={query}
          filteredCount={meta?.total ?? faqs.length}
          totalCount={meta?.total ?? faqs.length}
          isLoading={isLoading || storeLoading}
        />

        <FaqHomeGrid isLoading={isLoading || storeLoading} faqs={faqs} openId={open} />

        {!isLoading && !storeLoading && meta && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={meta}
          />
        )}
      </section>

      <FaqHomeMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={meta?.total ?? faqs.length}
      >
        {filtersPanel}
      </FaqHomeMobileSheet>
    </SiteShell>
  );
}