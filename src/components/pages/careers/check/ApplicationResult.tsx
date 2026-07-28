// src/components/pages/careers/check/ApplicationResult.tsx
import { Mail, Phone, Calendar, FileText, User, GraduationCap, CheckCircle2, Clock, XCircle } from "lucide-react";
import type { APIJobApplication } from "@/data/jobs";
import { resolveStorageUrl } from "@/lib/file-url";

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: typeof Clock }> = {
  pending: { label: "En attente d'examen", className: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
  accepted: { label: "Candidature Retenue", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 },
  rejected: { label: "Non retenue", className: "bg-muted text-muted-foreground border-border", icon: XCircle },
};

interface ApplicationResultProps {
  application: APIJobApplication;
  onReset: () => void;
}

export function ApplicationResult({ application, onReset }: ApplicationResultProps) {
  const status = STATUS_CONFIG[application.status] ?? {
    label: application.status,
    className: "bg-muted text-muted-foreground border-border",
    icon: Clock,
  };

  const StatusIcon = status.icon;
  const cvProxyUrl = resolveStorageUrl(application.cvUrl);
  const coverLetterProxyUrl = resolveStorageUrl(application.coverLetterFileUrl);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs space-y-6">
      {/* En-tête statut */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Offre postulée</span>
          <h3 className="font-display text-xl font-bold text-foreground">{application.jobOffer}</h3>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}>
          <StatusIcon size={14} />
          {status.label}
        </span>
      </div>

      {/* Informations Candidat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2.5 text-foreground">
          <User size={16} className="text-primary shrink-0" />
          <span>{application.firstName} {application.lastName}</span>
        </div>

        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Mail size={16} className="text-primary shrink-0" />
          <span>{application.email}</span>
        </div>

        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Phone size={16} className="text-primary shrink-0" />
          <span>{application.phone}</span>
        </div>

        {application.educationLevel && (
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <GraduationCap size={16} className="text-primary shrink-0" />
            <span>Niveau d'études : <strong className="text-foreground font-medium">{application.educationLevel}</strong></span>
          </div>
        )}

        <div className="flex items-center gap-2.5 text-muted-foreground">
          <Calendar size={16} className="text-primary shrink-0" />
          <span>Envoyée le {new Date(application.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>

        {application.reviewedAt && (
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Clock size={16} className="text-primary shrink-0" />
            <span>Traitée le {new Date(application.reviewedAt).toLocaleDateString("fr-FR")}</span>
          </div>
        )}
      </div>

      {/* Lettre de motivation texte si disponible */}
      {application.coverLetter && (
        <div className="rounded-xl bg-muted/50 p-4 border border-border text-xs leading-relaxed space-y-1">
          <p className="font-semibold text-foreground">Lettre de motivation :</p>
          <p className="text-muted-foreground whitespace-pre-line">{application.coverLetter}</p>
        </div>
      )}

      {/* Fichiers Joints (Proxifiés) */}
      <div className="flex flex-wrap gap-3 border-t border-border pt-5">
        {cvProxyUrl && (
          <a
            href={cvProxyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <FileText size={15} className="text-primary" />
            Consulter le CV
          </a>
        )}

        {coverLetterProxyUrl && (
          <a
            href={coverLetterProxyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <FileText size={15} className="text-primary" />
            Consulter la lettre de motivation (Fichier)
          </a>
        )}
      </div>

      {/* Bouton pour faire une nouvelle recherche */}
      <div className="pt-2">
        <button
          onClick={onReset}
          className="text-xs font-medium text-muted-foreground hover:text-foreground underline cursor-pointer"
        >
          Effectuer une autre recherche
        </button>
      </div>
    </div>
  );
}