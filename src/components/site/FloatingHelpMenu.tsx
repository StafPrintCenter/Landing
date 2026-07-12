import { useState, useEffect, useRef } from "react";
import { MessageCircle, Link2, X, Search, Copy, Check, Loader2, PlusCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { withWhatsAppMessage } from "@/lib/message/whatsapp";
import { resolveShortlink } from "@/stores/useShortlinksStore";
import { buildShareUrl } from "@/lib/share/build-share-url";
import type { APIShortlink } from "@/data/shortlinks";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

type CheckStatus = "idle" | "loading" | "done" | "error";

export function FloatingHelpMenu() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [shortLink, setShortLink] = useState<APIShortlink | null>(null);
  const [longUrl, setLongUrl] = useState("");
  const [copiedTarget, setCopiedTarget] = useState<"long" | "short" | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const SHORTEN_SITE_URL = import.meta.env.VITE_SHORTSITE_URL;

  const richWhatsappLink = withWhatsAppMessage(
    SITE.whatsappLink,
    [
      `Bonjour ${SITE.name},`,
      `Je viens de visiter votre site internet et je souhaiterais obtenir davantage d'informations sur vos services.`,
      `Pouvez-vous me conseiller selon mon besoin ?`,
      "Merci d'avance.",
    ].join("\n")
  );

  // Fermeture via clic extérieur
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Fermeture via Échap
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  const resetCheckerOnOpen = () => {
    setStatus("idle");
    setShortLink(null);
    setLongUrl("");
    setCopiedTarget(null);
  };

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) resetCheckerOnOpen();
      return next;
    });
  };

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
    <>
      {/* Bouton flottant unique */}
      <button
        onClick={toggleOpen}
        aria-label="Ouvrir les actions rapides"
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/25 transition hover:scale-105 cursor-pointer"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Overlay + Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 p-5 sm:items-center sm:justify-center">
          <div
            ref={panelRef}
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Besoin d'aide ?</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="rounded-full p-1.5 text-muted-foreground hover:bg-muted cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Bloc WhatsApp */}
            <a
              href={richWhatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center gap-3 rounded-xl bg-[oklch(0.7_0.17_150)] px-4 py-3 text-white shadow transition hover:opacity-90"
            >
              <WhatsAppIcon size={22} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Discuter sur WhatsApp</span>
                <span className="text-xs text-white/80">Réponse rapide garantie</span>
              </div>
            </a>

            {/* Séparateur */}
            <div className="my-4 h-px bg-border" />

            {/* Bloc Shortlink checker */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Lien de cette page</h4>

              {status === "idle" && (
                <button
                  onClick={handleCheck}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer"
                >
                  <Search size={14} />
                  Obtenir le lien de la page
                </button>
              )}

              {status === "loading" && (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-3 text-xs text-muted-foreground">
                  <Loader2 size={14} className="animate-spin" />
                  Vérification…
                </div>
              )}

              {status === "error" && (
                <div className="space-y-2">
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
                <div className="space-y-2">
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
          </div >
        </div >
      )
      }
    </>
  );
}