import { useState, useEffect, useRef } from "react";
import { Link2, X, Search, Copy, Check, Loader2, PlusCircle, HelpCircle, MessageSquare, CircleX } from "lucide-react";
import { resolveShortlink } from "@/stores/useShortlinksStore";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { SITE } from "@/data/site";
import { withWhatsAppMessage } from "@/lib/message/whatsapp";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import type { APIShortlink } from "@/data/shortlinks";

type CheckStatus = "idle" | "loading" | "done" | "error";

export function FloatingHelpMenu() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [shortLink, setShortLink] = useState<APIShortlink | null>(null);
  const [longUrl, setLongUrl] = useState("");
  const [copiedTarget, setCopiedTarget] = useState<"long" | "short" | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const SHORTEN_SITE_URL = import.meta.env.VITE_SHORTSITE_URL;

  // Lien WhatsApp pré-rempli
  const richPropsWhatsappLink = withWhatsAppMessage(
    SITE.whatsappLink,
    [
      `Bonjour ${SITE.name},`,
      `Je viens de visiter votre site internet et je souhaiterais obtenir davantage d'informations sur vos services.`,
      `Pouvez-vous me conseiller selon mon besoin ?`,
      "Merci d'avance.",
    ].join("\n")
  );

  // Gestionnaire de clic extérieur pour fermer le menu
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

  const handleBuildCreateLink = () => {
    const currentUrl = buildShareUrl(window.location.pathname + window.location.search);
    const encodedUrl = encodeURIComponent(currentUrl);
    return `${SHORTEN_SITE_URL.replace(/\/$/, "")}?create=${encodedUrl}`;
  };

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Fenêtre de dialogue d'aide */}
      {open && (
        <div className="mb-3 w-80 rounded-2xl border border-border bg-card p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* En-tête */}
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Centre d'aide & Outils</h3>
              <p className="text-[11px] text-muted-foreground">Besoin d'aide ou envie de partager ?</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted cursor-pointer transition"
            >
              <X size={15} />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* SECTION 1 : Support WhatsApp */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Assistance directe
              </span>
              <a
                href={richPropsWhatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[oklch(0.7_0.17_150)/30%] bg-[oklch(0.7_0.17_150/6%)] px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-[oklch(0.7_0.17_150/12%)]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.7_0.17_150)] text-white shadow-sm">
                  <WhatsAppIcon size={20} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-semibold text-foreground">Discuter sur WhatsApp</p>
                  <p className="truncate text-[11px] text-muted-foreground">Conseils & questions en temps réel</p>
                </div>
              </a>
            </div>

            {/* SECTION 2 : Vérificateur de lien / Partage */}
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
                    <span className="flex-1 truncate text-[11px] text-muted-foreground">{longUrl}</span>
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

                  {/* Lien court ou Proposition de création si absent */}
                  {shortLink ? (
                    <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-2.5 py-1.5">
                      <Link2 size={13} className="shrink-0 text-primary" />
                      <span className="flex-1 truncate text-xs font-semibold text-foreground">{shortLink.shortUrl}</span>
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
                        href={handleBuildCreateLink()}
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
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bouton d'action principal flottant (Trigger) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Ouvrir le menu d'aide"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 cursor-pointer transition duration-200 ring-4 ring-primary/10"
      >
        {open ? (
          <CircleX size={18} className="animate-in spin-in-90 duration-200" />
        ) : (
          <HelpCircle size={18} className="animate-in fade-in zoom-in-75 duration-200" />
        )}
      </button>
    </div>
  );
}