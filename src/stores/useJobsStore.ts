import { createResourceStore, type BaseFetchParams } from "./createResourceStore";
import { resolveApiUrl } from "@/lib/api/resolve-url";
import { parseApiError } from "@/lib/api/error";
import type { APIJobOffer, APIJobApplication } from "@/data/jobs";

// ==========================================
// 1. DÉFINITION DE LA RESSOURCE ET DU STORE
// ==========================================

const { fetchList, fetchById, useResourceStore } = createResourceStore<APIJobOffer>({
  resourceKey: "job-offers",
  listEndpoint: "jobs/offers/list",
  detailEndpoint: "jobs/offers",
});

export const fetchPublicJobOffers = fetchList;
export const fetchJobOfferBySlug = fetchById;

export type FetchJobOffersParams = BaseFetchParams;

export function useJobOffersStore(params: BaseFetchParams = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { offers: data, ...rest };
}

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

export interface ApplyToJobOfferParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  educationLevel: string;
  coverLetter?: string;
  coverLetterFile?: File;
  cv: File;
  consentAccepted: boolean;
  turnstileToken: string;
}

export async function applyToJobOffer(
  slug: string,
  params: ApplyToJobOfferParams
): Promise<APIJobApplication> {
  const formData = new FormData();
  formData.append("first_name", params.firstName);
  formData.append("last_name", params.lastName);
  formData.append("email", params.email);
  formData.append("phone", params.phone);
  formData.append("education_level", params.educationLevel);

  if (params.coverLetter) formData.append("cover_letter", params.coverLetter);
  if (params.coverLetterFile) formData.append("cover_letter_file", params.coverLetterFile);

  formData.append("cv", params.cv);
  formData.append("consent_accepted", params.consentAccepted ? "true" : "false");
  formData.append("cf-turnstile-response", params.turnstileToken);

  const url = resolveApiUrl(`/api/public/jobs/offers/${slug}/apply`);
  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    const error = await parseApiError(response, "Erreur lors de l'envoi de votre candidature.");
    throw new JobsApiError(
      error.message,
      response.status,
      error.fieldErrors
    );
  }

  const json: JobApplicationResponse = await response.json();
  return json.data;
}

export async function checkJobApplication(
  email: string,
  token: string
): Promise<APIJobApplication | null> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("token", token);

  const url = resolveApiUrl(`/api/public/jobs/applications/check`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (response.status === 404) return null;
  if (!response.ok) throw await parseApiError(response, "Erreur lors de la vérification de votre candidature.");

  const json: JobApplicationResponse = await response.json();
  return json.data;
}