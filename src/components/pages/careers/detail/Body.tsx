import { CheckCircle2 } from "lucide-react";
import type { APIJobOffer } from "@/data/jobs";
import { JobOfferDetailSidebar } from "./Sidebar";

interface JobOfferDetailBodyProps {
  offer: APIJobOffer;
}

export function JobOfferDetailBody({ offer }: JobOfferDetailBodyProps) {
  return (
    <section className="container-x py-12">
      <div className="grid gap-12 items-start lg:grid-cols-3">
        {/* Contenu principal (2 colonnes sur desktop) */}
        <div className="space-y-10 lg:col-span-2">
          {/* Description */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Description du poste
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {offer.description}
            </p>
          </div>

          {/* Responsabilités */}
          {offer.responsibilities && offer.responsibilities.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Responsabilités principales
              </h2>
              <ul className="mt-4 space-y-3">
                {offer.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Profil recherché */}
          {offer.requirements && offer.requirements.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Profil & Compétences requises
              </h2>
              <ul className="mt-4 space-y-3">
                {offer.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar (1 colonne sur desktop) */}
        <JobOfferDetailSidebar offer={offer} />
      </div>
    </section>
  );
}