import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

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