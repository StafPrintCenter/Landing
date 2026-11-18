import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { ResourceDetailError, ResourceDetailNotFound, ResourceDetailSkeleton } from "@/components/pages/tools/resources/detail";
import { PaymentLook } from "@/components/pages/tools/resources/look";
import { fetchResourceBySlug } from "@/stores/useResourcesStore";
import { SITE } from "@/data/site";

const searchSchema = z.object({
  status: z.string().optional(),
  id: z.union([z.string(), z.number()]).transform(String).optional(),
  transaction: z.string().optional(),
});

export const Route = createFileRoute("/tools/ressources/$slug/look")({
  validateSearch: searchSchema,
  pendingMs: 0,
  loader: async ({ params }) => {
    const resource = await fetchResourceBySlug(params.slug, { trackView: false });
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData, params }) => {
    const resource = loaderData?.resource;
    const title = resource ? `Paiement - ${resource.title} - ${SITE.name}` : `Paiement ressource - ${SITE.name}`;
    return {
      meta: [
        { title },
        { name: "robots", content: "noindex" },
      ],
      links: [{ rel: "canonical", href: `/tools/ressources/${params.slug}/look` }],
    };
  },
  component: ResourcePaymentLookPage,
  pendingComponent: ResourceDetailSkeleton,
  notFoundComponent: ResourceDetailNotFound,
  errorComponent: ResourceDetailError,
});

function ResourcePaymentLookPage() {
  const { resource } = Route.useLoaderData();
  const { id, status, transaction } = Route.useSearch();

  return (
    <PaymentLook
      resource={resource}
      callbackId={id}
      callbackStatus={status}
      transactionParam={transaction}
    />
  );
}
