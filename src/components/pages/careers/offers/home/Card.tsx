import { Link } from "@tanstack/react-router";
import { MapPin, Briefcase, Clock, Users, Laptop } from "lucide-react";
import { JOB_CONTRACT_TYPE_LABELS, JOB_WORK_MODE_LABELS, formatSalaryRange, isJobOfferExpired, type APIJobOffer, } from "@/data/jobs";

interface CareersHomeCardProps {
  offer: APIJobOffer;
}

export function CareersHomeCard({ offer }: CareersHomeCardProps) {
  const salary = formatSalaryRange(offer.salaryMin, offer.salaryMax);
  const expired = isJobOfferExpired(offer);
  const workModeLabel = JOB_WORK_MODE_LABELS[offer.workMode] ?? offer.workMode;

  return (
    <Link
      to="/careers/offers/$slug"
      params={{ slug: offer.slug }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {JOB_CONTRACT_TYPE_LABELS[offer.contractType] ?? offer.contractType}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            <Laptop size={12} />
            {workModeLabel}
          </span>
        </div>

        {expired && (
          <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-[11px] font-semibold text-destructive">
            Clôturée
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold transition-colors group-hover:text-primary">
        {offer.title}
      </h3>
      <p className="mt-0.5 text-xs font-medium text-muted-foreground">{offer.department}</p>

      {offer.summary && (
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground/90">{offer.summary}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} /> {offer.location}
        </span>

        {offer.numPositions > 1 && (
          <span className="inline-flex items-center gap-1 font-medium text-foreground/80">
            <Users size={12} /> {offer.numPositions} postes
          </span>
        )}

        {salary && (
          <span className="inline-flex items-center gap-1">
            <Briefcase size={12} /> {salary}
          </span>
        )}

        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> Jusqu'au {new Date(offer.expiresAt).toLocaleDateString("fr-FR")}
        </span>
      </div>
    </Link>
  );
}