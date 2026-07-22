import { Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap } from "lucide-react";

export function FormationHomeCta() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <GraduationCap size={14} /> Sur-mesure
        </div>

        <h3 className="mt-4 font-display text-xl font-bold md:text-2xl">
          Besoin d'une formation sur mesure ?
        </h3>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Vous souhaitez former vos équipes, approfondir un module spécifique ou créer un programme personnalisé ?
          Contactez-nous pour concevoir un parcours adapté à vos objectifs.
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <Link
          to="/"
          hash="contact"
          search={{
            quote: "autre",
            custom: "Formation sur mesure",
            details: `Bonjour, \n\nJe souhaite obtenir des informations et un devis pour une formation sur mesure.\n\nVoici le détail de mon besoin :\n- Domaine / Thématique : [ex: Design graphique avancé, Motion Design, etc.]\n- Profil des participants : [ex: Débutant, Équipe de 3 personnes, etc.]\n- Objectif visé : [ex: Maîtriser Illustrator, Automatiser nos visuels, etc.]\n- Modalité souhaitée : [ex: En présentiel / En ligne]\n\nMerci de me recontacter pour échanger sur le programme.`,
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Demander une formation sur mesure <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}