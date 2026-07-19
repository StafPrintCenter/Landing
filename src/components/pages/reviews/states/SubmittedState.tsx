import { CheckCircle2 } from "lucide-react";

export function ReviewSubmittedState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 size={28} />
      </div>
      <h2 className="font-display text-xl font-bold">Merci pour votre avis !</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Votre réponse a bien été enregistrée. Nous vous remercions du temps que vous nous avez accordé.
      </p>
    </div>
  );
}