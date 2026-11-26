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
import { buildShareUrl } from "@/lib/share/build-share-url";

export const Route = createFileRoute("/tools/ressources/$slug/")({
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
          ...(resource.cover
            ? [
              { property: "og:image", content: resource.cover },
              { property: "og:image:alt", content: resource.title },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:image", content: resource.cover },
            ]
            : [{ name: "twitter:card", content: "summary" }]),
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: description },
        ]
        : [{ title }, { name: "robots", content: "noindex" }],
      links: [{ rel: "canonical", href: buildShareUrl(url) }],
    };
  },
  component: ResourceDetailPage,
  pendingComponent: ResourceDetailSkeleton,
  notFoundComponent: ResourceDetailNotFound,
  errorComponent: ResourceDetailError,
});

function ResourceDetailPage() {
  const { resource } = Route.useLoaderData();

  return (
    <SiteShell>
      <ResourceDetailHeader resource={resource} />
      <ResourceDetailSections resource={resource} />
      <ResourceDetailRelated resource={resource} />
    </SiteShell>
  );
}
