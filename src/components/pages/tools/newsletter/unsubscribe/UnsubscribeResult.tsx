import { Link } from "@tanstack/react-router";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type UnsubscribeStatus = "loading" | "done" | "error";

interface UnsubscribeResultProps {
  status: UnsubscribeStatus;
}

export function UnsubscribeResult({ status }: UnsubscribeResultProps) {
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center text-sm text-muted-foreground">
        <Loader2 size={24} className="animate-spin" />
        Désinscription en cours…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle size={28} />
        </div>
        <h2 className="font-display text-xl font-bold">Une erreur est survenue</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Impossible de traiter votre désinscription pour le moment. Réessayez ou contactez-nous directement.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 size={28} />
      </div>
      <h2 className="font-display text-xl font-bold">Vous êtes désinscrit(e)</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Vous ne recevrez plus d'emails de notre newsletter. Vous pouvez vous réinscrire à tout moment.
      </p>
      <Link
        to="/tools/newsletter"
        className="mt-2 cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
      >
        Retour à la newsletter
      </Link>
    </div>
  );
}