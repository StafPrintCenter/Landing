import { useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { fetchPaymentInvoice } from "@/stores/usePaymentsStore";

export function InvoiceDownloadButton({ transactionId }: { transactionId: string }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    const id = transactionId.trim();
    if (!id || isDownloading) return;

    setError(null);
    setIsDownloading(true);
    try {
      const { file, fileName } = await fetchPaymentInvoice(id);
      const fileUrl = URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.href = fileUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : "Impossible de télécharger cette facture.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => void handleDownload()}
        disabled={!transactionId.trim() || isDownloading}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-muted disabled:cursor-wait disabled:opacity-60"
      >
        {isDownloading ? <LoaderCircle size={16} className="animate-spin" /> : <Download size={16} />}
        {isDownloading ? "Téléchargement…" : "Télécharger la facture"}
      </button>
      {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
