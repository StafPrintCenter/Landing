import { CheckCircle2 } from "lucide-react";
import type { APIJobOffer } from "@/data/jobs";

interface JobOfferDetailBodyProps {
  offer: APIJobOffer;
}

export function JobOfferDetailBody({ offer }: JobOfferDetailBodyProps) {
  return (
    <div className="space-y-10 lg:col-span-2">
      {/* Description du poste */}
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Description du poste
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
          {offer.description}
        </p>
      </div>

      {/* Missions principales */}
      {offer.missions && offer.missions.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Missions principales
          </h2>
          <ul className="mt-4 space-y-3">
            {offer.missions.map((mission, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="leading-relaxed">{mission}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Profil recherché */}
      {offer.profile && offer.profile.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Profil & Compétences requises
          </h2>
          <ul className="mt-4 space-y-3">
            {offer.profile.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}