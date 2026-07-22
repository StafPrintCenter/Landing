import { Link } from "@tanstack/react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";

export function FormationDetailNotFound() {
  return (
    <SiteShell>
      <div className="container-x flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-muted border border-border">
          <AlertCircle size={40} className="text-muted-foreground/80 animate-pulse" />
          <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary" />
        </div>

        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Formation introuvable
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground leading-relaxed">
          Le module ou le parcours de formation que vous recherchez n'existe pas,
          a changé d'adresse ou a été clôturé pour cette session.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/trainings"
            search={{ theme: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
          >
            <ArrowLeft size={16} /> Parcourir les formations
          </Link>
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-all"
          >
            Nous poser une question
          </a>
        </div>
      </div>
    </SiteShell>
  );
}
