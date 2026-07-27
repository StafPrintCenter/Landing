import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { SITE } from "@/data/site";
import { fetchJobOfferBySlug } from "@/stores/useJobsStore";
import { ApplyForm } from "@/components/pages/careers/apply";
import { JobOfferNotFoundState } from "@/components/pages/careers/detail";
import { formatSalaryRange, isJobOfferExpired, type APIJobOffer } from "@/data/jobs";

export const Route = createFileRoute("/careers/offers/apply/$slug")({
  loader: async ({ params }) => {
    const offer = await fetchJobOfferBySlug(params.slug);
    if (!offer) throw notFound();
    return { offer };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.offer ? `Postuler : ${loaderData.offer.title} | ${SITE.name}` : `Candidature | ${SITE.name}` },
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
  const salary = formatSalaryRange(offer.salaryMin, offer.salaryMax);
  const expired = isJobOfferExpired(offer);

  return (
    <SiteShell>
      <section className="container-x max-w-2xl py-16">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Candidature</p>
          <h1 className="mt-2 font-display text-3xl font-bold">{offer.title}</h1>
          <p className="mt-2 text-muted-foreground">{offer.department} · {offer.location}</p>
          <p className="mt-2 text-muted-foreground">{offer.department} · {offer.location}</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
            <Clock size={14} /> Postuler avant le {new Date(offer.expiresAt).toLocaleDateString("fr-FR")}
          </span>
          {salary && <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2"><Briefcase size={14} /> {salary}</span>}
          <div>
            <h2 className="font-display text-xl font-bold">Description du poste</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{offer.description}</p>
          </div>
        </Reveal>

        <div className="mt-8">
          {expired ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-destructive">
              Cette offre n'est plus ouverte aux candidatures.
            </div>
          ) : (
            <ApplyForm offer={offer} />
          )}
        </div>
      </section>
    </SiteShell>
  );
}