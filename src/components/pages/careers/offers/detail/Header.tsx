import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Briefcase, Clock, Share2, Users, Laptop, GraduationCap } from "lucide-react";
import {
  JOB_CONTRACT_TYPE_LABELS,
  JOB_WORK_MODE_LABELS,
  JOB_EDUCATION_LEVEL_LABELS,
  formatSalaryRange,
  isJobOfferExpired,
  type APIJobOffer,
  type JobEducationLevel,
} from "@/data/jobs";
import { ShareModal } from "@/components/modal";
import { buildShareUrl } from "@/lib/share/build-share-url";

/**
 * Helper pour calculer le temps restant avant la date d'expiration
 */
function calculateTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - new Date().getTime();

  if (diff <= 0) {
    return null;
  }

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;

  const weeks = Math.floor(diff / WEEK);
  const days = Math.floor((diff % WEEK) / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / SECOND);

  // Construction dynamique de la chaîne (ex: "2 sem 3 jours 04 h 12 min 08 sec")
  const parts: string[] = [];
  if (weeks > 0) parts.push(`${weeks} sem`);
  if (days > 0) parts.push(`${days} jour${days > 1 ? "s" : ""}`);
  parts.push(`${hours}h`);
  parts.push(`${minutes}min`);
  parts.push(`${seconds}sec`);

  return parts.join(" ");
}

/**
 * Hook personnalisé pour rafraîchir le compte à rebours chaque seconde
 */
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState<string | null>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);

      // Si l'offre vient d'expirer, on stoppe l'intervalle
      if (!remaining) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

interface JobOfferDetailHeaderProps {
  offer: APIJobOffer;
}

export function JobOfferDetailHeader({ offer }: JobOfferDetailHeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const salary = formatSalaryRange(offer.salaryMin, offer.salaryMax);
  const expired = isJobOfferExpired(offer);
  const shareUrl = buildShareUrl(`/careers/offers/${offer.slug}`);
  const countdown = useCountdown(offer.expiresAt);

  const workModeLabel = JOB_WORK_MODE_LABELS[offer.workMode] ?? offer.workMode;
  const educationLabel =
    offer.educationLevel && offer.educationLevel in JOB_EDUCATION_LEVEL_LABELS
      ? JOB_EDUCATION_LEVEL_LABELS[offer.educationLevel as JobEducationLevel]
      : offer.educationLevel;

  const formattedDate = new Date(offer.expiresAt).toLocaleDateString("fr-FR");

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
              {JOB_CONTRACT_TYPE_LABELS[offer.contractType] ?? offer.contractType}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Laptop size={13} />
              {workModeLabel}
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

            {offer.numPositions > 0 && (
              <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 font-medium">
                <Users size={14} /> {offer.numPositions} {offer.numPositions > 1 ? "postes ouverts" : "poste ouvert"}
              </span>
            )}

            {educationLabel && (
              <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
                <GraduationCap size={14} /> {educationLabel}
              </span>
            )}

            {salary && (
              <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
                <Briefcase size={14} /> {salary}
              </span>
            )}

            <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
              <Clock size={14} /> Jusqu'au {new Date(offer.expiresAt).toLocaleDateString("fr-FR")}
            </span>

            {/* Inscription de la date + Compte à rebours dynamique */}
            <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2">
              <Clock size={14} className={countdown ? "text-primary animate-pulse" : "text-muted-foreground"} />
              {countdown ? (
                <span>
                  Expire dans <strong className="font-semibold text-foreground">{countdown}</strong>
                </span>
              ) : (
                <span>Clôturée le {new Date(offer.expiresAt).toLocaleDateString("fr-FR")}</span>
              )}
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