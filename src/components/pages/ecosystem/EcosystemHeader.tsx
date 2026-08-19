import { Network } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";

export function EcosystemHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Network size={14} /> Écosystème
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Tous nos sites {SITE.name}</h1>
        <p className="mt-3 text-muted-foreground">
          Retrouvez ici l'ensemble des plateformes officielles de {SITE.name} : site principal, outils internes,
          espaces de formation et communication.
        </p>
      </div>
    </Reveal>
  );
}