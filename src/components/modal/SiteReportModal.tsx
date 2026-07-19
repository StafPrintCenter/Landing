import { useEffect, useState } from "react";
import { Flag } from "lucide-react";
import { createReport, ReportApiError } from "@/stores/useReportsStore";
import { type ReportReason, type ReportableType } from "@/data/reports";
import { useReportPrefill } from "@/hooks/use-report-prefill";
import { BaseModal, ModalHeader } from "./";
import { SuccessState } from "./site-report/SuccessState";
import { ReportForm } from "./site-report/ReportForm";

interface SiteReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SiteReportModal({ isOpen, onClose }: SiteReportModalProps) {
  const prefill = useReportPrefill();

  const [reportableType, setReportableType] = useState<ReportableType | "">("");
  const [reportableId, setReportableId] = useState("");
  const [reason, setReason] = useState<ReportReason>("incorrect_info");
  const [message, setMessage] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Ré-applique le pré-remplissage détecté à chaque ouverture (logique métier
  // indépendante du portail/escape/scroll-lock désormais géré par BaseModal)
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

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClassName="max-w-md"
      panelClassName="flex max-h-[85vh] flex-col overflow-hidden"
    >
      <div className="shrink-0 border-b border-border p-6 pb-4">
        <ModalHeader title="Signaler un problème" icon={Flag} onClose={onClose} />
      </div>

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
    </BaseModal>
  );
}