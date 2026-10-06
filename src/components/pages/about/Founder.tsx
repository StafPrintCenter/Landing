import { Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import images from "@/assets/images.json";
import { useDarkMode } from "@/hooks/use-dark-mode";

export function AboutFounder() {
  const dark = useDarkMode();

  return (
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
                « Mon métier, ce n'est pas de vendre des feuilles imprimées.
                C'est de faire en sorte qu'une idée qui tient dans une tête
                tienne aussi sur un mur, une table ou une façade. »
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
} 