import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { ECOSYSTEM_SITES, type EcosystemSiteCategory } from "@/data/ecosystem";
import {
  EcosystemHeader,
  EcosystemSearchBar,
  EcosystemFilters,
  EcosystemResultsCount,
  EcosystemGrid,
  EcosystemMobileTrigger,
  EcosystemMobileSheet,
  type EcosystemSortDirection,
} from "@/components/pages/tools/ecosystem";

const ecosystemSearchSchema = z.object({
  category: z.string().catch("Tout").default("Tout"),
  sortDir: z.enum(["asc", "desc"]).catch("asc").default("asc"),
  query: z.string().catch("").default(""),
});

export const Route = createFileRoute("/tools/ecosystem")({
  validateSearch: zodValidator(ecosystemSearchSchema),
  head: () => ({
    meta: [
      { title: `Notre écosystème | ${SITE.name}` },
      {
        name: "description",
        content: `Retrouvez l'ensemble des plateformes officielles de ${SITE.name} : site web, outils, espaces de formation et communication.`,
      },
      { property: "og:title", content: `Notre écosystème | ${SITE.name}` },
      { property: "og:url", content: "/tools/ecosystem" },
    ],
    links: [{ rel: "canonical", href: "/tools/ecosystem" }],
  }),
  component: EcosystemPage,
});

function EcosystemPage() {
  const { category, sortDir, query } = useSearch({ from: "/tools/ecosystem" });
  const navigate = useNavigate({ from: "/tools/ecosystem" });

  const [filtersOpen, setFiltersOpen] = useState(false);

  // Lock scroll en arrière-plan lorsque la sheet mobile est ouverte
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
      search: (prev) => ({ ...prev, ...params }),
      replace: true,
    });
  };

  const filteredSites = useMemo(() => {
    let list = ECOSYSTEM_SITES;

    if (category !== "Tout") {
      list = list.filter((s) => s.category === category);
    }

    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return [...list].sort((a, b) =>
      sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [category, sortDir, query]);

  const activeFilterCount = (category !== "Tout" ? 1 : 0) + (query.trim() !== "" ? 1 : 0);

  const filtersPanel = (
    <EcosystemFilters
      category={category as EcosystemSiteCategory | "Tout"}
      onCategoryChange={(c) => updateSearch({ category: c })}
      sortDir={sortDir as EcosystemSortDirection}
      onSortDirChange={(d) => updateSearch({ sortDir: d })}
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
          filteredCount={filteredSites.length}
          totalCount={ECOSYSTEM_SITES.length}
        />

        <EcosystemGrid sites={filteredSites} />
      </section>

      <EcosystemMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={filteredSites.length}
      >
        {filtersPanel}
      </EcosystemMobileSheet>
    </SiteShell>
  );
}