import { X } from "lucide-react";

interface FilterMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  unitLabel: string; // ex: "service", "projet", "formation", "article", "question"
  unitLabelPlural?: string; // par défaut unitLabel + "s"
  children: React.ReactNode;
}

export function FilterMobileSheet({
  isOpen,
  onClose,
  resultCount,
  unitLabel,
  unitLabelPlural,
  children,
}: FilterMobileSheetProps) {
  if (!isOpen) return null;
  const label = resultCount > 1 ? (unitLabelPlural ?? `${unitLabel}s`) : unitLabel;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-border bg-background p-5 pb-8 shadow-xl">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-muted" />
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Filtres</h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="cursor-pointer rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
        <button
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          Voir {resultCount} {label}
        </button>
      </div>
    </div>
  );
}