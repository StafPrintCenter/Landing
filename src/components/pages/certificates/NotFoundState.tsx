import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

interface CertificateNotFoundStateProps {
  number: string;
  isError?: boolean;
  onRetry?: () => void;
}

export function CertificateNotFoundState({ number, isError, onRetry }: CertificateNotFoundStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle size={28} />
      </div>
      <h2 className="font-display text-xl font-bold">
        {isError ? "Vérification impossible" : "Certificat introuvable"}
      </h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        {isError
          ? "Une erreur est survenue pendant la vérification. Merci de réessayer dans un instant."
          : <>Aucun certificat ne correspond au numéro <code className="text-xs">{number}</code>. Vérifiez la saisie ou contactez-nous.</>}
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {isError && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Réessayer
          </button>
        )}
        <Link to="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}