import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { PreferencesHeader, PreferencesForm } from "@/components/pages/newsletter/preferences";

const preferencesSearchSchema = z.object({
  token: z.string().catch("").default(""),
});

export const Route = createFileRoute("/tools/newsletter/preferences")({
  validateSearch: preferencesSearchSchema,
  head: () => ({
    meta: [
      { title: `Préférences newsletter | ${SITE.name}` },
      { name: "description", content: "Gérez vos préférences d'abonnement à la newsletter STAF PRINT CENTER, ou désabonnez-vous." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreferencesPage,
});

function PreferencesPage() {
  const { token } = Route.useSearch();

  return (
    <SiteShell>
      <section className="container-x max-w-2xl py-16 md:py-24">
        <PreferencesHeader />

        <div className="mt-10">
          {token ? (
            <PreferencesForm token={token} />
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle size={28} />
              </div>
              <h2 className="font-display text-xl font-bold">Lien manquant</h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Accédez à cette page depuis le lien personnel reçu dans un email de STAF PRINT CENTER.
              </p>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}