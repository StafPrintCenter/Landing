import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteShell } from "@/components/site/SiteShell";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";
import { useProjectsStore } from "@/stores/useProjectsStore";
import { SITE } from "@/data/site";
import { useUI } from "@/store/ui";
import { Pagination } from "@/components/site/Pagination";
import {
  RealisationHomeHeader,
  RealisationHomeSearchBar,
  RealisationHomeFilters,
  RealisationHomeMobileTrigger,
  RealisationHomeMobileSheet,
  RealisationHomeResultsCount,
  RealisationHomeGrid,
  RealisationHomeLightbox,
  REALISATION_SORT_OPTIONS,
  REALISATION_SORT_DIRECTIONS,
  type RealisationSortOption,
  type RealisationSortDirection,
} from "@/components/pages/projects";

const realisationsSearchSchema = z.object({
  category: z.enum(["Tout", ...PROJECT_CATEGORIES] as [string, ...string[]]).catch("Tout").default("Tout"),
  sortBy: z.enum(REALISATION_SORT_OPTIONS).catch("default").default("default"),
  sortDir: z.enum(REALISATION_SORT_DIRECTIONS).catch("asc").default("asc"),
  query: z.string().catch("").default(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(9).default(9),
  open: z.string().optional(),
});

export const Route = createFileRoute("/projects/")({
  validateSearch: zodValidator(realisationsSearchSchema),
  head: () => ({
    meta: [
      { title: `Réalisations | ${SITE.name}` },
      { name: "description", content: "Portfolio complet : design graphique, impression, sites web, vidéos et formations réalisés à Porto-Novo et au Bénin." },
      { property: "og:title", content: `Portfolio - ${SITE.name}` },
      { property: "og:description", content: "Découvrez nos projets récents : design, impression, web, vidéo." },
    ],
  }),
  component: RealisationsPage,
});

function RealisationsPage() {
  const { category, sortBy, sortDir, query, page, perPage, open } = useSearch({ from: "/projects/" });
  const navigate = useNavigate({ from: "/projects/" });

  const { lightboxIndex, openLightbox, closeLightbox, setLightboxIndex } = useUI();

  const { projects, meta, isLoading: storeLoading } = useProjectsStore({ category, sortBy, sortDir, query, page, perPage });

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

  const updateSearch = (params: Partial<z.infer<typeof realisationsSearchSchema>>) => {
    navigate({
      search: (prev) => {
        const nextPage = params.page !== undefined ? params.page : 1;
        return { ...prev, ...params, page: nextPage };
      },
      replace: true,
    });
  };

  const handleSortChange = (s: RealisationSortOption) => {
    updateSearch({ sortBy: s, sortDir: "asc" });
  };

  // Ouverture automatique via le paramètre de recherche URL (?open=id), sur la page courante
  useEffect(() => {
    if (open) {
      const targetIndex = projects.findIndex((p) => p.id === open || `project-${p.id}` === open);
      if (targetIndex !== -1) {
        setLightboxIndex(targetIndex);
      }
      updateSearch({ open: undefined });
    }
  }, [open, projects, setLightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % projects.length);
      if (e.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + projects.length) % projects.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, projects.length, closeLightbox, setLightboxIndex]);

  const current = lightboxIndex !== null ? projects[lightboxIndex] : null;

  const activeFilterCount = (category !== "Tout" ? 1 : 0) + (sortBy !== "default" ? 1 : 0);

  const filtersPanel = (
    <RealisationHomeFilters
      category={category as "Tout" | ProjectCategory}
      sortBy={sortBy as RealisationSortOption}
      sortDir={sortDir as RealisationSortDirection}
      onCategoryChange={(c) => updateSearch({ category: c })}
      onSortChange={handleSortChange}
      onSortDirChange={(d) => updateSearch({ sortDir: d })}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <RealisationHomeHeader />

        <div className="mt-10 pb-6">
          <RealisationHomeSearchBar value={query} onChange={(q) => updateSearch({ query: q })} />

          <RealisationHomeMobileTrigger activeFilterCount={activeFilterCount} onOpen={() => setFiltersOpen(true)} />

          <div className="hidden md:mt-4 md:block">{filtersPanel}</div>
        </div>

        <RealisationHomeResultsCount
          category={category}
          query={query}
          filteredCount={meta?.total ?? projects.length}
          totalCount={meta?.total ?? projects.length}
          isLoading={isLoading || storeLoading}
        />

        <RealisationHomeGrid isLoading={isLoading || storeLoading} projects={projects} onOpen={openLightbox} />

        {!isLoading && !storeLoading && meta && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={meta}
          />
        )}
      </section>

      <RealisationHomeLightbox
        current={current}
        onClose={closeLightbox}
        onPrev={() => current && setLightboxIndex((lightboxIndex! - 1 + projects.length) % projects.length)}
        onNext={() => current && setLightboxIndex((lightboxIndex! + 1) % projects.length)}
      />

      <RealisationHomeMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={meta?.total ?? projects.length}
      >
        {filtersPanel}
      </RealisationHomeMobileSheet>
    </SiteShell>
  );
}
