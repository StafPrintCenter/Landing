import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import {
  ResourceDetailError,
  ResourceDetailHeader,
  ResourceDetailNotFound,
  ResourceDetailRelated,
  ResourceDetailSections,
  ResourceDetailSkeleton,
} from "@/components/pages/tools/resources/detail";
import { fetchResourceBySlug } from "@/stores/useResourcesStore";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/tools/ressources/$slug")({
  pendingMs: 0,
  loader: async ({ params }) => {
    const resource = await fetchResourceBySlug(params.slug);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData, params }) => {
    const resource = loaderData?.resource;
    const title = resource ? `${resource.title} - Ressources ${SITE.name}` : `Ressource ${SITE.name}`;
    const description = resource?.short ?? "";
    const url = `/tools/ressources/${params.slug}`;

    return {
      meta: resource
        ? [
          { title },
          { name: "description", content: description },
          { name: "robots", content: "noindex" },
          { property: "og:type", content: "website" },
          { property: "og:title", content: title },
          { property: "og:description", content: description },
          { name: "twitter:card", content: "summary" },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: description },
        ]
        : [{ title }, { name: "robots", content: "noindex" }],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ResourceDetailPage,
  pendingComponent: ResourceDetailSkeleton,
  notFoundComponent: ResourceDetailNotFound,
  errorComponent: ResourceDetailError,
});

function ResourceDetailPage() {
  const { resource } = Route.useLoaderData();
  const isFree = resource.price === 0;
  const discount = resource.discountPercentage || 0;
  const price = new Intl.NumberFormat("fr-FR").format(resource.price);
  const originalPrice = resource.originalPrice
    ? new Intl.NumberFormat("fr-FR").format(resource.originalPrice)
    : null;
  const whatsappUrl = `${SITE.whatsappLink}?text=${encodeURIComponent(
    isFree
      ? `Bonjour STAF PRINT CENTER, je souhaite recevoir gratuitement la ressource « ${resource.title} » (${resource.format}).`
      : `Bonjour STAF PRINT CENTER, je souhaite commander la ressource « ${resource.title} » au prix ${originalPrice
        ? `promotionnel de ${price} FCFA au lieu de ${originalPrice} FCFA (-${discount}%)`
        : `de ${price} FCFA`
      }. Pouvez-vous m'indiquer la marche à suivre ?`,
  )}`;

  return (
    <SiteShell>
      <ResourceDetailHeader resource={resource} whatsappUrl={whatsappUrl} />
      <ResourceDetailSections resource={resource} />
      <ResourceDetailRelated resource={resource} />
    </SiteShell>
  );
}
