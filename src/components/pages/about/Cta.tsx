import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/data/site";

export function AboutCta() {
  return (
    <section className="container-x pb-24">
      <div className="rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-8 text-center md:p-12">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Passez voir l'atelier avant de commander.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          On vous montre les machines, les finitions et les épreuves. Vous
          repartez avec un devis clair et une date de retrait.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/tools/appointment"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
          >
            Prendre rendez-vous <ArrowRight size={16} />
          </Link>
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary"
          >
            Écrire sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}