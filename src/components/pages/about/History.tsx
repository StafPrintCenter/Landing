import { MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import { TIMELINE } from "@/data/atelier";

export function AboutHistory() {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Notre histoire
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
            Une imprimerie née sur place, <span className="text-gradient-brand">pas importée.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Nous avons grandi avec nos clients : chaque machine est arrivée
            parce qu'un projet l'exigeait, et chaque compétence s'est ajoutée
            pour répondre à une demande réelle du quartier, puis de la ville.
          </p>
          <a
            href={SITE.maps}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <MapPin size={16} /> Voir l'atelier sur la carte
          </a>
        </Reveal>

        <div className="relative pl-8">
          <div className="absolute bottom-2 left-1.75 top-2 w-px bg-border" />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.06}>
              <div className="relative pb-10 last:pb-0">
                <span className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {t.year}
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}