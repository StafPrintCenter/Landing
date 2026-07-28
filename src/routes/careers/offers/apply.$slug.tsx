import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { fetchJobOfferBySlug } from "@/stores/useJobsStore";
import { ApplyForm, ApplySidebar } from "@/components/pages/careers/apply";
import { JobOfferNotFoundState } from "@/components/pages/careers/detail";
import { isJobOfferExpired, type APIJobOffer } from "@/data/jobs";

export const Route = createFileRoute("/careers/offers/apply/$slug")({
  loader: async ({ params }) => {
    const offer = await fetchJobOfferBySlug(params.slug);
    if (!offer) throw notFound();
    return { offer };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.offer
          ? `Postuler : ${loaderData.offer.title} | ${SITE.name}`
          : `Candidature | ${SITE.name}`,
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ApplyPage,
  notFoundComponent: () => (
    <SiteShell>
      <JobOfferNotFoundState />
    </SiteShell>
  ),
});

function ApplyPage() {
  const { offer } = Route.useLoaderData() as { offer: APIJobOffer };
  const expired = isJobOfferExpired(offer);

  return (
    <SiteShell>
      <div className="bg-muted/30 min-h-[calc(100vh-80px)] py-10 md:py-16">
        <div className="container-x">
          <div className="grid gap-8 items-start lg:grid-cols-12">
            {/* Sidebar GAUCHE autonome (Sticky) */}
            <ApplySidebar offer={offer} />

            {/* Contenu DROITE (Formulaire) */}
            <main className="lg:col-span-8">
              {expired ? (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center text-sm font-medium text-destructive">
                  Cette offre est clôturée et n'accepte plus de nouvelles candidatures.
                </div>
              ) : (
                <ApplyForm offer={offer} />
              )}
            </main>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}