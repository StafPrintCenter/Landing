import { resolveApiUrl } from "@/lib/api-url";
import type { APIInternshipRequest } from "@/data/internships";

type InternshipResponse = { data: APIInternshipRequest };

export class InternshipApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string[]>;
  constructor(message: string, status: number, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export interface CreateInternshipRequestParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution?: string;
  fieldOfStudy?: string;
  desiredStartDate?: string; // YYYY-MM-DD
  duration?: string;
  message?: string;
  cv?: File;
  consentAccepted: boolean;
}

export async function createInternshipRequest(params: CreateInternshipRequestParams): Promise<APIInternshipRequest> {
  const formData = new FormData();
  formData.append("first_name", params.firstName);
  formData.append("last_name", params.lastName);
  formData.append("email", params.email);
  formData.append("phone", params.phone);
  if (params.institution) formData.append("institution", params.institution);
  if (params.fieldOfStudy) formData.append("field_of_study", params.fieldOfStudy);
  if (params.desiredStartDate) formData.append("desired_start_date", params.desiredStartDate);
  if (params.duration) formData.append("duration", params.duration);
  if (params.message) formData.append("message", params.message);
  if (params.cv) formData.append("cv", params.cv);
  formData.append("consent_accepted", params.consentAccepted ? "true" : "false");

  const url = resolveApiUrl(`/api/public/internships/requests/create`);
  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    let payload: { message?: string; errors?: Record<string, string[]> } = {};
    try {
      payload = await response.json();
    } catch {
      // corps non-JSON — repli générique
    }
    throw new InternshipApiError(
      payload.message ?? "Erreur lors de l'envoi de votre demande de stage.",
      response.status,
      payload.errors
    );
  }

  const json: InternshipResponse = await response.json();
  return json.data;
}

export async function checkInternshipRequest(email: string, token: string): Promise<APIInternshipRequest | null> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("token", token);

  const url = resolveApiUrl(`/api/public/internships/requests/check`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Erreur lors de la vérification de votre demande.");
  const json: InternshipResponse = await response.json();
  return json.data;
}