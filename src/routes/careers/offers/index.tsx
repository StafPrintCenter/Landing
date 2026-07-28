import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteShell } from "@/components/site/SiteShell";
import { Pagination } from "@/components/site/Pagination";
import { SITE } from "@/data/site";
import { JOB_CONTRACT_TYPES, type JobContractType } from "@/data/jobs";
import { useJobOffersStore } from "@/stores/useJobsStore";
import {
  CareersHomeHeader,
  CareersHomeSearchBar,
  CareersHomeFilters,
  CareersHomeMobileTrigger,
  CareersHomeMobileSheet,
  CareersHomeResultsCount,
  CareersHomeGrid,
  CareersHomeInternshipCta,
  CAREER_SORT_OPTIONS,
  CAREER_SORT_DIRECTIONS,
  type CareerSortOption,
  type CareerSortDirection,
} from "@/components/pages/careers/offers/home";

const careersSearchSchema = z.object({
  contractType: z.enum(["Tout", ...JOB_CONTRACT_TYPES] as [string, ...string[]]).catch("Tout").default("Tout"),
  sortBy: z.enum(CAREER_SORT_OPTIONS).catch("default").default("default"),
  sortDir: z.enum(CAREER_SORT_DIRECTIONS).catch("desc").default("desc"),
  query: z.string().catch("").default(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(9).default(9),
});

export const Route = createFileRoute("/careers/offers/")({
  validateSearch: zodValidator(careersSearchSchema),
  head: () => ({
    meta: [
      { title: `Carrières | ${SITE.name}` },
      {
        name: "description",
        content: `Découvrez les offres d'emploi ouvertes chez ${SITE.name} et postulez en ligne.`,
      },
      { property: "og:title", content: `Carrières | ${SITE.name}` },
      { property: "og:url", content: "/careers/offers" },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { contractType, sortBy, sortDir, query, page, perPage } = useSearch({
    from: "/careers/offers/",
  });
  const navigate = useNavigate({ from: "/careers/offers/" });

  const { offers, meta, isLoading: storeLoading, } = useJobOffersStore({ contractType, sortBy, sortDir, query, page, perPage });

  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [contractType, sortBy, sortDir, query, page, perPage]);

  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [filtersOpen]);

  const updateSearch = (params: Partial<z.infer<typeof careersSearchSchema>>) => {
    navigate({
      search: (prev) => {
        const nextPage = params.page !== undefined ? params.page : 1;
        return { ...prev, ...params, page: nextPage };
      },
      replace: true,
    });
  };

  const handleSortChange = (s: CareerSortOption) => {
    updateSearch({ sortBy: s, sortDir: "desc" });
  };

  const activeFilterCount = (contractType !== "Tout" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);

  const filtersPanel = (
    <CareersHomeFilters
      contractType={contractType as "Tout" | JobContractType}
      sortBy={sortBy as CareerSortOption}
      sortDir={sortDir as CareerSortDirection}
      onContractTypeChange={(c) => updateSearch({ contractType: c })}
      onSortChange={handleSortChange}
      onSortDirChange={(d) => updateSearch({ sortDir: d })}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-16">
        <CareersHomeHeader />
        <CareersHomeInternshipCta />

        <div className="mt-10 pb-6">
          <CareersHomeSearchBar value={query} onChange={(q) => updateSearch({ query: q })} />

          <CareersHomeMobileTrigger
            activeFilterCount={activeFilterCount}
            onOpen={() => setFiltersOpen(true)}
          />

          <div className="hidden md:mt-4 md:block">{filtersPanel}</div>
        </div>

        <CareersHomeResultsCount
          contractType={contractType}
          query={query}
          filteredCount={meta?.total ?? offers.length}
          totalCount={meta?.total ?? offers.length}
          isLoading={isLoading || storeLoading}
        />

        <CareersHomeGrid isLoading={isLoading || storeLoading} offers={offers} />

        {!isLoading && !storeLoading && meta && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={meta}
          />
        )}
      </section>

      <CareersHomeMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={meta?.total ?? offers.length}
      >
        {filtersPanel}
      </CareersHomeMobileSheet>
    </SiteShell>
  );
}