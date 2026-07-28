import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { CheckForm, CheckErrorState } from "@/components/pages/careers/offers/check";
import { InternshipResult } from "@/components/pages/careers/internships";
import { checkInternshipRequest } from "@/stores/useInternshipsStore";
import type { APIInternshipRequest } from "@/data/internships";

interface CheckSearchParams {
  email?: string;
  token?: string;
}

export const Route = createFileRoute("/careers/internship/check")({
  validateSearch: (search: Record<string, unknown>): CheckSearchParams => ({
    email: typeof search.email === "string" ? search.email : undefined,
    token: typeof search.token === "string" ? search.token : undefined,
  }),
  head: () => ({
    meta: [{ title: "Suivre ma demande de stage" }, { name: "robots", content: "noindex" }],
  }),
  component: CheckInternshipPage,
});

function CheckInternshipPage() {
  const searchParams = Route.useSearch();

  const [email, setEmail] = useState(searchParams.email ?? "");
  const [token, setToken] = useState(searchParams.token ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState<APIInternshipRequest | null>(null);

  const performCheck = async (searchEmail: string, searchToken: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const found = await checkInternshipRequest(searchEmail, searchToken);
      if (!found) {
        throw new Error("Aucune demande de stage ne correspond à l'email et au token renseignés.");
      }
      setRequest(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la recherche.");
      setRequest(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.email && searchParams.token) {
      performCheck(searchParams.email, searchParams.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.email, searchParams.token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) return;
    performCheck(email, token);
  };

  const handleReset = () => {
    setRequest(null);
    setError(null);
  };

  const handleRetry = () => setError(null);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-8 space-y-2">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Suivi de demande de stage</h1>
        <p className="text-sm text-muted-foreground">
          Consultez l'état d'avancement de votre demande de stage.
        </p>
      </div>

      {isLoading && !request && (
        <div className="flex flex-col items-center justify-center p-12 space-y-3 rounded-2xl border border-border bg-card">
          <Loader2 size={32} className="animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium">Vérification de votre demande…</p>
        </div>
      )}

      {!isLoading && error && <CheckErrorState message={error} onRetry={handleRetry} />}

      {!isLoading && !error && request && (
        <InternshipResult request={request} onReset={handleReset} />
      )}

      {!isLoading && !error && !request && (
        <CheckForm email={email} onEmailChange={setEmail} token={token} onTokenChange={setToken} onSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </div>
  );
}