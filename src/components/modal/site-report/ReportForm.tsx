import { Flag, Loader2 } from "lucide-react";
import {
  REPORT_REASON_LABELS,
  REPORTABLE_TYPE_LABELS,
  type ReportReason,
  type ReportableType,
} from "@/data/reports";
import { useReportPrefill } from "@/hooks/use-report-prefill";
import { IdTooltip, EmailTooltip } from "./ReportTooltips";

const REASON_OPTIONS = Object.keys(REPORT_REASON_LABELS) as ReportReason[];
const TYPE_OPTIONS = Object.keys(REPORTABLE_TYPE_LABELS) as ReportableType[];

interface ReportFormProps {
  reportableType: ReportableType | "";
  reportableId: string;
  reason: ReportReason;
  message: string;
  reporterEmail: string;
  isSubmitting: boolean;
  error: string | null;
  prefill: ReturnType<typeof useReportPrefill>;
  setReportableType: (val: ReportableType | "") => void;
  setReportableId: (val: string) => void;
  setReason: (val: ReportReason) => void;
  setMessage: (val: string) => void;
  setReporterEmail: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ReportForm({
  reportableType,
  reportableId,
  reason,
  message,
  reporterEmail,
  isSubmitting,
  error,
  prefill,
  setReportableType,
  setReportableId,
  setReason,
  setMessage,
  setReporterEmail,
  onSubmit,
}: ReportFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          Identifiant de la ressource
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
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
          Votre email (optionnel)
          <EmailTooltip />
        </span>
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
  );
}