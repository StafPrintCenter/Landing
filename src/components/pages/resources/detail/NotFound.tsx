import { Link } from "@tanstack/react-router";
import { ArrowLeft, FileSearch } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export function ResourceDetailNotFound() {
  return (
    <SiteShell>
      <div className="container-x flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
        <FileSearch size={40} className="text-muted-foreground/80" />
        <h1 className="mt-6 font-display text-3xl font-bold">Ressource introuvable</h1>
        <p className="mt-3 max-w-md text-muted-foreground">Cette ressource n'existe pas ou a été retirée de la bibliothèque.</p>
        <Link to="/tools/ressources" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          <ArrowLeft size={16} /> Retour aux ressources
        </Link>
      </div>
    </SiteShell>
  );
}
