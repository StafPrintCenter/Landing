import { Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { isJobOfferExpired, type APIJobOffer } from "@/data/jobs";

interface JobOfferDetailBodyProps {
  offer: APIJobOffer;
}

export function JobOfferDetailBody({ offer }: JobOfferDetailBodyProps) {
  const expired = isJobOfferExpired(offer);

  return (
    <div className="container-x py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-xl font-bold">Description du poste</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{offer.description}</p>
          </div>

          {offer.responsibilities.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold">Responsabilités</h2>
              <ul className="mt-3 space-y-2">
                {offer.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {offer.requirements.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-bold">Profil recherché</h2>
              <ul className="mt-3 space-y-2">
                {offer.requirements.map((r, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6 h-fit lg:sticky lg:top-24">
          <p className="text-sm text-muted-foreground">Intéressé(e) par ce poste ?</p>
          {expired ? (
            <p className="mt-3 text-sm font-medium text-destructive">Cette offre n'est plus ouverte aux candidatures.</p>
          ) : (
            <Link
              to="/careers/offers/apply/$slug"
              params={{ slug: offer.slug }}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Postuler maintenant <ArrowRight size={16} />
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}