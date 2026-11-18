import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import {
  EthiqueChannelsFaq,
  EthiqueFramework,
  EthiqueHero,
  EthiquePillars,
  EthiqueProcess,
  EthiqueReportForm,
  EthiqueScope,
} from "@/components/pages/ethique";
import { SITE } from "@/data/site";

const TITLE = `Signalement éthique & droit d'alerte | ${SITE.name}`;
const DESC = `Signalez de façon anonyme et confidentielle tout fait de corruption, fraude ou conflit d'intérêts. Dispositif conforme à la loi béninoise n° 2011-20.`;

export const Route = createFileRoute("/signalement-ethique")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/signalement-ethique" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/signalement-ethique" }],
  }),
  component: EthiquePage,
});

function EthiquePage() {
  return (
    <SiteShell>
      <EthiqueHero />
      <EthiquePillars />
      <EthiqueFramework />
      <EthiqueScope />
      <EthiqueReportForm />
      <EthiqueProcess />
      <EthiqueChannelsFaq />
    </SiteShell>
  );
}
