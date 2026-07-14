import { resolveApiUrl } from "@/lib/api-url";
import type { APIContactRequest } from "@/data/contact";

type ContactResponse = { data: APIContactRequest };

export interface SendContactParams {
  name: string;
  email: string;
  service: string;
  customService?: string;
  message: string;
}

export async function sendContactRequest(params: SendContactParams): Promise<APIContactRequest> {
  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("email", params.email);
  formData.append("service", params.service);
  formData.append("custom_service", params.customService ?? "");
  formData.append("message", params.message);

  const url = resolveApiUrl(`/api/public/contact/create`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de votre demande de contact");
  }
  const json: ContactResponse = await response.json();
  return json.data;
}