import { Link } from "@tanstack/react-router";
import { Clock, Ban, CheckCircle2 } from "lucide-react";
import type { ReviewInvitationStatus } from "@/data/reviews";

interface InvitationStatusStateProps {
  status: Exclude<ReviewInvitationStatus, "pending" | "opened">;
}

const CONTENT: Record<string, { icon: typeof Clock; title: string; text: string }> = {
  completed: {
    icon: CheckCircle2,
    title: "Avis déjà envoyé",
    text: "Vous avez déjà répondu à ce formulaire. Merci pour votre contribution !",
  },
  expired: {
    icon: Clock,
    title: "Invitation expirée",
    text: "Ce lien d'invitation n'est plus valide. Contactez STAF PRINT CENTER si vous souhaitez donner votre avis.",
  },
  revoked: {
    icon: Ban,
    title: "Invitation annulée",
    text: "Cette invitation a été retirée par STAF PRINT CENTER.",
  },
};

export function InvitationStatusState({ status }: InvitationStatusStateProps) {
  const c = CONTENT[status] ?? CONTENT.expired;
  const Icon = c.icon;

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon size={28} />
      </div>
      <h2 className="font-display text-xl font-bold">{c.title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{c.text}</p>
      <Link to="/" className="mt-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">
        Retour à l'accueil
      </Link>
    </div>
  );
}