import { resolveApiUrl } from "@/lib/api/resolve-url";
import { parseApiError } from "@/lib/api/error";

export interface CreateEthicalReportParams {
  category: string;
  concerned: string;
  when: string;
  description: string;
  evidence: string;
  anonymous: boolean;
  contact: string;
  goodFaith: boolean;
  turnstileToken: string;
}

export interface EthicalReportReceipt {
  trackingCode: string;
  status: string;
}

type EthicalReportResponse = { data: EthicalReportReceipt };

export async function createEthicalReport(
  params: CreateEthicalReportParams,
): Promise<EthicalReportReceipt> {
  const formData = new FormData();
  formData.append("category", params.category);
  formData.append("concerned", params.concerned);
  formData.append("when", params.when);
  formData.append("description", params.description);
  formData.append("evidence", params.evidence);
  formData.append("anonymous", String(params.anonymous));
  formData.append("contact", params.anonymous ? "" : params.contact);
  formData.append("goodFaith", String(params.goodFaith));
  formData.append("cf-turnstile-response", params.turnstileToken);

  const response = await fetch(resolveApiUrl("/api/public/reports/ethical"), {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw await parseApiError(response, "Erreur lors de l'envoi de votre signalement éthique.");
  }

  const json: EthicalReportResponse = await response.json();
  return json.data;
}
