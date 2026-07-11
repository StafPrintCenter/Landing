import { useState } from "react";
import { Link2, X, Search, Copy, Check, Loader2 } from "lucide-react";
import { resolveShortlink } from "@/stores/useShortlinksStore";
import { buildShareUrl } from "@/lib/share/build-share-url";
import type { APIShortlink } from "@/data/shortlinks";

export function ShortlinkChecker() {
  const [open, setOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<APIShortlink | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    setIsChecking(true);
    setError(false);
    setCopied(false);
    try {
      const currentUrl = buildShareUrl(window.location.pathname + window.location.search);
      const found = await resolveShortlink(currentUrl);
      setResult(found);
      setChecked(true);
    } catch {
      setError(true);
    } finally {
      setIsChecking(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-border bg-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Lien court de cette page</h3>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="rounded-full p-1 text-muted-foreground hover:bg-muted cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          <button
            onClick={handleCheck}
            disabled={isChecking}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 disabled:opacity-60 cursor-pointer"
          >
            {isChecking ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
            {isChecking ? "Vérification…" : "Vérifier le lien court"}
          </button>

          {checked && !isChecking && (
            <div className="mt-3">
              {error ? (
                <p className="text-xs text-destructive">Erreur lors de la vérification.</p>
              ) : result ? (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2">
                  <Link2 size={14} className="shrink-0 text-muted-foreground" />
                  <span className="flex-1 truncate text-xs text-muted-foreground">{result.shortUrl}</span>
                  <button
                    onClick={handleCopy}
                    aria-label="Copier"
                    className="shrink-0 rounded-full bg-primary p-1.5 text-primary-foreground cursor-pointer"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Aucun lien court n'existe encore pour cette page.</p>
              )}
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Vérifier le lien court de cette page"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 cursor-pointer transition"
      >
        <Link2 size={20} />
      </button>
    </div>
  );
}