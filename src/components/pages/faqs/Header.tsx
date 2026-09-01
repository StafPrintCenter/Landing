import { Reveal } from "@/components/site/Reveal";

export function FaqHomeHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Questions fréquentes</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-6xl">
        Les réponses <span className="text-gradient-brand">avant les questions.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Délais, services, formations, commandes, accompagnement et fonctionnement : retrouvez rapidement les réponses aux questions les plus courantes.
      </p>
    </Reveal>
  );
}