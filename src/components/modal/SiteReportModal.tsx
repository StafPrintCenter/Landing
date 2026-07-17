import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Flag, X } from "lucide-react";
import { createReport, ReportApiError } from "@/stores/useReportsStore";
import { type ReportReason, type ReportableType } from "@/data/reports";
import { useReportPrefill } from "@/hooks/use-report-prefill";

// Imports des sous-composants morcelés du sous-dossier
import { SuccessState } from "./site-report/SuccessState";
import { ReportForm } from "./site-report/ReportForm";

interface SiteReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SiteReportModal({ isOpen, onClose }: SiteReportModalProps) {
  const [mounted, setMounted] = useState(false);
  const prefill = useReportPrefill();

  const [reportableType, setReportableType] = useState<ReportableType | "">("");
  const [reportableId, setReportableId] = useState("");
  const [reason, setReason] = useState<ReportReason>("incorrect_info");
  const [message, setMessage] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    setReportableType(prefill.reportableType ?? "");
    setReportableId(prefill.reportableId);
    setReason("incorrect_info");
    setMessage("");
    setReporterEmail("");
    setError(null);
    setSubmitted(false);
  }, [isOpen, prefill.reportableType, prefill.reportableId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!reportableType) return setError("Merci de choisir le type de ressource concernée.");
    if (!reportableId.trim()) return setError("L'identifiant de la ressource est obligatoire.");

    setIsSubmitting(true);
    try {
      await createReport({
        reportableType,
        reportableId: reportableId.trim(),
        reason,
        message: message.trim() || undefined,
        reporterEmail: reporterEmail.trim() || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ReportApiError ? err.message : "Erreur lors de l'envoi du signalement. Réessayez.");
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
        className="flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl border border-border bg-card md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header commun */}
        <div className="flex shrink-0 items-center justify-between border-b border-border p-6 pb-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Flag size={18} className="text-primary" /> Signaler un problème
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Corps avec commutation de composants */}
        <div className="overflow-y-auto p-6 pt-4">
          {submitted ? (
            <SuccessState onClose={onClose} />
          ) : (
            <ReportForm
              reportableType={reportableType}
              reportableId={reportableId}
              reason={reason}
              message={message}
              reporterEmail={reporterEmail}
              isSubmitting={isSubmitting}
              error={error}
              prefill={prefill}
              setReportableType={setReportableType}
              setReportableId={setReportableId}
              setReason={setReason}
              setMessage={setMessage}
              setReporterEmail={setReporterEmail}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}