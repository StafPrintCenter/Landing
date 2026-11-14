import { Link } from "@tanstack/react-router";
import { ArrowLeft, RefreshCw, TriangleAlert } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

interface ResourceDetailErrorProps {
  error: Error;
  reset: () => void;
}

export function ResourceDetailError({ error, reset }: ResourceDetailErrorProps) {
  return (
    <SiteShell>
      <div className="container-x flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
        <TriangleAlert size={40} className="text-destructive" />
        <h1 className="mt-6 font-display text-3xl font-bold">Erreur de chargement</h1>
        <p className="mt-3 max-w-md text-muted-foreground">Une erreur est survenue pendant le chargement de cette ressource.</p>
        <p className="mt-4 text-xs text-muted-foreground">{error.message}</p>
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            <RefreshCw size={15} /> Réessayer
          </button>
          <Link to="/tools/ressources" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold">
            <ArrowLeft size={15} /> Ressources
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
