import { resolveApiUrl } from "@/lib/api-url";
import type { APINewsletterSubscription } from "@/data/newsletter";

type SubscriptionResponse = { data: APINewsletterSubscription; message?: string };

export interface SubscribeNewsletterParams {
  email: string;
  firstName?: string;
  lastName?: string;
  categoryIds: string[];
  acceptedTerms: boolean;
}

export interface SubscribeNewsletterResult {
  subscription: APINewsletterSubscription;
  alreadySubscribed: boolean;
}

export async function subscribeNewsletter(params: SubscribeNewsletterParams): Promise<SubscribeNewsletterResult> {
  const formData = new FormData();
  formData.append("email", params.email);
  if (params.firstName) formData.append("first_name", params.firstName);
  if (params.lastName) formData.append("last_name", params.lastName);
  formData.append("category_ids", params.categoryIds.join(","));
  formData.append("accepted_terms", params.acceptedTerms ? "true" : "false");

  const url = resolveApiUrl(`/api/public/newsletter/subscribe`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    throw new Error("Erreur lors de l'inscription à la newsletter");
  }
  const json: SubscriptionResponse = await response.json();
  return {
    subscription: json.data,
    alreadySubscribed: response.status === 200,
  };
}

/**
 * Récupère les préférences actuelles d'un abonné à partir de son token
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

/**
 * Désinscrit un abonné via son token personnel — appelée depuis la page
 */
export async function unsubscribeNewsletter(token: string): Promise<APINewsletterSubscription> {
  const formData = new FormData();
  formData.append("token", token);

  const url = resolveApiUrl(`/api/public/newsletter/unsubscribe`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    throw new Error("Erreur lors de la désinscription");
  }
  const json: SubscriptionResponse = await response.json();
  return json.data;
}