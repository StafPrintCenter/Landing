import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { EcosystemHeader, EcosystemGrid } from "@/components/pages/ecosystem";

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
  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <EcosystemHeader />
        <EcosystemGrid />
      </section>
    </SiteShell>
  );
}