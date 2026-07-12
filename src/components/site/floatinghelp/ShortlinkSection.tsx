import { useState } from "react";
import { Link2, Search, Copy, Check, Loader2, PlusCircle } from "lucide-react";
import { resolveShortlink } from "@/stores/useShortlinksStore";
import { buildShareUrl } from "@/lib/share/build-share-url";
import type { APIShortlink } from "@/data/shortlinks";

type CheckStatus = "idle" | "loading" | "done" | "error";

export function ShortlinkSection() {
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [shortLink, setShortLink] = useState<APIShortlink | null>(null);
  const [longUrl, setLongUrl] = useState("");
  const [copiedTarget, setCopiedTarget] = useState<"long" | "short" | null>(null);

  const SHORTEN_SITE_URL = import.meta.env.VITE_SHORTSITE_URL;

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

  const buildCreateLink = () => {
    const currentUrl = buildShareUrl(window.location.pathname + window.location.search);
    const encodedUrl = encodeURIComponent(currentUrl);
    return `${SHORTEN_SITE_URL.replace(/\/$/, "")}?create=${encodedUrl}`;
  };

  return (
    <div className="space-y-2 border-t border-border pt-3">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        Raccourci de cette page
      </span>

      {status === "idle" && (
        <button
          onClick={handleCheck}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer transition"
        >
          <Search size={14} />
          Générer ou obtenir le lien court
        </button>
      )}

      {status === "loading" && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2.5 text-xs text-muted-foreground">
          <Loader2 size={14} className="animate-spin" />
          Génération en cours…
        </div>
      )}

      {status === "error" && (
        <div className="space-y-2">
          <p className="text-xs text-destructive">Erreur lors de la récupération.</p>
          <button
            onClick={handleCheck}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer transition"
          >
            <Search size={14} />
            Réessayer
          </button>
        </div>
      )}

      {status === "done" && (
        <div className="space-y-2">
          {/* URL longue d'origine */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-2.5 py-1.5">
            <Link2 size={13} className="shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-[11px] text-muted-foreground">{longUrl}</span>
            {!shortLink && (
              <button
                onClick={() => handleCopy(longUrl, "long")}
                aria-label="Copier le lien complet"
                className="shrink-0 rounded-lg bg-primary p-1.5 text-primary-foreground cursor-pointer transition hover:opacity-90"
              >
                {copiedTarget === "long" ? <Check size={11} /> : <Copy size={11} />}
              </button>
            )}
          </div>

          {/* Lien court ou proposition de création si absent */}
          {shortLink ? (
            <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-2.5 py-1.5">
              <Link2 size={13} className="shrink-0 text-primary" />
              <span className="min-w-0 flex-1 truncate text-xs font-semibold text-foreground">{shortLink.shortUrl}</span>
              <button
                onClick={() => handleCopy(shortLink.shortUrl, "short")}
                aria-label="Copier le lien court"
                className="shrink-0 rounded-lg bg-primary p-1.5 text-primary-foreground cursor-pointer transition hover:opacity-90"
              >
                {copiedTarget === "short" ? <Check size={11} /> : <Copy size={11} />}
              </button>
            </div>
          ) : (
            <div className="space-y-2 rounded-xl bg-accent/30 p-2.5">
              <p className="text-[11px] text-muted-foreground leading-normal">
                Aucun alias n'est configuré pour cette adresse Web.
              </p>
              <a
                href={buildCreateLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                <PlusCircle size={13} />
                Raccourcir maintenant
              </a>
            </div>
          )}
        </div>
      )
      }
    </div >
  );
}