import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /**
   * "sheet" : tiroir en bas sur mobile, centré sur desktop (comportement historique
   * de ShareModal/SiteReportModal/NewsletterPromptModal).
   * "center" : toujours centré, mobile comme desktop (pour TrainningRegistration).
   */
  variant?: "sheet" | "center";
  maxWidthClassName?: string;
  /** Classes additionnelles sur le panneau (ex: flex flex-col max-h-[85vh] overflow-hidden) */
  panelClassName?: string;
  /** Classe du fond assombri — permet de garder un ton différent si besoin (ex: bg-background/80) */
  backdropClassName?: string;
}

export function BaseModal({
  isOpen,
  onClose,
  children,
  variant = "sheet",
  maxWidthClassName = "max-w-md",
  panelClassName = "",
  backdropClassName = "bg-black/60 backdrop-blur-sm",
}: BaseModalProps) {
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

  const wrapperClass =
    variant === "sheet"
      ? `fixed inset-0 z-100 flex items-end justify-center ${backdropClassName} md:items-center`
      : `fixed inset-0 z-100 flex items-center justify-center ${backdropClassName} p-4`;

  const panelBaseClass =
    variant === "sheet"
      ? `w-full ${maxWidthClassName} rounded-t-2xl border border-border bg-card md:rounded-2xl animate-in fade-in slide-in-from-bottom-4 md:zoom-in-95 duration-200`
      : `w-full ${maxWidthClassName} rounded-2xl border border-border bg-card shadow-lg animate-in fade-in zoom-in-95 duration-200`;

  return createPortal(
    <div className={wrapperClass} onClick={onClose}>
      <div className={`${panelBaseClass} ${panelClassName}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}