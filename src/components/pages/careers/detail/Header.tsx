import { Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Briefcase, Clock } from "lucide-react";
import { JOB_CONTRACT_TYPE_LABELS, formatSalaryRange, isJobOfferExpired, type APIJobOffer } from "@/data/jobs";

interface JobOfferDetailHeaderProps {
  offer: APIJobOffer;
}

export function JobOfferDetailHeader({ offer }: JobOfferDetailHeaderProps) {
  const salary = formatSalaryRange(offer.salaryMin, offer.salaryMax);
  const expired = isJobOfferExpired(offer);

  return (
    <header className="container-x pt-10 md:pt-14">
      <Link to="/careers/offers" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft size={14} /> Toutes les offres
      </Link>

      <div className="mt-6 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {JOB_CONTRACT_TYPE_LABELS[offer.contractType]}
          </span>
          {expired && (
            <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">Offre clôturée</span>
          )}
        </div>

        <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold">{offer.title}</h1>
        <p className="mt-1 text-muted-foreground">{offer.department}</p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2"><MapPin size={14} /> {offer.location}</span>
          {salary && <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2"><Briefcase size={14} /> {salary}</span>}
          <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
            <Clock size={14} /> Jusqu'au {new Date(offer.expiresAt).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>
    </header>
  );
}