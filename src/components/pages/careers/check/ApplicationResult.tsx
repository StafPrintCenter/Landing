import { Mail, Phone, Briefcase, Calendar, FileText } from "lucide-react";
import type { APIJobApplication } from "@/data/jobs";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  accepted: { label: "Acceptée", className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Non retenue", className: "bg-muted text-muted-foreground border-border" },
};

interface ApplicationResultProps {
  application: APIJobApplication;
}

export function ApplicationResult({ application }: ApplicationResultProps) {
  const status = STATUS_LABELS[application.status] ?? { label: application.status, className: "bg-muted text-muted-foreground border-border" };

  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold">{application.jobOffer}</h3>
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><Mail size={14} /> {application.email}</div>
        <div className="flex items-center gap-2"><Phone size={14} /> {application.phone}</div>
        <div className="flex items-center gap-2">
          <Calendar size={14} /> Candidature envoyée le {new Date(application.createdAt).toLocaleDateString("fr-FR")}
        </div>
        <a href={application.cvUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
          <FileText size={14} /> Consulter le CV envoyé
        </a>
      </div>
    </div>
  );
}