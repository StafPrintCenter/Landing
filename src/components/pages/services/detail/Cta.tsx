import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface ServiceDetailCtaProps {
  serviceSlug: string;
}

export function ServiceDetailCta({ serviceSlug }: ServiceDetailCtaProps) {
  return (
    <section className="container-x py-20">
      <div className="rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-10 text-center md:p-14">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Prêt à démarrer votre projet ?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">On revient vers vous sous 24h avec un devis clair et sans engagement.</p>

        {/* Redirection vers l'accueil, ancre contact, avec le paramètre quote pré-rempli */}
        <Link
          to="/"
          hash="contact"
          search={{ quote: serviceSlug }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Demander un devis <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}