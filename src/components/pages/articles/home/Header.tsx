import { Reveal } from "@/components/site/Reveal";

export function ArticleHomeHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Carnet de studio</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-6xl">
        Des idées <span className="text-gradient-brand">pour mieux créer.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Guides pratiques, conseils professionnels, découvertes et tendances pour vous aider à mieux concevoir, communiquer et développer votre présence visuelle et numérique.
      </p>
    </Reveal>
  );
}
