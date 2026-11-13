import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export function SuccessScreen() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-10 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 size={28} />
      </div>
      <h2 className="mt-4 font-display text-xl font-bold">Demande envoyée !</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Votre demande de stage a bien été enregistrée. Vous recevrez un email de confirmation avec un lien pour
        suivre son état.
      </p>
      <Link to="/careers/offers" className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted">
        Voir les offres d'emploi
      </Link>
    </div>
  );
}