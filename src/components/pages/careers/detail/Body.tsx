import { CheckCircle2, FileText, Target, UserCheck } from "lucide-react";
import type { APIJobOffer } from "@/data/jobs";

interface JobOfferDetailBodyProps {
  offer: APIJobOffer;
}

export function JobOfferDetailBody({ offer }: JobOfferDetailBodyProps) {
  return (
    <div className="space-y-8 lg:col-span-2">
      {/* 1. Résumé & Description */}
      <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 border-b border-border/60 pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              À propos du poste
            </h2>
            <p className="text-xs text-muted-foreground">
              Présentation générale et contexte de la mission
            </p>
          </div>
        </div>

        {/* Accroche / Summary si disponible */}
        {offer.summary && (
          <div className="mt-6 rounded-xl border-l-4 border-primary bg-muted/40 p-4 text-sm font-medium italic text-foreground/90">
            « {offer.summary} »
          </div>
        )}

        {/* Description détaillée */}
        <div className="mt-6 text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
          {offer.description}
        </div>
      </section>

      {/* 2. Missions principales */}
      {offer.missions && offer.missions.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target size={20} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Missions & Responsabilités
              </h2>
              <p className="text-xs text-muted-foreground">
                Ce que vous accomplirez au quotidien
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {offer.missions.map((mission, index) => (
              <li
                key={index}
                className="group flex items-start gap-3.5 rounded-xl border border-transparent bg-muted/30 p-3.5 transition-all"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary transition-colors">
                  {index + 1}
                </div>
                <span className="text-sm font-medium leading-relaxed text-foreground/90 pt-0.5">
                  {mission}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 3. Profil recherché */}
      {offer.profile && offer.profile.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 border-b border-border/60 pb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserCheck size={20} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Profil & Compétences requis
              </h2>
              <p className="text-xs text-muted-foreground">
                Les prérequis pour réussir dans ce rôle
              </p>
            </div>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-1">
            {offer.profile.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-xl border border-border/50 bg-card p-3.5 text-sm transition-all hover:border-primary/30 hover:shadow-2xs"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="font-medium leading-relaxed text-foreground/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}