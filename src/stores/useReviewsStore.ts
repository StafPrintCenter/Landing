import { resolveApiUrl } from "@/lib/api-url";
import type { APIReviewFormPublic, ReviewAnswers } from "@/data/reviews";

type ReviewFormResponse = { data: APIReviewFormPublic };

export class ReviewApiError extends Error { }

export async function fetchReviewByToken(token: string): Promise<APIReviewFormPublic | null> {
  const url = resolveApiUrl(`/api/public/reviews/${token}`);
  const response = await fetch(url);
  if (response.status === 404 || response.status === 410) return null;
  if (!response.ok) {
    throw new ReviewApiError("Erreur lors de la récupération du formulaire d'avis");
  }
  const json: ReviewFormResponse = await response.json();
  return json.data;
}

/**
 * Convertit les réponses (avec fichiers éventuels) en un objet JSON simple,
 * conforme au format attendu par le backend : answers = '{"qid": valeur, ...}'.
 * Les fichiers sont exclus de ce JSON et envoyés séparément en multipart.
 */
function buildAnswersPayload(answers: ReviewAnswers): { json: Record<string, unknown>; files: Record<string, File> } {
  const json: Record<string, unknown> = {};
  const files: Record<string, File> = {};

  for (const [questionId, value] of Object.entries(answers)) {
    if (value === null || value === undefined || value === "") continue;
    if (value instanceof File) {
      files[questionId] = value;
    } else {
      json[questionId] = value;
    }
  }

  return { json, files };
}

export interface SubmitReviewParams {
  clientName: string;
  clientEmail: string;
  answers: ReviewAnswers;
  allowPublication: boolean;
  privacyAccepted: boolean;
}

export async function submitReviewResponse(token: string, params: SubmitReviewParams): Promise<void> {
  const { json, files } = buildAnswersPayload(params.answers);

  const formData = new FormData();
  formData.append("client_name", params.clientName);
  formData.append("client_email", params.clientEmail);
  formData.append("answers", JSON.stringify(json));
  formData.append("allow_publication", params.allowPublication ? "true" : "false");
  formData.append("privacy_accepted", params.privacyAccepted ? "true" : "false");

  for (const [questionId, file] of Object.entries(files)) {
    formData.append(`answers_files[${questionId}]`, file);
  }

  const url = resolveApiUrl(`/api/public/reviews/${token}`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    throw new ReviewApiError("Erreur lors de l'envoi de votre avis");
  }
}

export interface EditReviewParams {
  answers: ReviewAnswers;
  allowPublication: boolean;
}

/**
 * Modification d'une réponse déjà soumise — uniquement possible si le formulaire
 * a allowResponseEdit=true. Contrairement à la soumission initiale, seuls
 * "answers" et "allow_publication" sont envoyés (pas client_name/email/privacy_accepted).
 */
export async function editReviewResponse(token: string, params: EditReviewParams): Promise<void> {
  const { json, files } = buildAnswersPayload(params.answers);

  const formData = new FormData();
  formData.append("answers", JSON.stringify(json));
  formData.append("allow_publication", params.allowPublication ? "true" : "false");

  for (const [questionId, file] of Object.entries(files)) {
    formData.append(`answers_files[${questionId}]`, file);
  }

  const url = resolveApiUrl(`/api/public/reviews/${token}/response`);
  const response = await fetch(url, { method: "PUT", body: formData });
  if (!response.ok) {
    throw new ReviewApiError("Erreur lors de la mise à jour de votre avis");
  }
}