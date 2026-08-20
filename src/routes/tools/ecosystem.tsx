import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { ECOSYSTEM_SITES, type EcosystemSiteCategory } from "@/data/ecosystem";
import {
  EcosystemHeader,
  EcosystemFilters,
  EcosystemGrid,
  EcosystemMobileTrigger,
  EcosystemMobileSheet,
  type EcosystemSortDirection,
} from "@/components/pages/tools/ecosystem";

export const Route = createFileRoute("/tools/ecosystem")({
  head: () => ({
    meta: [
      { title: `Notre écosystème | ${SITE.name}` },
      {
        name: "description",
        content: `Retrouvez l'ensemble des plateformes officielles de ${SITE.name} : site web, outils, espaces de formation et communication.`,
      },
      { property: "og:title", content: `Notre écosystème | ${SITE.name}` },
      { property: "og:url", content: "/ecosystem" },
    ],
    links: [{ rel: "canonical", href: "/ecosystem" }],
  }),
  component: EcosystemPage,
});

function EcosystemPage() {
  const [category, setCategory] = useState<EcosystemSiteCategory | "Tout">("Tout");
  const [sortDir, setSortDir] = useState<EcosystemSortDirection>("asc");
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

  const sites = useMemo(() => {
    let list = ECOSYSTEM_SITES;
    if (category !== "Tout") {
      list = list.filter((s) => s.category === category);
    }
    return [...list].sort((a, b) =>
      sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [category, sortDir]);

  const activeFilterCount = category !== "Tout" ? 1 : 0;

  const filtersPanel = (
    <EcosystemFilters
      category={category}
      onCategoryChange={setCategory}
      sortDir={sortDir}
      onSortDirChange={setSortDir}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-16">
        <EcosystemHeader />

        <div className="mt-8">
          {/* Declencheur Mobile */}
          <EcosystemMobileTrigger
            activeFilterCount={activeFilterCount}
            onOpen={() => setFiltersOpen(true)}
          />

          {/* Filtres Desktop */}
          <div className="hidden md:block">{filtersPanel}</div>
        </div>

        <EcosystemGrid sites={sites} />
      </section>

      {/* Tiroir Mobile */}
      <EcosystemMobileSheet
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={sites.length}
      >
        {filtersPanel}
      </EcosystemMobileSheet>
    </SiteShell>
  );
}