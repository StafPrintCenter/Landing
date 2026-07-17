import { resolveApiUrl } from "@/lib/api-url";
import type { APINewsletterSubscription } from "@/data/newsletter";

type SubscriptionResponse = { data: APINewsletterSubscription };

export interface SubscribeNewsletterParams {
  email: string;
  firstName?: string;
  lastName?: string;
  categoryIds: string[];
}

export async function subscribeNewsletter(params: SubscribeNewsletterParams): Promise<APINewsletterSubscription> {
  const formData = new FormData();
  formData.append("email", params.email);
  if (params.firstName) formData.append("first_name", params.firstName);
  if (params.lastName) formData.append("last_name", params.lastName);
  formData.append("category_ids", params.categoryIds.join(","));

  const url = resolveApiUrl(`/api/public/newsletter/subscribe`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    throw new Error("Erreur lors de l'inscription à la newsletter");
  }
  const json: SubscriptionResponse = await response.json();
  return json.data;
}

/**
 * Récupère les préférences actuelles d'un abonné à partir de son token
 * personnel (reçu par email) — utilisé par la future page de gestion des
 * préférences / désinscription.
 */
export async function fetchNewsletterPreferences(token: string): Promise<APINewsletterSubscription> {
  const url = resolveApiUrl(`/api/public/newsletter/preferences?token=${encodeURIComponent(token)}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des préférences");
  }
  const json: SubscriptionResponse = await response.json();
  return json.data;
}

export interface UpdateNewsletterPreferencesParams {
  token: string;
  categoryIds: string[];
}

export async function updateNewsletterPreferences(params: UpdateNewsletterPreferencesParams): Promise<APINewsletterSubscription> {
  const formData = new FormData();
  formData.append("token", params.token);
  formData.append("category_ids", params.categoryIds.join(","));

  const url = resolveApiUrl(`/api/public/newsletter/preferences`);
  const response = await fetch(url, { method: "PUT", body: formData });
  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour des préférences");
  }
  const json: SubscriptionResponse = await response.json();
  return json.data;
}