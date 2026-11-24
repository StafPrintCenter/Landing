import { useEffect, useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { fetchResourceDownload } from "@/stores/useResourcesStore";

interface PreparedDownload {
  url: string;
  fileName: string;
  expiresAt: number;
}

interface ResourceDownloadActionProps {
  slug: string;
  transactionId?: string;
}

export function ResourceDownloadAction({ slug, transactionId }: ResourceDownloadActionProps) {
  const isPaid = Boolean(transactionId);
  const [remainingDownloads, setRemainingDownloads] = useState<number | null>(null);
  const [preparedDownload, setPreparedDownload] = useState<PreparedDownload | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);
  const [hasClickedDownload, setHasClickedDownload] = useState(false);

  useEffect(() => {
    if (!preparedDownload) return;

    const updateExpiry = () => {
      const remaining = Math.max(0, Math.ceil((preparedDownload.expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) {
        setPreparedDownload(null);
        setHasClickedDownload(false);
      }
    };

    updateExpiry();
    const timer = window.setInterval(updateExpiry, 1000);
    return () => window.clearInterval(timer);
  }, [preparedDownload]);

  const handlePrepareDownload = async () => {
    if (isPaid && remainingDownloads === 0) return;

    setIsPreparing(true);
    try {
      const download = await fetchResourceDownload(slug, transactionId);
      if (transactionId) {
        if (typeof download.remaining_downloads !== "number") {
          throw new Error("Le serveur n'a pas indiqué le nombre de téléchargements restants. Réessayez plus tard.");
        }
        setRemainingDownloads(download.remaining_downloads);
      }
      setHasClickedDownload(false);
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
      {!preparedDownload && (
        <button
          type="button"
          onClick={() => void handlePrepareDownload()}
          disabled={isPreparing || (isPaid && remainingDownloads === 0)}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPreparing ? <LoaderCircle size={18} className="animate-spin" /> : <Download size={18} />}
          {isPreparing
            ? "Préparation du téléchargement…"
            : isPaid && remainingDownloads === 0
              ? "Limite de téléchargements atteinte"
              : "Préparer le téléchargement"}
        </button>
      )}
      {isPaid && remainingDownloads !== null && (
        <p className="mt-2 text-center text-xs text-secondary-foreground/65">
          {remainingDownloads} téléchargement{remainingDownloads > 1 ? "s" : ""} restant{remainingDownloads > 1 ? "s" : ""}
        </p>
      )}
      {preparedDownload && secondsLeft > 0 && (
        <div className="mt-3 flex flex-col items-center rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-center">
          {!hasClickedDownload ? (
            <a
              href={preparedDownload.url}
              download={preparedDownload.fileName}
              onClick={() => setHasClickedDownload(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:opacity-80"
            >
              <Download size={16} /> Télécharger maintenant
            </a>
          ) : (
            <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Download size={16} /> Téléchargement lancé
            </button>
          )}
          <span className="mt-1 text-xs text-muted">
            Lien valable encore {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}
