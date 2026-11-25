import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, FileText, Sparkles } from "lucide-react";
import { SITE_LINK } from "@/data/site";

export function ServiceHomeCta() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles size={14} /> Projet sur mesure
        </div>

        <h3 className="mt-4 font-display text-xl font-bold md:text-2xl">
          Un projet spécifique en tête ?
        </h3>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Décrivez-nous vos besoins, nous revenons vers vous avec une étude et un devis clair sous 24h.
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <Link
          to="/"
          hash="contact"
          search={{
            quote: "autre",
            custom: "Projet sur mesure",
            details: `Bonjour, \n\nJe souhaite obtenir une étude et un devis personnalisé pour un projet sur mesure qui n'est pas listé dans vos services standards.\n\nVoici la description de mes besoins :\n- Type de service : ex: Enseigne lumineuse\n- Besoin principal : [décrivez ici votre idée]\n- Objectif : [résultat attendu]\n\nMerci de me recontacter pour échanger sur les modalités et le devis.`,
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Demander un devis sur mesure <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export function ServiceBriefCta() {
  return (
    <section className="container-x py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 md:p-10">
        <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/5" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FileText size={14} /> Préparation de projet
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
              Une idée en tête ? Préparez votre brief.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              Décrivez votre besoin, vos objectifs et votre budget pour générer une fiche projet claire à nous transmettre.
            </p>
          </div>

          {SITE_LINK.briefUrl ? (
            <a
              href={SITE_LINK.briefUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Préparer mon brief <ArrowUpRight size={16} />
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-muted px-6 py-3 text-sm font-semibold text-muted-foreground"
            >
              Outil de brief indisponible <ArrowRight size={16} />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}