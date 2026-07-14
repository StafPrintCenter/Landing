import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ServiceHomeCta() {
  return (
    <section className="container-x pb-24">
      <div className="rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-8 text-center md:p-12">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Un projet spécifique en tête ?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Décrivez-nous vos besoins, on revient vers vous avec un devis clair sous 24h.
        </p>

        {/* Redirection vers le formulaire de contact global */}
        <Link
          to="/"
          hash="contact"
          search={{
            quote: "autre",
            custom: "Projet sur mesure",
            details: `Bonjour, \n\nJe souhaite obtenir une étude et un devis personnalisé pour un projet sur mesure qui n'est pas listé dans vos services standards.\n\nVoici la description de mes besoins :\n- Type de service : ex: Enseigne lumineux\n- Besoin principal : [décrivez ici votre idée]\n- Objectif : [résultat attendu]\n\nMerci de me recontacter pour échanger sur les modalités et le devis.`
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Demander un devis sur mesure <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}