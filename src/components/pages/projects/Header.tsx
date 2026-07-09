import { Reveal } from "@/components/site/Reveal";

export function RealisationHomeHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Portfolio</p>
      <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl">Nos réalisations.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Un aperçu de notre travail pour des clients institutionnels, des entreprises et des associations à travers le Bénin.
      </p>
    </Reveal>
  );
}