import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { unsubscribeNewsletter, NewsletterAlreadyUnsubscribedError } from "@/stores/useNewsletterStore";
import { UnsubscribeConfirm, UnsubscribeResult } from "@/components/pages/tools/newsletter/unsubscribe";

const unsubscribeSearchSchema = z.object({
  token: z.string().catch("").default(""),
});

export const Route = createFileRoute("/tools/newsletter/unsubscribe")({
  validateSearch: unsubscribeSearchSchema,
  head: () => ({
    meta: [
      { title: `Désinscription newsletter | ${SITE.name}` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UnsubscribePage,
});

type Step = "confirm" | "loading" | "done" | "already-unsubscribed" | "error";

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [step, setStep] = useState<Step>("confirm");

  const handleConfirm = async () => {
    setStep("loading");
    try {
      await unsubscribeNewsletter(token);
      setStep("done");
    } catch (err) {
      if (err instanceof NewsletterAlreadyUnsubscribedError) {
        setStep("already-unsubscribed");
      } else {
        setStep("error");
      }
    }
  };

  return (
    <SiteShell>
      <section className="container-x max-w-lg py-16 md:py-24">
        {!token ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle size={28} />
            </div>
            <h2 className="font-display text-xl font-bold">Lien manquant</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Accédez à cette page depuis le lien de désinscription reçu dans un email de {SITE.name}.
            </p>
          </div>
        ) : step === "confirm" ? (
          <UnsubscribeConfirm onConfirm={handleConfirm} />
        ) : (
          <UnsubscribeResult status={step} />
        )}
      </section>
    </SiteShell>
  );
}