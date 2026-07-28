import { Building2, MapPin, Calendar, Briefcase, ArrowLeft, BriefcaseBusiness, Users, GraduationCap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { JOB_CONTRACT_TYPE_LABELS, formatSalaryRange, isJobOfferExpired, type APIJobOffer } from "@/data/jobs";

// Helper de correspondance pour le niveau d'études
const EDUCATION_LEVEL_LABELS: Record<string, string> = {
  sans_diplome: "Sans diplôme",
  bepc: "BEPC",
  bac: "BAC",
  "bac+2": "BAC +2 (BTS, DUT...)",
  "bac+3": "BAC +3 (Licence...)",
  master: "BAC +5 (Master, DEA...)",
  doctorat: "Doctorat",
};

interface ApplySidebarProps {
  offer: APIJobOffer;
}

export function ApplySidebar({ offer }: ApplySidebarProps) {
  const salary = formatSalaryRange(offer.salaryMin, offer.salaryMax);
  const expired = isJobOfferExpired(offer);
  const positions = offer.numPositions ?? offer.numPositions;

  // Libellé propre pour le niveau d'études
  const formattedEducationLevel = offer.educationLevel
    ? EDUCATION_LEVEL_LABELS[offer.educationLevel] || offer.educationLevel
    : null;

  return (
    <aside className="sticky top-24 self-start space-y-4 lg:col-span-4">
      {/* Boutons de retour */}
      <div className="flex flex-wrap items-center gap-2.5">
        <Link
          to="/careers/offers/$slug"
          params={{ slug: offer.slug }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-muted cursor-pointer"
        >
          <ArrowLeft size={14} /> Retour à l'offre
        </Link>
        <Link
          to="/careers/offers"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground cursor-pointer"
        >
          <BriefcaseBusiness size={14} /> Toutes les offres
        </Link>
      </div>

      {/* Carte récapitulative de l'offre */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {JOB_CONTRACT_TYPE_LABELS[offer.contractType] || offer.contractType?.toUpperCase()}
          </div>

          {/* Nombre de postes */}
          {positions !== undefined && positions > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              <Users size={12} className="text-primary" />
              {positions} poste{positions > 1 ? "s" : "dd"}
            </span>
          )}
        </div>

        <h1 className="mt-3 font-display text-xl font-bold leading-tight text-foreground">
          {offer.title}
        </h1>

        <div className="my-4 h-px bg-border" />

        {/* Détails */}
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

          {/* Niveau d'études requis */}
          {formattedEducationLevel && (
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <GraduationCap size={16} className="shrink-0 text-primary" />
              <span>
                Niveau d'études :{" "}
                <strong className="text-foreground font-medium">
                  {formattedEducationLevel}
                </strong>
              </span>
            </li>
          )}

          {salary && (
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <Briefcase size={16} className="shrink-0 text-primary" />
              <span>
                Salaire :{" "}
                <strong className="text-primary font-semibold">{salary}</strong>
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

        {/* Aperçu de la description */}
        {offer.description && (
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Aperçu du poste
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-5">
              {offer.description}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}