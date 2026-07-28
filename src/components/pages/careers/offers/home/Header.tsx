import { Briefcase } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";

export function CareersHomeHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Briefcase size={14} /> Carrières
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Rejoignez {SITE.name}</h1>
        <p className="mt-3 text-muted-foreground">
          Découvrez nos offres d'emploi et postulez en quelques minutes.
        </p>
      </div>
    </Reveal>
  );
}