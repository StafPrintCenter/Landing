import { X } from "lucide-react";

interface HelpMenuHeaderProps {
  onClose: () => void;
}

export function HelpMenuHeader({ onClose }: HelpMenuHeaderProps) {
  return (
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
  );
}