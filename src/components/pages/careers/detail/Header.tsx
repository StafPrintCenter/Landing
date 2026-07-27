import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Briefcase, Clock, Share2 } from "lucide-react";
import { JOB_CONTRACT_TYPE_LABELS, formatSalaryRange, isJobOfferExpired, type APIJobOffer } from "@/data/jobs";
import { ShareModal } from "@/components/modal";
import { buildShareUrl } from "@/lib/share/build-share-url";

interface JobOfferDetailHeaderProps {
  offer: APIJobOffer;
}

export function JobOfferDetailHeader({ offer }: JobOfferDetailHeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const salary = formatSalaryRange(offer.salaryMin, offer.salaryMax);
  const expired = isJobOfferExpired(offer);
  const shareUrl = buildShareUrl(`/careers/offers/${offer.slug}`);

  return (
    <>
      <header className="container-x pt-10 md:pt-14">
        <div className="flex items-center justify-between">
          <Link
            to="/careers/offers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Toutes les offres
          </Link>

          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
          >
            <Share2 size={14} /> Partager
          </button>
        </div>

        <div className="mt-6 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {JOB_CONTRACT_TYPE_LABELS[offer.contractType]}
            </span>
            {expired && (
              <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                Offre clôturée
              </span>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold">{offer.title}</h1>
          <p className="mt-1 text-muted-foreground">{offer.department}</p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
              <MapPin size={14} /> {offer.location}
            </span>
            {salary && (
              <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
                <Briefcase size={14} /> {salary}
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
              <Clock size={14} /> Jusqu'au {new Date(offer.expiresAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      </header>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        title={offer.title}
        text={`Offre d'emploi : ${offer.title} chez ${offer.department}`}
        shortlinkCategory="other"
      />
    </>
  );
}