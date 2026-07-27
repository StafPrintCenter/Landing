import { useQuery } from "@tanstack/react-query";
import { resolveApiUrl } from "@/lib/api-url";
import type { APIJobOffer, APIJobApplication, JobContractType } from "@/data/jobs";

type JobOffersResponse = { data: APIJobOffer[]; links: any; meta: any };
type JobOfferResponse = { data: APIJobOffer };
type JobApplicationResponse = { data: APIJobApplication };

export class JobsApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string[]>;
  constructor(message: string, status: number, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export interface FetchJobOffersParams {
  contractType?: JobContractType | "";
  query?: string;
  page?: number;
  perPage?: number;
}

export async function fetchJobOffers(params: FetchJobOffersParams = {}): Promise<JobOffersResponse> {
  const qp = new URLSearchParams();
  if (params.contractType) qp.append("contract_type", params.contractType);
  if (params.query) qp.append("query", params.query);
  if (params.page) qp.append("page", String(params.page));
  if (params.perPage) qp.append("perPage", String(params.perPage));

  const url = resolveApiUrl(`/api/public/jobs/offers/list?${qp.toString()}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur lors de la récupération des offres d'emploi");
  return response.json();
}

export function useJobOffersStore(params: FetchJobOffersParams = {}) {
  const query = useQuery({
    queryKey: ["job-offers", "public-list", params],
    queryFn: () => fetchJobOffers(params),
    staleTime: 1000 * 60 * 5,
  });
  return {
    offers: query.data?.data ?? [],
    meta: query.data?.meta ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export async function fetchJobOfferBySlug(slug: string): Promise<APIJobOffer | null> {
  const url = resolveApiUrl(`/api/public/jobs/offers/${slug}`);
  const response = await fetch(url);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Erreur lors de la récupération de l'offre");
  const json: JobOfferResponse = await response.json();
  return json.data;
}

export interface ApplyToJobOfferParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  cv: File;
  consentAccepted: boolean;
}

export async function applyToJobOffer(slug: string, params: ApplyToJobOfferParams): Promise<APIJobApplication> {
  const formData = new FormData();
  formData.append("first_name", params.firstName);
  formData.append("last_name", params.lastName);
  formData.append("email", params.email);
  formData.append("phone", params.phone);
  if (params.coverLetter) formData.append("cover_letter", params.coverLetter);
  formData.append("cv", params.cv);
  formData.append("consent_accepted", params.consentAccepted ? "true" : "false");

  const url = resolveApiUrl(`/api/public/jobs/offers/${slug}/apply`);
  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    let payload: { message?: string; errors?: Record<string, string[]> } = {};
    try {
      payload = await response.json();
    } catch {
      // corps non-JSON — repli sur message générique
    }
    throw new JobsApiError(
      payload.message ?? "Erreur lors de l'envoi de votre candidature.",
      response.status,
      payload.errors
    );
  }

  const json: JobApplicationResponse = await response.json();
  return json.data;
}

export async function checkJobApplication(email: string, token: string): Promise<APIJobApplication | null> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("token", token);

  const url = resolveApiUrl(`/api/public/jobs/applications/check`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Erreur lors de la vérification de votre candidature.");
  const json: JobApplicationResponse = await response.json();
  return json.data;
}