import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { fetchServiceBySlug } from "@/stores/useServicesStore";
import { type APIService, getServiceProcess } from "@/data/services";
import { SITE } from "@/data/site";
import {
  ServiceDetailHeader,
  ServiceDetailFeatures,
  ServiceDetailProcess,
  ServiceDetailRelated,
  ServiceDetailOthers,
  ServiceDetailCta,
  ServiceDetailSkeleton,
  ServiceDetailNotFound,
  ServiceDetailError,
} from "@/components/pages/services/detail";

export const Route = createFileRoute("/services/$slug")({
  pendingMs: 0,

  loader: async ({ params }) => {
    const service = await fetchServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },

  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} | ${SITE.name}` : `Service | ${SITE.name}`;
    const desc = s ? s.long : "";
    const url = `/services/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },

  component: ServiceDetailPage,
  pendingComponent: ServiceDetailSkeleton,
  notFoundComponent: ServiceDetailNotFound,
  errorComponent: ServiceDetailError,
});

function ServiceDetailPage() {
  const data = Route.useLoaderData() as { service: APIService };
  const s = data.service;

  return (
    <SiteShell>
      <ServiceDetailHeader service={s} />
      <ServiceDetailFeatures features={s.features} />
      <ServiceDetailProcess process={getServiceProcess(s)} />
      <ServiceDetailRelated projectCategory={s.projectCategory} />
      <ServiceDetailOthers currentSlug={s.slug} />
      <ServiceDetailCta serviceSlug={s.slug} />
    </SiteShell>
  );
}