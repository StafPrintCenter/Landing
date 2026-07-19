import { Link } from "@tanstack/react-router";
import { Mail, ArrowRight, Clock, X } from "lucide-react";
import { BaseModal } from "./BaseModal";

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
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidthClassName="max-w-sm">
      <div className="p-6 text-center">
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
    </BaseModal>
  );
}