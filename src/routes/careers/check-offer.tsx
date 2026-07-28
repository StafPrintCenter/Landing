// src/routes/careers/check-offer.tsx
import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckForm } from "@/components/pages/careers/check/CheckForm";
import { ApplicationResult } from "@/components/pages/careers/check/ApplicationResult";
import { resolveApiUrl } from "@/lib/api-url";
import type { APIJobApplication } from "@/data/jobs";
import { Loader2 } from "lucide-react";

interface CheckSearchParams {
  email?: string;
  token?: string;
}

export const Route = createFileRoute("/careers/check-offer")({
  validateSearch: (search: Record<string, unknown>): CheckSearchParams => {
    return {
      email: typeof search.email === "string" ? search.email : undefined,
      token: typeof search.token === "string" ? search.token : undefined,
    };
  },
  component: CheckOfferPage,
});

function CheckOfferPage() {
  const searchParams = Route.useSearch();

  const [email, setEmail] = useState(searchParams.email ?? "");
  const [token, setToken] = useState(searchParams.token ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<APIJobApplication | null>(null);

  const performCheck = async (searchEmail: string, searchToken: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Endpoint exact identique à Swagger / Curl
      // Note: resolveApiUrl convertit /api/public/... en /api/v1/public/...
      const url = resolveApiUrl("/api/public/jobs/applications/check");

      // 2. Construction du FormData (pour matcher multipart/form-data)
      const formData = new FormData();
      formData.append("email", searchEmail);
      formData.append("token", searchToken);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Ne PAS mettre de header Content-Type ici : 
          // le navigateur définit automatiquement multipart/form-data avec le bon boundary
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Aucune candidature trouvée pour cet email et cette clé de suivi.");
        }
        if (response.status === 422) {
          const errData = await response.json();
          throw new Error(errData.message || "Les données fournies sont invalides.");
        }
        throw new Error(`Erreur du serveur (${response.status})`);
      }

      const json = await response.json();
      setApplication(json.data);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la vérification.");
      setApplication(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-soumission au chargement si l'email et le token sont présents dans les param d'URL
  useEffect(() => {
    if (searchParams.email && searchParams.token) {
      performCheck(searchParams.email, searchParams.token);
    }
  }, [searchParams.email, searchParams.token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) return;
    performCheck(email, token);
  };

  const handleReset = () => {
    setApplication(null);
    setError(null);
  };

  return (
    <div className="container max-w-2xl py-12">
      <div className="text-center mb-8 space-y-2">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
          Suivi de candidature
        </h1>
        <p className="text-sm text-muted-foreground">
          Consultez l'état d'avancement de votre dossier de candidature.
        </p>
      </div>

      {/* État de chargement initial */}
      {isLoading && !application && !error && (
        <div className="flex flex-col items-center justify-center p-12 space-y-3">
          <Loader2 size={32} className="animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium">
            Vérification de votre candidature en cours…
          </p>
        </div>
      )}

      {/* Résultat si la candidature est trouvée */}
      {application ? (
        <ApplicationResult application={application} onReset={handleReset} />
      ) : (
        /* Formulaire si aucun résultat n'est encore affiché ou en cas d'erreur */
        (!isLoading || error) && (
          <CheckForm
            email={email}
            onEmailChange={setEmail}
            token={token}
            onTokenChange={setToken}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        )
      )}
    </div>
  );
}