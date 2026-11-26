import { resolveApiUrl } from "@/lib/api/resolve-url";
import { parseApiError } from "@/lib/api/error";
import type { APIReport, ReportableType, ReportReason } from "@/data/reports";

type ReportResponse = { data: APIReport };

export interface CreateReportParams {
  reportableType: ReportableType;
  reportableId: string;
  reason: ReportReason;
  message?: string;
  reporterEmail?: string;
  turnstileToken: string;
}

export class ReportApiError extends Error {
  fieldErrors?: Record<string, string[]>;

  constructor(message: string, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = "ReportApiError";
    this.fieldErrors = fieldErrors;
  }
}

export async function createReport(params: CreateReportParams): Promise<APIReport> {
  const formData = new FormData();
  formData.append("reportable_type", params.reportableType);
  formData.append("reportable_id", params.reportableId);
  formData.append("reason", params.reason);
  if (params.message) formData.append("message", params.message);
  if (params.reporterEmail) formData.append("reporter_email", params.reporterEmail);
  formData.append("cf-turnstile-response", params.turnstileToken);

  const url = resolveApiUrl(`/api/public/reports/site`);
  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    const error = await parseApiError(response, "Erreur lors de l'envoi du signalement");
    throw new ReportApiError(
      error.message,
      error.fieldErrors
    );
  }

  const json: ReportResponse = await response.json();
  return json.data;
}