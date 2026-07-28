import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import { checkJobApplication } from "@/stores/useJobsStore";
import { CheckForm, ApplicationResult } from "@/components/pages/careers/check";
import type { APIJobApplication } from "@/data/jobs";

const searchSchema = z.object({
  email: z.string().catch("").default(""),
  token: z.string().catch("").default(""),
});

export const Route = createFileRoute("/careers/check-offer")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: `Suivre ma candidature | ${SITE.name}` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckPage,
});

function CheckPage() {
  const initial = Route.useSearch();
  const [email, setEmail] = useState(initial.email);
  const [token, setToken] = useState(initial.token);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<APIJobApplication | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setNotFound(false);
    setResult(null);
    try {
      const application = await checkJobApplication(email, token);
      if (application) setResult(application);
      else setNotFound(true);
    } catch {
      setError("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SiteShell>
      <section className="container-x max-w-xl py-16 md:py-24">
        <Reveal>
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold">Suivre ma candidature</h1>
            <p className="mt-3 text-muted-foreground">
              Entrez votre email et le token reçu par email pour connaître l'état de votre candidature.
            </p>
          </div>
        </Reveal>

        <div className="mt-8">
          <CheckForm
            email={email}
            onEmailChange={setEmail}
            token={token}
            onTokenChange={setToken}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {notFound && (
            <p className="mt-4 text-center text-sm text-destructive">
              Aucune candidature ne correspond à ces informations. Vérifiez l'email et le token saisis.
            </p>
          )}
          {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}
          {result && <ApplicationResult application={result} />}
        </div>
      </section>
    </SiteShell>
  );
}