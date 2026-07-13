import { resolveApiUrl } from "@/lib/api-url";
import type { APIReport, ReportableType, ReportReason } from "@/data/reports";

type ReportResponse = { data: APIReport };

export interface CreateReportParams {
  reportableType: ReportableType;
  reportableId: string;
  reason: ReportReason;
  message?: string;
  reporterEmail?: string;
}

type ReportErrorPayload = {
  errors?: Record<string, string[]>;
  message?: string;
};

export class ReportApiError extends Error {
  constructor(message: string, public fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = "ReportApiError";
  }
}

export async function createReport(params: CreateReportParams): Promise<APIReport> {
  const formData = new FormData();
  formData.append("reportable_type", params.reportableType);
  formData.append("reportable_id", params.reportableId);
  formData.append("reason", params.reason);
  if (params.message) formData.append("message", params.message);
  if (params.reporterEmail) formData.append("reporter_email", params.reporterEmail);

  const url = resolveApiUrl(`/api/public/reports`);
  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    let payload: ReportErrorPayload | null = null;
    try {
      payload = await response.json();
    } catch { }

    const firstFieldError = payload?.errors
      ? Object.values(payload.errors)[0]?.[0]
      : undefined;

    throw new ReportApiError(
      firstFieldError ?? payload?.message ?? "Erreur lors de l'envoi du signalement",
      payload?.errors
    );
  }

  const json: ReportResponse = await response.json();
  return json.data;
}