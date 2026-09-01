import { Network } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";

export function EcosystemHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Écosystème</p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-6xl">
        Un studio, plusieurs expériences.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Explorez les différentes plateformes développées autour de {SITE.name} : création, services, formation, outils, communication et espaces dédiés à nos utilisateurs.
      </p>
    </Reveal>
  );
}