import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { fetchJobOfferBySlug } from "@/stores/useJobsStore";
import { JobOfferDetailHeader, JobOfferDetailBody, JobOfferNotFoundState } from "@/components/pages/careers/detail";
import type { APIJobOffer } from "@/data/jobs";

export const Route = createFileRoute("/careers/offers/$slug")({
  loader: async ({ params }) => {
    const offer = await fetchJobOfferBySlug(params.slug);
    if (!offer) throw notFound();
    return { offer };
  },
  head: ({ loaderData }) => {
    const offer = loaderData?.offer;
    return {
      meta: [
        { title: offer ? `${offer.title} | ${SITE.name}` : `Offre | ${SITE.name}` },
        { name: "description", content: offer?.description ?? "" },
      ],
    };
  },
  component: JobOfferDetailPage,
  notFoundComponent: () => (
    <SiteShell>
      <JobOfferNotFoundState />
    </SiteShell>
  ),
});

function JobOfferDetailPage() {
  const { offer } = Route.useLoaderData() as { offer: APIJobOffer };

  return (
    <SiteShell>
      <JobOfferDetailHeader offer={offer} />
      <JobOfferDetailBody offer={offer} />
    </SiteShell>
  );
}