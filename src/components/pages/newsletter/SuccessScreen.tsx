import { CheckCircle2, Info } from "lucide-react";
import type { APINewsletterSubscription } from "@/data/newsletter";

interface NewsletterSuccessScreenProps {
  subscription: APINewsletterSubscription;
  alreadySubscribed: boolean;
}

export function NewsletterSuccessScreen({ subscription, alreadySubscribed }: NewsletterSuccessScreenProps) {
  if (alreadySubscribed) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Info size={28} />
        </div>
        <h2 className="font-display text-2xl font-bold">Déjà inscrit(e)</h2>
        <p className="mt-2 max-w-sm text-sm text-foreground/70">
          L'adresse <b>{subscription.email}</b> est déjà abonnée à notre newsletter.
        </p>
        <p className="mt-3 max-w-sm text-xs text-foreground/50">
          Pour modifier vos préférences ou vous désinscrire, utilisez le lien personnel envoyé dans nos emails
          (bas de chaque newsletter reçue).
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 size={28} />
      </div>
      <h2 className="font-display text-2xl font-bold">Inscription confirmée</h2>
      <p className="mt-2 text-sm text-foreground/70">
        Un email de confirmation a été envoyé à <b>{subscription.email}</b>.
      </p>

      {subscription.categories.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {subscription.categories.map((c) => (
            <span key={c.id} className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground/70">
              {c.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}