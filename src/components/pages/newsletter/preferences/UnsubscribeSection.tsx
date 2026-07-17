import { useState } from "react";
import { UserX } from "lucide-react";
import { buildUnsubscribeUrl } from "@/lib/newsletter-links";

interface UnsubscribeSectionProps {
  token: string;
}

export function UnsubscribeSection({ token }: UnsubscribeSectionProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="mt-8 rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
          <UserX size={18} />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-sm font-semibold">Se désinscrire</h3>
          <p className="mt-1 text-xs text-foreground/60">
            Vous ne recevrez plus aucun email de notre newsletter. Cette action est immédiate.
          </p>

          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="mt-3 cursor-pointer rounded-full border border-destructive/30 px-4 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/10"
            >
              Se désinscrire
            </button>
          ) : (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-foreground/70">Confirmez-vous ?</span>
              <a
                href={buildUnsubscribeUrl(token)}
                className="cursor-pointer rounded-full bg-destructive px-4 py-2 text-xs font-semibold text-destructive-foreground transition hover:opacity-90"
              >
                Oui, me désinscrire
              </a>
              <button
                onClick={() => setConfirming(false)}
                className="cursor-pointer rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}