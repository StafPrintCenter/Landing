import { Reveal } from "@/components/site/Reveal";
import { MACHINES } from "@/data/atelier";
import images from "@/assets/images.json";

export function AboutMachines() {
  return (
    <section className="border-y border-border bg-muted/40 py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Le parc machines
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Ce dont nous disposons, <span className="text-gradient-brand">pour mieux vous servir.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Des équipements, des compétences et un savoir-faire réunis pour assurer la majorité de votre production avec un suivi attentif, de la préparation à la finition.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MACHINES.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.name} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{m.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {m.spec}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{m.usage}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <figure className="mt-12 overflow-hidden rounded-3xl border border-border">
            <img
              src={images.atGf}
              alt="Impression grand format sur vinyle à l'atelier"
              width={1200}
              height={912}
              loading="lazy"
              className="h-64 w-full object-cover object-[center_70%] md:h-96"
            />
            <figcaption className="bg-card px-6 py-4 text-sm text-muted-foreground">
              Production grand format pour bâches, roll-up et habillages de vitrine.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}