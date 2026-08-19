import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { ECOSYSTEM_SITES, type EcosystemSiteCategory } from "@/data/ecosystem";
import { EcosystemHeader, EcosystemFilters, EcosystemGrid, type EcosystemSortDirection } from "@/components/pages/ecosystem";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: `Notre écosystème | ${SITE.name}` },
      { name: "description", content: `Retrouvez l'ensemble des plateformes officielles de ${SITE.name} : site web, outils, espaces de formation et communication.` },
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

  const sites = useMemo(() => {
    let list = ECOSYSTEM_SITES;
    if (category !== "Tout") {
      list = list.filter((s) => s.category === category);
    }
    return [...list].sort((a, b) => (sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }, [category, sortDir]);

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <EcosystemHeader />

        <EcosystemFilters
          category={category}
          onCategoryChange={setCategory}
          sortDir={sortDir}
          onSortDirChange={setSortDir}
        />

        <EcosystemGrid sites={sites} />
      </section>
    </SiteShell>
  );
}