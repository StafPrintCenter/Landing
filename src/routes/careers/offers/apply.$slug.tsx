import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  BriefcaseBusiness,
} from "lucide-react";
import { SITE } from "@/data/site";
import { fetchJobOfferBySlug } from "@/stores/useJobsStore";
import { ApplyForm } from "@/components/pages/careers/apply";
import { JobOfferNotFoundState } from "@/components/pages/careers/detail";
import {
  formatSalaryRange,
  isJobOfferExpired,
  JOB_CONTRACT_TYPE_LABELS,
  type APIJobOffer,
} from "@/data/jobs";

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
  const salary = formatSalaryRange(offer.salaryMin, offer.salaryMax);
  const expired = isJobOfferExpired(offer);

  return (
    <SiteShell>
      <div className="bg-muted/30 min-h-[calc(100vh-80px)] py-10 md:py-16">
        <div className="container-x">
          {/* Navigation supérieure (Boutons de retour) */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <Link
              to="/careers/offers/$slug"
              params={{ slug: offer.slug }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-muted"
            >
              <ArrowLeft size={14} /> Retour à l'offre
            </Link>
            <Link
              to="/careers/offers"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <BriefcaseBusiness size={14} /> Toutes les offres
            </Link>
          </div>

          <Reveal>
            <div className="grid gap-8 items-start lg:grid-cols-12">
              {/* Sidebar GAUCHE : Récapitulatif de l'offre */}
              <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {JOB_CONTRACT_TYPE_LABELS[offer.contractType]}
                  </div>

                  <h1 className="mt-3 font-display text-xl font-bold leading-tight text-foreground">
                    {offer.title}
                  </h1>

                  <div className="my-4 h-px bg-border" />

                  {/* Liste des caractéristiques */}
                  <ul className="space-y-3 text-xs">
                    <li className="flex items-center gap-2.5 text-muted-foreground">
                      <Building2 size={16} className="shrink-0 text-primary" />
                      <span>
                        Département :{" "}
                        <strong className="text-foreground font-medium">
                          {offer.department}
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-muted-foreground">
                      <MapPin size={16} className="shrink-0 text-primary" />
                      <span>
                        Lieu :{" "}
                        <strong className="text-foreground font-medium">
                          {offer.location}
                        </strong>
                      </span>
                    </li>
                    {salary && (
                      <li className="flex items-center gap-2.5 text-muted-foreground">
                        <Briefcase size={16} className="shrink-0 text-primary" />
                        <span>
                          Salaire :{" "}
                          <strong className="text-primary font-semibold">
                            {salary}
                          </strong>
                        </span>
                      </li>
                    )}
                    <li className="flex items-center gap-2.5 text-muted-foreground">
                      <Calendar size={16} className="shrink-0 text-primary" />
                      <span>
                        Date limite :{" "}
                        <strong
                          className={
                            expired
                              ? "text-destructive font-medium"
                              : "text-foreground font-medium"
                          }
                        >
                          {new Date(offer.expiresAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </strong>
                      </span>
                    </li>
                  </ul>

                  {/* Extrait de la description */}
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Aperçu du poste
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-5">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </aside>

              {/* Colonne DROITE : Formulaire de candidature */}
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
          </Reveal>
        </div>
      </div>
    </SiteShell>
  );
}