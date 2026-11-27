import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SITE } from "@/data/site";
import { SiteShell } from "@/components/site/SiteShell";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { prefetchPublicResources, PublicResourcePrefetchProvider } from "@/stores/public-resource-prefetch";
import { fetchPublicArticles, fetchPublicFormations, fetchPublicProjects, fetchPublicResources, fetchPublicServices } from "@/stores";
import { } from "@/stores/useResourcesStore";
import { } from "@/stores/useServicesStore";
import { fetchPublicStats } from "@/stores/useStatsStore";
import { fetchPublicTestimonials } from "@/stores/useTestimonialsStore";
import {
  Hero,
  Stats,
  ServicesPreview,
  WhyUs,
  ProjectsPreview,
  FormationsPreview,
  Testimonials,
  BlogPreview,
  ResourcesPreview,
  Contact,
} from "@/components/pages/home";

// Cibler un service précis et préremplir une demande de devis depuis une carte de service.
const homeSearchSchema = z.object({
  quote: z.string().optional(),
  service: z.string().optional(),
  custom: z.string().optional(),
  details: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: homeSearchSchema,
  loader: async () => {
    const requests = [
      { resourceKey: "services", params: { perPage: 100 }, fetch: () => fetchPublicServices({ perPage: 100 }) },
      { resourceKey: "projects", params: { perPage: 6 }, fetch: () => fetchPublicProjects({ perPage: 6 }) },
      { resourceKey: "articles", params: { perPage: 3 }, fetch: () => fetchPublicArticles({ perPage: 3 }) },
      { resourceKey: "formations", params: { perPage: 3 }, fetch: () => fetchPublicFormations({ perPage: 3 }) },
      { resourceKey: "resources", params: { perPage: 100 }, fetch: () => fetchPublicResources({ perPage: 100 }) },
      { resourceKey: "stats", params: {}, fetch: () => fetchPublicStats() },
      { resourceKey: "testimonials", params: {}, fetch: () => fetchPublicTestimonials() },
    ];

    return { prefetchedResources: await prefetchPublicResources(requests) };
  },
  head: () => ({
    meta: [
      { title: `Design, Impression & Formations à Porto-Novo | ${SITE.name}` },
      { name: "description", content: "Studio créatif béninois : design graphique, impression numérique, sites web, montage vidéo et formations. Devis rapide sur WhatsApp." },
      { property: "og:title", content: `Design, Impression & Formations à Porto-Novo | ${SITE.name}` },
      { property: "og:description", content: "Donnez vie à vos idées avec un studio créatif basé à Porto-Novo." },
      { property: "og:url", content: buildShareUrl("/") },
    ],
    links: [{ rel: "canonical", href: buildShareUrl("/") }],
  }),
  component: HomePage,
});

function HomePage() {
  const { prefetchedResources } = Route.useLoaderData();

  return (
    <PublicResourcePrefetchProvider data={prefetchedResources}>
      <SiteShell>
        <Hero />
        <Stats />
        <ServicesPreview />
        <WhyUs />
        <ProjectsPreview />
        <FormationsPreview />
        <Testimonials />
        <BlogPreview />
        <ResourcesPreview />
        <Contact />
      </SiteShell>
    </PublicResourcePrefetchProvider>
  );
}
