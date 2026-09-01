import { Reveal } from "@/components/site/Reveal";

export function FormationHomeHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Formations</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-6xl">
        Des compétences <span className="text-gradient-brand">qui servent vraiment.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Apprenez les outils et méthodes utilisés dans le monde professionnel à travers des parcours pratiques, progressifs et orientés vers la réalisation de projets concrets.
      </p>
    </Reveal>
  );
}
