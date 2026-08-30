import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { ECOSYSTEM_CATEGORIES, type EcosystemSiteCategory, type EcosystemSiteStatus } from "@/data/ecosystem";
import { useEcosystemSitesStore } from "@/stores/useEcosystemSitesStore";
import { Pagination } from "@/components/site/Pagination";
import {
  EcosystemHeader,
  EcosystemSearchBar,
  EcosystemFilters,
  EcosystemResultsCount,
  EcosystemGrid,
  EcosystemMobileTrigger,
  EcosystemMobileSheet,
  type EcosystemSortOption,
} from "@/components/pages/tools/ecosystem";

const ecosystemSearchSchema = z.object({
  category: z.enum(["Tout", ...ECOSYSTEM_CATEGORIES] as [string, ...string[]]).catch("Tout").default("Tout"),
  status: z.enum(["Tout", "available", "building"]).catch("Tout").default("Tout"),
  sortBy: z.enum(["default", "asc", "desc"]).catch("default").default("default"),
  query: z.string().catch("").default(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(20).default(20),
});

export const Route = createFileRoute("/tools/ecosystem")({
  validateSearch: zodValidator(ecosystemSearchSchema),
  head: () => ({
    meta: [
      { title: `Notre écosystème | ${SITE.name}` },
      { name: "description", content: `Retrouvez l'ensemble des plateformes officielles de ${SITE.name} : site vitrine, outils, espaces de formation et communication.` },
      { property: "og:title", content: `Notre écosystème | ${SITE.name}` },
      { property: "og:url", content: "/tools/ecosystem" },
    ],
    links: [{ rel: "canonical", href: "/tools/ecosystem" }],
  }),
  component: EcosystemPage,
});

function EcosystemPage() {
  const { category, status, sortBy, query, page, perPage } = useSearch({ from: "/tools/ecosystem" });
  const navigate = useNavigate({ from: "/tools/ecosystem" });

  const { sites, meta, isLoading: storeLoading } = useEcosystemSitesStore({ category, status, sortBy, query, page, perPage });

  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [category, status, sortBy, query, page, perPage]);

  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [filtersOpen]);

  const updateSearch = (params: Partial<z.infer<typeof ecosystemSearchSchema>>) => {
    navigate({
      search: (prev) => {
        const nextPage = params.page !== undefined ? params.page : 1;
        return { ...prev, ...params, page: nextPage };
      },
      replace: true,
    });
  };

  const activeFilterCount =
    (category !== "Tout" ? 1 : 0) +
    (status !== "Tout" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0) +
    (query.trim() !== "" ? 1 : 0);

  const filtersPanel = (
    <EcosystemFilters
      category={category as EcosystemSiteCategory | "Tout"}
      onCategoryChange={(c) => updateSearch({ category: c })}
      status={status as EcosystemSiteStatus | "Tout"}
      onStatusChange={(s) => updateSearch({ status: s })}
      sortBy={sortBy as EcosystemSortOption}
      onSortChange={(s) => updateSearch({ sortBy: s })}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <EcosystemHeader />

        <div className="mt-10 pb-6">
          <EcosystemSearchBar value={query} onChange={(q) => updateSearch({ query: q })} />

          <EcosystemMobileTrigger
            activeFilterCount={activeFilterCount}
            onOpen={() => setFiltersOpen(true)}
          />

          <div className="hidden md:mt-4 md:block">{filtersPanel}</div>
        </div>

        <EcosystemResultsCount
          category={category}
          query={query}
          filteredCount={meta?.total ?? sites.length}
          totalCount={meta?.total ?? sites.length}
          isLoading={isLoading || storeLoading}
        />

        <EcosystemGrid isLoading={isLoading || storeLoading} sites={sites} />

        {!isLoading && !storeLoading && meta && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={meta}
          />
        )}
      </section>

      <EcosystemMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={meta?.total ?? sites.length}
      >
        {filtersPanel}
      </EcosystemMobileSheet>
    </SiteShell>
  );
}