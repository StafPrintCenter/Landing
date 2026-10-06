import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import images from "@/assets/images.json";
import { useDarkMode } from "@/hooks/use-dark-mode";

export function AboutCta() {
  const dark = useDarkMode();

  return (
    <>
      {/* Fondateur */}
      <section className="container-x pb-20 md:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-8 md:p-12">
            <Quote
              size={90}
              className="absolute -right-4 -top-4 text-primary/10"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-border bg-card p-1">
                <img
                  src={dark ? images.stafMw : images.stafMc}
                  alt="Steve Aster"
                  width={88}
                  height={88}
                  loading="lazy"
                  className="h-full w-full rounded-full object-cover object-center"
                />
              </div>
              <div className="max-w-2xl">
                <p className="font-display text-xl font-semibold md:text-2xl">
                  {SITE.manager}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-primary">
                  Fondateur &amp; responsable de production
                </p>
                <p className="mt-5 text-lg italic text-muted-foreground">
                  « Mon métier, ce n'est pas de vendre des feuilles imprimées. C'est de faire en sorte qu'une idée qui tient dans une tête tienne aussi sur un mur, une table ou une façade. »
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Passez voir l'atelier avant de commander.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            On vous montre les machines, les finitions et les épreuves. Vous repartez avec un devis clair et une date de retrait.
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
    </>
  );
}