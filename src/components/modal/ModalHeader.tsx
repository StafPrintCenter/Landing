import { X, type LucideIcon } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  icon?: LucideIcon;
  onClose: () => void;
  className?: string;
}

export function ModalHeader({ title, icon: Icon, onClose, className = "" }: ModalHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="flex items-center gap-2 font-display text-lg font-bold">
        {Icon && <Icon size={18} className="text-primary" />} {title}
      </h2>
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
      >
        <X size={18} />
      </button>
    </div>
  );
}