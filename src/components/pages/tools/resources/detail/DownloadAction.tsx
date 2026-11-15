import { useEffect, useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { fetchResourceDownload } from "@/stores/useResourcesStore";

const MAX_DOWNLOADS = 3;

interface PreparedDownload {
  url: string;
  fileName: string;
  expiresAt: number;
}

interface ResourceDownloadActionProps {
  slug: string;
  transactionId?: string;
}

function getQuotaStorageKey(slug: string, transactionId?: string) {
  return `spc:resource-downloads:${slug}:${transactionId ?? "free"}`;
}

export function ResourceDownloadAction({ slug, transactionId }: ResourceDownloadActionProps) {
  const [remainingDownloads, setRemainingDownloads] = useState(MAX_DOWNLOADS);
  const [quotaLoaded, setQuotaLoaded] = useState(false);
  const [preparedDownload, setPreparedDownload] = useState<PreparedDownload | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);
  const quotaStorageKey = getQuotaStorageKey(slug, transactionId);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(quotaStorageKey);
    const stored = storedValue === null ? MAX_DOWNLOADS : Number(storedValue);
    setRemainingDownloads(Number.isInteger(stored) ? Math.min(MAX_DOWNLOADS, Math.max(0, stored)) : MAX_DOWNLOADS);
    setQuotaLoaded(true);
  }, [quotaStorageKey]);

  useEffect(() => {
    if (!preparedDownload) return;
    const updateExpiry = () => {
      const remaining = Math.max(0, Math.ceil((preparedDownload.expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) setPreparedDownload(null);
    };
    updateExpiry();
    const timer = window.setInterval(updateExpiry, 1000);
    return () => window.clearInterval(timer);
  }, [preparedDownload]);

  const handlePrepareDownload = async () => {
    if (remainingDownloads <= 0) {
      toast.error("La limite de trois téléchargements a été atteinte.");
      return;
    }
    setIsPreparing(true);
    try {
      const download = await fetchResourceDownload(slug, transactionId);
      const nextRemaining = Math.min(
        remainingDownloads - 1,
        download.remaining_downloads ?? MAX_DOWNLOADS,
      );
      setRemainingDownloads(nextRemaining);
      window.localStorage.setItem(quotaStorageKey, String(nextRemaining));
      setPreparedDownload({
        url: download.url,
        fileName: download.file_name,
        expiresAt: Date.now() + Math.max(0, download.expires_in) * 1000,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Impossible de générer le lien de téléchargement.");
    } finally {
      setIsPreparing(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => void handlePrepareDownload()}
        disabled={!quotaLoaded || isPreparing || remainingDownloads <= 0}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPreparing ? <LoaderCircle size={18} className="animate-spin" /> : <Download size={18} />}
        {isPreparing
          ? "Préparation du téléchargement…"
          : remainingDownloads <= 0
            ? "Limite de téléchargements atteinte"
            : preparedDownload
              ? "Générer un nouveau lien"
              : "Préparer le téléchargement"}
      </button>
      {quotaLoaded && (
        <p className="mt-2 text-center text-xs text-secondary-foreground/65">
          {remainingDownloads} téléchargement{remainingDownloads > 1 ? "s" : ""} restant{remainingDownloads > 1 ? "s" : ""} sur {MAX_DOWNLOADS}
        </p>
      )}
      {preparedDownload && secondsLeft > 0 && (
        <a
          href={preparedDownload.url}
          download={preparedDownload.fileName}
          className="mt-3 flex flex-col items-center rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/20"
        >
          <span className="inline-flex items-center gap-2"><Download size={16} /> Télécharger maintenant</span>
          <span className="mt-1 text-xs font-normal">
            Lien valable encore {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
          </span>
        </a>
      )}
    </div>
  );
}
