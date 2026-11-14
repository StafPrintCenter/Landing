import { Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb } from "lucide-react";

export function ResourceHomeCta() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Lightbulb size={14} /> Votre prochaine idée
        </div>
        <h3 className="mt-4 font-display text-xl font-bold md:text-2xl">Une ressource vous ferait gagner du temps ?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Décrivez le modèle, le guide ou l'outil qu'il vous manque. Nous étudierons votre besoin et vous répondrons rapidement.
        </p>
      </div>

      <div className="mt-6 border-t border-border/50 pt-4">
        <Link
          to="/"
          hash="contact"
          search={{
            quote: "autre",
            custom: "Création d'une ressource numérique",
            details: `Bonjour,\n\nJe souhaite proposer ou demander la création d'une ressource numérique.\n\nVoici mon besoin :\n- Type de ressource : [gabarit, guide, checklist, outil...]\n- Sujet ou support concerné : [précisez]\n- Utilisation prévue : [précisez]\n\nMerci de me recontacter pour en discuter.`,
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Proposer une ressource <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
