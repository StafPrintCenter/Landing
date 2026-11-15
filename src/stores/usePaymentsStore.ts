import { resolveApiUrl } from "@/lib/api/resolve-url";
import { parseApiError } from "@/lib/api/error";

export interface PaymentInvoice {
  file: Blob;
  fileName: string;
}

export async function fetchPaymentInvoice(transactionId: string): Promise<PaymentInvoice> {
  const url = resolveApiUrl(`/api/public/payments/${encodeURIComponent(transactionId)}/invoice`);
  const response = await fetch(url, {
    headers: { Accept: "application/pdf, application/json" },
  });

  if (!response.ok) {
    throw await parseApiError(response, "Impossible de télécharger cette facture.");
  }

  const contentDisposition = response.headers.get("content-disposition");
  const filenameMatch = contentDisposition?.match(/filename="?([^";]+)"?/i);
  const fileName = filenameMatch?.[1] ?? `Facture-SPC-${transactionId}.pdf`;

  return {
    file: await response.blob(),
    fileName,
  };
}
