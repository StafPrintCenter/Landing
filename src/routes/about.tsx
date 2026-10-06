import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import {
  AboutHero,
  AboutStats,
  AboutHistory,
  AboutMachines,
  AboutExpertise,
  AboutProcess,
  AboutEngagements,
  AboutFounder,
  AboutCta,
} from "@/components/pages/services/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Notre atelier - ${SITE.name}` },
      {
        name: "description",
        content: `Visitez l'atelier ${SITE.name} à Porto-Novo : parc machines, savoir-faire local, finitions et engagements de production.`,
      },
    ],
  }),
  component: AtelierPage,
});

function AtelierPage() {
  return (
    <SiteShell>
      <AboutHero />
      <AboutStats />
      <AboutHistory />
      <AboutMachines />
      <AboutExpertise />
      <AboutProcess />
      <AboutEngagements />
      <AboutFounder />
      <AboutCta />
    </SiteShell>
  );
}