import { Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { EXPERTISE } from "@/data/atelier";
import images from "@/assets/images.json";

export function AboutExpertise() {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
            <img
              src={images.atFt}
              alt="Poste de finitions : découpe, pelliculage et cartes de visite"
              width={1200}
              height={912}
              loading="lazy"
              className="h-80 w-full object-cover md:h-112"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Le poste de finitions : c'est là qu'une impression correcte devient
            un support professionnel.
          </p>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Savoir-faire local
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
              La machine compte moins <span className="text-gradient-brand">que la main qui la règle.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Un fichier mal préparé s'imprime aussi bien qu'un bon - jusqu'au
              premier contrôle. Voici ce que nos opérateurs vérifient avant
              que la presse ne démarre.
            </p>
          </Reveal>

          <ul className="mt-10 space-y-6">
            {EXPERTISE.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.04}>
                <li className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={15} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}