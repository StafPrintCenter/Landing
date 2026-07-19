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
 * ⚠️ Endpoint et format de soumission supposés — non confirmés côté backend.
 * À ajuster dès que la vraie spec de POST /public/reviews/{token}/submit est connue.
 */
export async function submitReviewResponse(token: string, answers: ReviewAnswers): Promise<void> {
  const formData = new FormData();

  for (const [questionId, value] of Object.entries(answers)) {
    if (value === null || value === undefined) continue;

    if (value instanceof File) {
      formData.append(`answers[${questionId}]`, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`answers[${questionId}][]`, v));
    } else {
      formData.append(`answers[${questionId}]`, String(value));
    }
  }

  const url = resolveApiUrl(`/api/public/reviews/${token}/submit`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    throw new ReviewApiError("Erreur lors de l'envoi de votre avis");
  }
}