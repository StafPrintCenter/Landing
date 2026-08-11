import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, BarChart3, Share2, Users, Calendar, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { formatDate, getThemeColor, type APIFormation } from "@/data/trainings";
import { ShareModal } from "@/components/modal";
import { getShortlinkCategory } from "@/data/shortlinks";
import { buildShareUrl } from "@/lib/share/build-share-url";

interface FormationDetailHeaderProps {
  formation: APIFormation;
}

export function FormationDetailHeader({ formation: f }: FormationDetailHeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareUrl = buildShareUrl(`/trainings/${f.id}`);
  const isFull = f.seatsRemaining !== null && f.seatsRemaining <= 0;

  const mainColor = f.coverColor || "var(--primary)";

  return (
    <section className="relative border-b border-border bg-muted overflow-hidden py-8">
      <div className="container-x">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/trainings"
            search={{ theme: "Tout", sortBy: "default", sortDir: "asc", query: "", availableOnly: false, page: 1, perPage: 9 }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Toutes les formations
          </Link>

          <button
            onClick={() => setIsShareOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
          >
            <Share2 size={14} /> Partager
          </button>
        </div>

        <Reveal>
          <div className="flex gap-6 items-stretch">
            {/* Pilier de couleur à gauche */}
            <div
              className="w-2 rounded-full shrink-0 hidden sm:block"
              style={{ backgroundColor: mainColor }}
            />

            <div className="flex-1">
              <span
                className={[
                  "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                  getThemeColor(f.theme),
                ].join(" ")}
              >
                {f.theme}
              </span>
              <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{f.title}</h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{f.short}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border">
                  <Clock size={14} />{f.duration}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border">
                  <BarChart3 size={14} />Niveau {f.level}
                </span>
                {f.startDate && f.endDate && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border">
                    <Calendar size={14} />Du {formatDate(f.startDate)} au {formatDate(f.endDate)}
                  </span>
                )}
                {f.seatsRemaining !== null && (
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 border ${isFull
                      ? "bg-destructive/10 border-destructive/20 text-destructive font-semibold"
                      : "bg-card border-border text-muted-foreground"
                      }`}
                  >
                    <Users size={14} />
                    {isFull
                      ? "Session complète"
                      : `${f.seatsRemaining} place${f.seatsRemaining > 1 ? "s" : ""} disponible${f.seatsRemaining > 1 ? "s" : ""}`}
                  </span>
                )}
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-white shadow-sm"
                  style={{ backgroundColor: mainColor }}
                >
                  {f.price.toLocaleString("fr-FR")} FCFA
                </span>
              </div>

          {f.registrationDeadline && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <AlertCircle size={14} className="text-amber-500" />
              Date limite de préinscription : <strong className="text-foreground">{formatDate(f.registrationDeadline)}</strong>
            </p>
          )}
        </Reveal>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        title={f.title}
        text={f.short}
        shortlinkCategory={getShortlinkCategory(f.theme)}
      />
    </section>
  );
}