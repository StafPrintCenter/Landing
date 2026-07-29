import { Reveal } from "@/components/site/Reveal";

export function FormationHomeHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Nos Curriculums</p>
      <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl">Apprenez avec un pro.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Des parcours immersifs et pratiques, ancrés sur le marché professionnel, dispensés en présentiel à Porto-Novo.
      </p>
    </Reveal>
  );
}
