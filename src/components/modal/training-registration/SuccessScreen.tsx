import { CheckCircle2 } from "lucide-react";

interface SuccessScreenProps {
  fullName: string;
  formationTitle: string;
  onClose: () => void;
}

export function SuccessScreen({ fullName, formationTitle, onClose }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <CheckCircle2 size={48} className="text-[oklch(0.5_0.15_140)] mb-3" />
      <h4 className="font-display text-xl font-bold">Pré-inscription enregistrée !</h4>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        Merci {fullName}, votre demande pour <strong>{formationTitle}</strong> a bien été prise en compte. Un conseiller vous appellera sous 24h.
      </p>
      <button type="button" onClick={onClose} className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted">
        Fermer la fenêtre
      </button>
    </div>
  );
}