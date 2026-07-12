import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Flag, X, Loader2, CheckCircle2, Info } from "lucide-react";
import { createReport } from "@/stores/useReportsStore";
import {
  REPORT_REASON_LABELS,
  REPORTABLE_TYPE_LABELS,
  type ReportReason,
  type ReportableType,
} from "@/data/reports";
import { useReportPrefill } from "@/hooks/use-report-prefill";

const REASON_OPTIONS = Object.keys(REPORT_REASON_LABELS) as ReportReason[];
const TYPE_OPTIONS = Object.keys(REPORTABLE_TYPE_LABELS) as ReportableType[];

interface SiteReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function IdTooltip() {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-label="Comment obtenir cet identifiant ?"
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-primary cursor-help"
      >
        <Info size={14} />
      </button>
      {show && (
        <span className="absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-card p-2.5 text-[11px] leading-relaxed text-muted-foreground shadow-lg">
          Cet identifiant est rempli automatiquement lorsque vous ouvrez ce formulaire depuis la
          page précise du service, de la formation, de l'article ou de la réalisation concernée.
          Si ce n'est pas le cas, ouvrez d'abord cette page, puis revenez signaler le problème —
          le champ se remplira alors tout seul.
        </span>
      )}
    </span>
  );
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

  // Applique le pré-remplissage détecté à chaque ouverture du modal
  useEffect(() => {
    if (!isOpen) return;
    setReportableType(prefill.reportableType ?? "service");
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

    if (!reportableType) {
      setError("Merci de choisir le type de ressource concernée.");
      return;
    }
    if (!reportableId.trim()) {
      setError("L'identifiant de la ressource est obligatoire.");
      return;
    }

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
    } catch {
      setError("Erreur lors de l'envoi du signalement. Réessayez.");
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

        <div className="overflow-y-auto p-6 pt-4">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 size={28} />
              </span>
              <p className="text-sm font-medium">Signalement envoyé, merci.</p>
              <p className="text-xs text-muted-foreground">Notre équipe l'examinera dans les meilleurs délais.</p>
              <button
                onClick={onClose}
                className="mt-2 w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted cursor-pointer"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Type de ressource</span>
                <select
                  value={reportableType}
                  onChange={(e) => setReportableType(e.target.value as ReportableType | "")}
                  className="input w-full cursor-pointer"
                >
                  <option value="" disabled>— Choisir le type —</option>
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{REPORTABLE_TYPE_LABELS[t]}</option>
                  ))}
                </select>
                {prefill.onListingPage && (
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Type détecté automatiquement — précisez l'identifiant ci-dessous.
                  </span>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
                  Identifiant de la ressource <span className="text-destructive">*</span>
                  <IdTooltip />
                </span>
                <input
                  type="text"
                  value={reportableId}
                  onChange={(e) => setReportableId(e.target.value)}
                  placeholder="ex: ab93b47d-4e45-4da2-8b81-d033df89bcb6"
                  className="input w-full"
                  required
                />
                {prefill.reportableId && reportableId === prefill.reportableId && (
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Rempli automatiquement depuis cette page — modifiable si besoin.
                  </span>
                )}
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Motif</span>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as ReportReason)}
                  className="input w-full cursor-pointer"
                >
                  {REASON_OPTIONS.map((r) => (
                    <option key={r} value={r}>{REPORT_REASON_LABELS[r]}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Message (optionnel)</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Décrivez le problème rencontré…"
                  className="input w-full"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Votre email (optionnel)</span>
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="input w-full"
                />
              </label>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Flag size={16} />}
                {isSubmitting ? "Envoi…" : "Envoyer le signalement"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}