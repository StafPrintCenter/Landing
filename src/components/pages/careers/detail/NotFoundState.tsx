import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

export function JobOfferNotFoundState() {
  return (
    <div className="container-x flex flex-col items-center gap-3 py-24 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle size={28} />
      </div>
      <h2 className="font-display text-xl font-bold">Offre introuvable</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Cette offre n'existe pas ou n'est plus visible. Elle a peut-être expiré ou été retirée.
      </p>
      <Link to="/careers/offers" className="mt-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">
        Voir toutes les offres
      </Link>
    </div>
  );
}