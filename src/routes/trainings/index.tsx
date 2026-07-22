import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { FORMATION_THEMES } from "@/data/formations";
import { useFormationsStore } from "@/stores/useFormationsStore";
import { Pagination } from "@/components/site/Pagination";
import {
  FormationHomeHeader,
  FormationHomeFAQ,
  FormationHomeSearchBar,
  FormationHomeFilters,
  FormationHomeMobileTrigger,
  FormationHomeMobileSheet,
  FormationHomeResultsCount,
  FormationHomeGrid,
  FORMATION_SORT_OPTIONS,
  FORMATION_SORT_DIRECTIONS,
  type FormationSortOption,
  type FormationSortDirection,
} from "@/components/pages/training/home";

const trainingSearchSchema = z.object({
  theme: z.enum(["Tout", ...FORMATION_THEMES]).catch("Tout"),
  sortBy: z.enum(FORMATION_SORT_OPTIONS).catch("default"),
  sortDir: z.enum(FORMATION_SORT_DIRECTIONS).catch("asc"),
  query: z.string().catch(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(4).default(4),
});

export const Route = createFileRoute("/trainings/")({
  validateSearch: (search) => trainingSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: `Formations | ${SITE.name}` },
      { name: "description", content: "Formations certifiantes en design, web, impression et vidéo à Porto-Novo. Apprenez des compétences métiers demandées." },
    ],
  }),
  component: FormationsPage,
});

function FormationsPage() {
  const { theme, sortBy, sortDir, query, page, perPage } = useSearch({ from: "/trainings/" });
  const navigate = useNavigate({ from: "/trainings/" });

  const { formations: processedList, meta, isLoading: storeLoading } = useFormationsStore({ category: theme, sortBy, sortDir, query, page, perPage });

  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [theme, sortBy, sortDir, query, page, perPage]);

  // Verrouille le scroll pendant que le tiroir de filtres mobile est ouvert
  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [filtersOpen]);

  const updateSearch = (params: Partial<z.infer<typeof trainingSearchSchema>>) => {
    navigate({
      search: (prev) => {
        const nextPage = params.page !== undefined ? params.page : 1;
        return { ...prev, ...params, page: nextPage };
      },
      replace: true,
    });
  };

  const handleSortChange = (s: FormationSortOption) => {
    updateSearch({ sortBy: s, sortDir: "asc" });
  };

  const activeFilterCount = (theme !== "Tout" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);

  const filtersPanel = (
    <FormationHomeFilters
      theme={theme}
      sortBy={sortBy as FormationSortOption}
      sortDir={sortDir as FormationSortDirection}
      onThemeChange={(t) => updateSearch({ theme: t })}
      onSortChange={handleSortChange}
      onSortDirChange={(d) => updateSearch({ sortDir: d })}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <FormationHomeHeader />

        <div className="mt-10 pb-6">
          <FormationHomeSearchBar value={query} onChange={(q) => updateSearch({ query: q })} />

          {/* Mobile : filtres masqués derrière un trigger + tiroir */}
          <FormationHomeMobileTrigger activeFilterCount={activeFilterCount} onOpen={() => setFiltersOpen(true)} />

          {/* Desktop : filtres visibles en ligne */}
          <div className="hidden md:mt-4 md:block">{filtersPanel}</div>
        </div>

        <FormationHomeResultsCount
          theme={theme}
          query={query}
          filteredCount={meta?.total ?? processedList.length}
          totalCount={meta?.total ?? processedList.length}
          isLoading={isLoading || storeLoading}
        />

        <FormationHomeGrid isLoading={isLoading || storeLoading} formations={processedList} />

        {!isLoading && !storeLoading && meta && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={meta}
          />
        )}
      </section>

      <FormationHomeFAQ />

      {/* Tiroir de filtres mobile */}
      <FormationHomeMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={meta?.total ?? processedList.length}
      >
        {filtersPanel}
      </FormationHomeMobileSheet>
    </SiteShell>
  );
}
