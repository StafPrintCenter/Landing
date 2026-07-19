import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Mail, Loader2, AlertCircle, Clock, X } from "lucide-react";
import { TopicsSelector } from "@/components/pages/tools/newsletter/home";
import { subscribeNewsletter } from "@/stores/useNewsletterStore";

interface NewsletterPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
  onRemindLater: (days?: number) => void;
  onNeverAgain: () => void;
}

export function NewsletterPromptModal({
  isOpen,
  onClose,
  onSubscribed,
  onRemindLater,
  onNeverAgain,
}: NewsletterPromptModalProps) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadySubscribedMsg, setAlreadySubscribedMsg] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const toggle = (categoryId: string) =>
    setSelected((prev) => (prev.includes(categoryId) ? prev.filter((x) => x !== categoryId) : [...prev, categoryId]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setError(null);
    setIsSubmitting(true);
    try {
      const res = await subscribeNewsletter({ email, categoryIds: selected, acceptedTerms: consent });
      if (res.alreadySubscribed) {
        setAlreadySubscribedMsg(true);
      }
      onSubscribed(); // dans les deux cas (déjà inscrit ou nouvelle inscription) : ne plus jamais reproposer
    } catch {
      setError("Une erreur est survenue. Merci de réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl border border-border bg-card p-6 md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Mail size={18} className="text-primary" /> Restons en contact
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {alreadySubscribedMsg ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <p className="text-sm font-medium">Vous êtes déjà abonné(e) !</p>
            <p className="text-xs text-muted-foreground">Merci de votre fidélité 🙂</p>
            <button
              onClick={onClose}
              className="mt-3 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted cursor-pointer"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <p className="mt-4 mb-4 text-sm text-muted-foreground">
              Recevez nos conseils design, impression et digital, une fois par mois, sans spam.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
              />

              <TopicsSelector selected={selected} onToggle={toggle} />

              <label className="flex items-start gap-2 text-xs text-foreground/70">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 cursor-pointer"
                />
                <span>J'accepte de recevoir la newsletter STAF PRINT CENTER et je peux me désabonner à tout moment.</span>
              </label>

              {error && (
                <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!email || !consent || isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "S'inscrire"}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
              <button
                onClick={() => onRemindLater(7)}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Clock size={12} /> Me rappeler plus tard
              </button>
              <button
                onClick={onNeverAgain}
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-destructive cursor-pointer"
              >
                <X size={12} /> Ne plus me demander
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}