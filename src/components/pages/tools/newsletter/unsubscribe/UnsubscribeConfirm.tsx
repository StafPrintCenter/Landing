import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { SITE } from "@/data/site";

interface UnsubscribeConfirmProps {
  onConfirm: () => void;
}

export function UnsubscribeConfirm({ onConfirm }: UnsubscribeConfirmProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card py-12 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
        <AlertTriangle size={28} />
      </div>
      <h2 className="font-display text-xl font-bold">Confirmer la désinscription</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Vous ne recevrez plus aucun email de la newsletter {SITE.name}. Vous pourrez vous réinscrire à
        tout moment.
      </p>
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={onConfirm}
          className="cursor-pointer rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground transition hover:opacity-90"
        >
          Oui, me désinscrire
        </button>
        <Link
          to="/"
          className="cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
        >
          Annuler
        </Link>
      </div>
    </div>
  );
}