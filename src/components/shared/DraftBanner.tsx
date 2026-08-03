import { FileClock, X } from "lucide-react";

interface DraftBannerProps {
  savedAgeLabel: string | null;
  onRestore: () => void;
  onDiscard: () => void;
  hadStrippedFields?: boolean;
}

export function DraftBanner({ savedAgeLabel, onRestore, onDiscard, hadStrippedFields }: DraftBannerProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
      <div className="flex items-start gap-2.5">
        <FileClock size={16} className="mt-0.5 shrink-0 text-primary" />
        <div>
          <p className="font-medium text-foreground">
            Une version précédente de ce formulaire a été trouvée{savedAgeLabel ? ` (${savedAgeLabel})` : ""}.
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {hadStrippedFields
              ? "Vos réponses seront restaurées, mais les fichiers joints devront être resélectionnés."
              : "Voulez-vous reprendre là où vous en étiez ?"}
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={onRestore}
              className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 cursor-pointer"
            >
              Restaurer
            </button>
            <button
              onClick={onDiscard}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted cursor-pointer"
            >
              Ignorer
            </button>
          </div>
        </div>
      </div>
      <button onClick={onDiscard} aria-label="Fermer" className="shrink-0 text-muted-foreground hover:text-foreground cursor-pointer">
        <X size={14} />
      </button>
    </div>
  );
}
