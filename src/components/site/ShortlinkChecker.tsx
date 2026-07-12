import { useState, useEffect, useRef } from "react";
import { Link2, X, Search, Copy, Check, Loader2, PlusCircle } from "lucide-react";
import { resolveShortlink } from "@/stores/useShortlinksStore";
import { buildShareUrl } from "@/lib/share/build-share-url";
import type { APIShortlink } from "@/data/shortlinks";

type CheckStatus = "idle" | "loading" | "done" | "error";

export function ShortlinkChecker() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [shortLink, setShortLink] = useState<APIShortlink | null>(null);
  const [longUrl, setLongUrl] = useState("");
  const [copiedTarget, setCopiedTarget] = useState<"long" | "short" | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const SHORTEN_SITE_URL = import.meta.env.VITE_SHORTSITE_URL;

  // Gestionnaire du clic extérieur
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleCheck = async () => {
    setStatus("loading");
    setCopiedTarget(null);
    try {
      const currentUrl = buildShareUrl(window.location.pathname + window.location.search);
      setLongUrl(currentUrl);
      const found = await resolveShortlink(currentUrl);
      setShortLink(found);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const handleCopy = async (value: string, target: "long" | "short") => {
    await navigator.clipboard.writeText(value);
    setCopiedTarget(target);
    setTimeout(() => setCopiedTarget(null), 2000);
  };

  // Construction du lien vers SHORTEN avec l'URL actuelle en paramètre
  const handleBuildCreateLink = () => {
    const currentUrl = buildShareUrl(window.location.pathname + window.location.search);
    const encodedUrl = encodeURIComponent(currentUrl);
    return `${SHORTEN_SITE_URL.replace(/\/$/, "")}?create=${encodedUrl}`;
  };

  return (
    <div ref={containerRef} className="fixed bottom-5 left-5 z-50">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-border bg-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Lien de cette page</h3>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="rounded-full p-1 text-muted-foreground hover:bg-muted cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {status === "idle" && (
            <button
              onClick={handleCheck}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer"
            >
              <Search size={14} />
              Obtenir le lien de la page
            </button>
          )}

          {status === "loading" && (
            <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-3 text-xs text-muted-foreground">
              <Loader2 size={14} className="animate-spin" />
              Vérification…
            </div>
          )}

          {status === "error" && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-destructive">Erreur lors de la vérification.</p>
              <button
                onClick={handleCheck}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer"
              >
                <Search size={14} />
                Réessayer
              </button>
            </div>
          )}

          {status === "done" && (
            <div className="mt-3 space-y-2">
              {/* URL longue */}
              <div className="flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2">
                <Link2 size={14} className="shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate text-xs text-muted-foreground">{longUrl}</span>
                {!shortLink && (
                  <button
                    onClick={() => handleCopy(longUrl, "long")}
                    aria-label="Copier le lien complet"
                    className="shrink-0 rounded-full bg-primary p-1.5 text-primary-foreground cursor-pointer"
                  >
                    {copiedTarget === "long" ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                )}
              </div>

              {/* Lien court ou Proposition de création */}
              {shortLink ? (
                <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2">
                  <Link2 size={14} className="shrink-0 text-primary" />
                  <span className="flex-1 truncate text-xs font-medium text-foreground">{shortLink.shortUrl}</span>
                  <button
                    onClick={() => handleCopy(shortLink.shortUrl, "short")}
                    aria-label="Copier le lien court"
                    className="shrink-0 rounded-full bg-primary p-1.5 text-primary-foreground cursor-pointer"
                  >
                    {copiedTarget === "short" ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-muted-foreground leading-normal">
                    Aucun lien court n'existe encore pour cette page.
                  </p>
                  <a
                    href={handleBuildCreateLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
                  >
                    <PlusCircle size={13} />
                    Raccourcir ce lien
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Obtenir le lien de la page"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 cursor-pointer transition"
      >
        <Link2 size={20} />
      </button>
    </div>
  );
}