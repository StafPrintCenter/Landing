import { useQuery } from "@tanstack/react-query";
import { resolveApiUrl } from "@/lib/api-url";
import type { APICertificateVerification } from "@/data/certificates";

export class CertificateApiError extends Error { }

/** Retourne null si le numéro n'existe pas (404) */
export async function fetchCertificateVerification(
  number: string
): Promise<APICertificateVerification | null> {
  const url = resolveApiUrl(`/api/public/trainings/certificates/verify/${encodeURIComponent(number)}`);
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new CertificateApiError("Erreur lors de la vérification du certificat");
  }
  return response.json();
}

export function useCertificateVerification(number: string | undefined) {
  const query = useQuery({
    queryKey: ["certificates", "verify", number],
    queryFn: () => fetchCertificateVerification(number as string),
    enabled: !!number,
    staleTime: 1000 * 30, // un certificat peut être révoqué : on garde une fraîcheur courte
    retry: false,
  });
  return {
    certificate: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}