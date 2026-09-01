import { Reveal } from "@/components/site/Reveal";

export function RealisationHomeHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Portfolio</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-6xl">
        Des projets <span className="text-gradient-brand">qui parlent pour nous.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Chaque réalisation est le résultat d'une réflexion, d'un savoir-faire et d'une attention portée aux détails. Parcourez une sélection de projets réalisés pour différents secteurs et différents besoins.
      </p>
    </Reveal>
  );
}