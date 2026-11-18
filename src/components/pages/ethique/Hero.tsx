import { ArrowRight, ShieldCheck } from "lucide-react";
import { SITE } from "@/data/site";

export function EthiqueHero() {
  return (
    <section className="border-b border-border bg-muted/40">
      <div className="container-x py-16 md:py-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <ShieldCheck className="h-4 w-4" />
          Canal confidentiel - Tolérance zéro corruption
        </span>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold md:text-6xl">
          Dispositif de signalement éthique &amp; droit d'alerte
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {SITE.name} refuse toute forme de corruption, de fraude ou d'arrangement occulte. Si vous
          êtes témoin d'un manquement, vous pouvez nous le signaler en toute sécurité, de manière
          anonyme si vous le souhaitez.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#formulaire"
            className="inline-flex cursor-pointer items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Faire un signalement <ArrowRight size={16} />
          </a>
          <a
            href="#cadre"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
          >
            Notre cadre de référence
          </a>
        </div>

        <blockquote className="mt-12 max-w-2xl border-l-4 border-primary pl-5 text-foreground/80 italic">
          « L'intégrité est la base de la confiance que nos clients nous accordent. Aucun contrat ne
          vaut une compromission. »
          <footer className="mt-2 text-sm not-italic font-semibold text-foreground">
            - {SITE.manager}, Fondateur &amp; responsable de production
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
