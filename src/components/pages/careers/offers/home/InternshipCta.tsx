import { Link } from "@tanstack/react-router";
import { GraduationCap, ArrowRight } from "lucide-react";

export function InternshipCta() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div className="flex items-center gap-3">
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
          <GraduationCap size={20} />
        </div>
        <div>
          <p className="font-display text-base font-semibold">Vous êtes étudiant(e) et cherchez un stage ?</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Déposez votre demande de stage même en dehors des offres publiées ci-dessus.
          </p>
        </div>
      </div>
      <Link
        to="/careers/internships"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Demander un stage <ArrowRight size={16} />
      </Link>
    </div>
  );
}