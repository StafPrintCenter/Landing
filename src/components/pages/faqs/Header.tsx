import { Reveal } from "@/components/site/Reveal";

export function FaqHomeHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Questions fréquentes</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Retrouvez les réponses aux questions les plus posées sur nos services, formations et réalisations.
      </p>
    </Reveal>
  );
}