import { X } from "lucide-react";
import { ReportSection } from "./ReportSection";

interface HelpMenuPanelProps {
  onClose: () => void;
}

export function HelpMenuPanel({ onClose }: HelpMenuPanelProps) {
  return (
    <div className="mb-3 w-80 rounded-2xl border border-border bg-card p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Centre d'aide & Outils</h3>
          <p className="text-[11px] text-muted-foreground">Besoin d'aide ou envie de partager ?</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer le menu"
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted cursor-pointer transition"
        >
          <X size={15} />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <ReportSection onTriggerOpen={onClose} />
      </div>
    </div>
  );
}