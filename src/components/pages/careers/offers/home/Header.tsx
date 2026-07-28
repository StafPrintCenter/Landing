import { Link } from "@tanstack/react-router";
import { Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";

export function CareersHomeHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-3xl text-center space-y-6">
        {/* Badge & Titre principal */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Briefcase size={14} /> Carrières
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Rejoignez {SITE.name}
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Découvrez nos offres d'emploi et postulez en quelques minutes.
          </p>
        </div>

        {/* Bloc CTA pour les candidatures de stage */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5 text-left text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap size={18} />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground">
                Étudiant(e) à la recherche d'un stage ?
              </p>
              <p className="text-muted-foreground text-xs">
                Soumettez votre demande même hors offres publiées.
              </p>
            </div>
          </div>

          <Link
            to="/careers/internship"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Demander un stage <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}