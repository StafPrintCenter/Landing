import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { SITE_LINK } from "@/data/site";

export function ServiceBriefCta() {
  return (
    <div className="rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-accent/10 p-6">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        <FileText size={14} /> Préparation de projet
      </span>
      <h3 className="mt-4 font-display text-xl font-bold">
        Une idée en tête ? Préparez votre brief.
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Décrivez votre besoin, vos objectifs et votre budget pour générer une fiche projet claire à nous transmettre.
      </p>

      {SITE_LINK.briefUrl ? (
        <a
          href={SITE_LINK.briefUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Préparer mon brief <ArrowUpRight size={16} />
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-muted px-5 py-3 text-sm font-semibold text-muted-foreground"
        >
          Outil de brief indisponible <ArrowRight size={16} />
        </span>
      )}
    </div>
  );
}
