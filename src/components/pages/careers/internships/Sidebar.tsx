import { ArrowLeft, BriefcaseBusiness, GraduationCap, Calendar, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function InternshipSidebar() {
  return (
    <aside className="sticky top-24 self-start space-y-4 lg:col-span-4">
      {/* Bouton de retour */}
      <div className="flex flex-wrap items-center gap-2.5">
        <Link
          to="/careers/offers"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-muted cursor-pointer"
        >
          <ArrowLeft size={14} /> Voir les offres d'emploi
        </Link>
      </div>

      {/* Carte récapitulative des stages */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Candidature spontanée
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            <GraduationCap size={12} className="text-primary" />
            Stage
          </span>
        </div>

        <h1 className="mt-3 font-display text-xl font-bold leading-tight text-foreground">
          Demande de stage
        </h1>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Étudiant(e) ou jeune diplômé(e) à la recherche d'un stage académique ou professionnel ? Transmettez-nous votre profil.
        </p>

        <div className="my-4 h-px bg-border" />

        {/* Avantages / Informations */}
        <ul className="space-y-3 text-xs">
          <li className="flex items-start gap-2.5 text-muted-foreground">
            <Sparkles size={16} className="shrink-0 text-primary mt-0.5" />
            <span>
              <strong className="text-foreground font-medium">Encadrement personnalisé</strong> par nos équipes d'experts.
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-muted-foreground">
            <BriefcaseBusiness size={16} className="shrink-0 text-primary mt-0.5" />
            <span>
              Projets réels et formateurs adaptés à votre parcours.
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-muted-foreground">
            <Calendar size={16} className="shrink-0 text-primary mt-0.5" />
            <span>
              Dates et durées flexibles selon vos contraintes académiques.
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}