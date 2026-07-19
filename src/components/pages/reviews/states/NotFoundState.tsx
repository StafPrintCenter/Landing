import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

export function ReviewNotFoundState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle size={28} />
      </div>
      <h2 className="font-display text-xl font-bold">Lien invalide ou expiré</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Ce lien d'invitation à donner votre avis n'est plus valide. Contactez nous si vous pensez qu'il s'agit d'une erreur.
      </p>
      <Link to="/" className="mt-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">
        Retour à l'accueil
      </Link>
    </div>
  );
}