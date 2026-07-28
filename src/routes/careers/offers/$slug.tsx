import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { fetchJobOfferBySlug } from "@/stores/useJobsStore";
import { JobOfferDetailHeader, JobOfferDetailBody, JobOfferDetailSidebar, JobOfferNotFoundState, } from "@/components/pages/careers/offers/detail";
import type { APIJobOffer } from "@/data/jobs";

export const Route = createFileRoute("/careers/offers/$slug")({
  pendingMs: 0,

  loader: async ({ params }) => {
    const offer = await fetchJobOfferBySlug(params.slug);
    if (!offer) throw notFound();
    return { offer };
  },

  head: ({ loaderData, params }) => {
    const offer = loaderData?.offer;
    const title = offer ? `${offer.title} | ${SITE.name}` : `Offre d'emploi | ${SITE.name}`;
    const desc = offer
      ? `${offer.title} (${offer.department}) à ${offer.location}. ${offer.description.slice(0, 140)}…`
      : "";
    const url = `/careers/offers/${params.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: offer
        ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: offer.title,
              description: offer.description,
              datePosted: offer.createdAt,
              validThrough: offer.expiresAt,
              employmentType: offer.contractType,
              hiringOrganization: {
                "@type": "Organization",
                name: SITE.name,
                sameAs: SITE.socials.facebook,
              },
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: offer.location,
                  addressCountry: "BJ",
                },
              },
            }),
          },
        ]
        : [],
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

      {/* Conteneur principal Grille de la page */}
      <section className="container-x py-12">
        <div className="grid gap-12 items-start lg:grid-cols-3">
          {/* Contenu principal (2 colonnes) */}
          <JobOfferDetailBody offer={offer} />

          {/* Sidebar Sticky (1 colonne) */}
          <JobOfferDetailSidebar offer={offer} />
        </div>
      </section>
    </SiteShell>
  );
}