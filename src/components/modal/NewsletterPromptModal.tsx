import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Mail, ArrowRight, Clock, X } from "lucide-react";

interface NewsletterPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRemindLater: (days?: number) => void;
  onNeverAgain: () => void;
}

export function NewsletterPromptModal({
  isOpen,
  onClose,
  onRemindLater,
  onNeverAgain,
}: NewsletterPromptModalProps) {
  const [mounted, setMounted] = useState(false);

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

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-t-2xl border border-border bg-card p-6 text-center md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mx-auto -mt-2 mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail size={26} />
        </div>

        <h2 className="font-display text-lg font-bold">Restons en contact</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Recevez nos conseils design, impression et digital, une fois par mois, sans spam.
        </p>

        <Link
          to="/tools/newsletter"
          onClick={onClose}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          S'inscrire <ArrowRight size={16} />
        </Link>

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
      </div>
    </div>,
    document.body
  );
}