import { CheckCircle2 } from "lucide-react";
import type { APINewsletterSubscription } from "@/data/newsletter";

interface NewsletterSuccessScreenProps {
  subscription: APINewsletterSubscription;
}

export function NewsletterSuccessScreen({ subscription }: NewsletterSuccessScreenProps) {
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