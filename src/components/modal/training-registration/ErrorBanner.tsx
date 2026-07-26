import { AlertCircle, Ban, UserCheck, Clock, MailQuestion, Users } from "lucide-react";
import type { TrainingRegistrationErrorReason } from "@/data/trainings";

interface ReasonContent {
  icon: typeof AlertCircle;
  title: string;
  hint?: string;
}

const REASON_CONTENT: Record<TrainingRegistrationErrorReason, ReasonContent> = {
  blocked: {
    icon: Ban,
    title: "Inscription impossible pour le moment.",
    hint: "Contactez-nous directement si vous pensez qu'il s'agit d'une erreur.",
  },
  has_account: {
    icon: UserCheck,
    title: "Vous avez déjà un compte étudiant.",
    hint: "Connectez-vous à votre espace pour vous inscrire à cette formation.",
  },
  in_progress: {
    icon: Clock,
    title: "Votre inscription est déjà en cours de traitement.",
    hint: "Un conseiller reviendra vers vous prochainement — inutile de soumettre une nouvelle demande.",
  },
  pending_account: {
    icon: MailQuestion,
    title: "Un compte vous attend déjà.",
    hint: "Vérifiez votre boîte mail pour finaliser votre inscription via le lien reçu.",
  },
  full: {
    icon: Users,
    title: "Cette formation est complète.",
    hint: "Contactez-nous pour être informé d'une prochaine session ou d'une place libérée.",
  },
};

interface ErrorBannerProps {
  message: string;
  reason?: TrainingRegistrationErrorReason;
}

export function ErrorBanner({ message, reason }: ErrorBannerProps) {
  const content = reason ? REASON_CONTENT[reason] : null;
  const Icon = content?.icon ?? AlertCircle;

  return (
    <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
      <Icon size={16} className="mt-0.5 shrink-0" />
      <div>
        <p className="font-medium">{content?.title ?? message}</p>
        {content?.hint && <p className="mt-0.5 text-destructive/80">{content.hint}</p>}
        {!content && <p className="mt-0.5 text-destructive/80">{message}</p>}
      </div>
    </div>
  );
}