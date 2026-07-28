import { X, ExternalLink, Download } from "lucide-react";

interface FilePreviewModalProps {
  url: string | null;
  title: string;
  onClose: () => void;
}

export function FilePreviewModal({ url, title, onClose }: FilePreviewModalProps) {
  if (!url) return null;

  const absoluteUrl = window.location.origin + url;
  const extension = url.split(".").pop()?.toLowerCase() || "";

  const isPdf = extension === "pdf";
  const isImage = ["jpg", "jpeg", "png", "webp", "gif"].includes(extension);
  const isDocx = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(extension);

  // Pour les fichiers Word/Office, on passe par la visionneuse Google Docs
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    absoluteUrl
  )}&embedded=true`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-4xl h-[85vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Barre d'en-tête de la modale */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5 bg-muted/30">
          <h4 className="text-sm font-semibold text-foreground truncate">{title}</h4>

          <div className="flex items-center gap-2">
            <a
              href={url}
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Download size={14} /> Télécharger
            </a>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card p-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              title="Ouvrir dans une nouvelle fenêtre"
            >
              <ExternalLink size={14} />
            </a>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Corps de l'aperçu */}
        <div className="flex-1 bg-muted/10 p-2 overflow-auto flex items-center justify-center">
          {isPdf ? (
            <iframe
              src={url}
              className="w-full h-full rounded-lg border-0"
              title={title}
            />
          ) : isImage ? (
            <img
              src={url}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : isDocx ? (
            <iframe
              src={googleViewerUrl}
              className="w-full h-full rounded-lg border-0"
              title={title}
            />
          ) : (
            <iframe
              src={url}
              className="w-full h-full rounded-lg border-0"
              title={title}
            />
          )}
        </div>
      </div>
    </div>
  );
}