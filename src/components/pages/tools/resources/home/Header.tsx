import { Reveal } from "@/components/site/Reveal";

interface ResourceHomeHeaderProps {
  totalCount: number;
  freeCount: number;
}

export function ResourceHomeHeader({ totalCount, freeCount }: ResourceHomeHeaderProps) {
  return (
    <Reveal>
      <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Bibliothèque </p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-6xl">
            Des ressources pour passer de l'idée au fichier.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Gabarits, guides et checklists conçus pour vos projets d'impression, de design et de communication. Commencez gratuitement ou gagnez du temps avec un modèle premium.
          </p>
        </div>

        <div className="flex gap-6 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
          <div>
            <p className="font-display text-3xl font-bold text-primary">{totalCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">ressources</p>
          </div>
          <div className="w-px bg-border" />
          <div>
            <p className="font-display text-3xl font-bold text-leaf">{freeCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">gratuites</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
