import { Link } from "@tanstack/react-router";
import { ArrowLeft, RefreshCw, TriangleAlert } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";

interface FormationErrorProps {
  error: Error;
  reset: () => void;
}

export function FormationDetailError({ error, reset }: FormationErrorProps) {
  return (
    <SiteShell>
      <div className="container-x flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-destructive/30 bg-destructive/10">
          <TriangleAlert size={40} className="text-destructive/80" />
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-destructive animate-pulse" />
        </div>

        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Erreur de chargement
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground leading-relaxed">
          Une erreur s'est produite lors du chargement de cette formation.
          Vous pouvez réessayer ou revenir à la liste.
        </p>

        {error.message && (
          <p className="mt-4 rounded-xl border border-border bg-muted/60 px-4 py-2.5 font-mono text-xs text-muted-foreground">
            {error.message}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
          >
            <RefreshCw size={15} /> Réessayer
          </button>
          <Link
            to="/training"
            search={{ theme: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-all"
          >
            <ArrowLeft size={15} /> Retour aux formations
          </Link>
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-all"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </SiteShell>
  );
}
