import { CheckCircle2 } from "lucide-react";

interface SuccessStateProps {
  onClose: () => void;
}

export function SuccessState({ onClose }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 size={28} />
      </span>
      <p className="text-sm font-medium">Signalement envoyé, merci.</p>
      <p className="text-xs text-muted-foreground">Notre équipe l'examinera dans les meilleurs délais.</p>
      <button
        onClick={onClose}
        className="mt-2 w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted cursor-pointer"
      >
        Fermer
      </button>
    </div>
  );
}