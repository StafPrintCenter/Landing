// src/components/pages/careers/check/ApplicationResult.tsx
import { useState } from "react";
import { Mail, Phone, Calendar, FileText, User, GraduationCap, CheckCircle2, Clock, XCircle, ArrowLeft, Eye } from "lucide-react";
import type { APIJobApplication } from "@/data/jobs";
import { resolveStorageUrl } from "@/lib/file-url";
import { FilePreviewModal } from "./FilePreviewModal";

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
  const [activePreview, setActivePreview] = useState<{ url: string; title: string } | null>(null);

  const status = STATUS_CONFIG[application.status] ?? {
    label: application.status,
    className: "bg-muted text-muted-foreground border-border",
    icon: Clock,
  };

  const StatusIcon = status.icon;
  const cvProxyUrl = resolveStorageUrl(application.cvUrl);
  const coverLetterProxyUrl = resolveStorageUrl(application.coverLetterFileUrl);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Poste sollicité
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
              {application.jobOffer}
            </h3>
          </div>

          <div>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${status.className}`}>
              <StatusIcon size={14} />
              {status.label}
            </span>
          </div>
        </div>

        {/* Grille d'infos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
            <User size={18} className="text-primary shrink-0" />
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground">Candidat</p>
              <p className="font-semibold text-foreground truncate">{application.firstName} {application.lastName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
            <Mail size={18} className="text-primary shrink-0" />
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium text-foreground truncate">{application.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
            <Phone size={18} className="text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Téléphone</p>
              <p className="font-medium text-foreground">{application.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
            <GraduationCap size={18} className="text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Niveau d'études</p>
              <p className="font-medium text-foreground">{application.educationLevel || "Non renseigné"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
            <Calendar size={18} className="text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Date de soumission</p>
              <p className="font-medium text-foreground">
                {new Date(application.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {application.reviewedAt && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
              <Clock size={18} className="text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Dernière mise à jour</p>
                <p className="font-medium text-foreground">
                  {new Date(application.reviewedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Lettre de motivation texte */}
        {application.coverLetter && (
          <div className="space-y-2 rounded-xl bg-muted/30 p-4 border border-border">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Lettre de motivation
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
              {application.coverLetter}
            </p>
          </div>
        )}

        {/* Boutons d'Aperçu des Fichiers */}
        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          {cvProxyUrl && (
            <button
              onClick={() => setActivePreview({ url: cvProxyUrl, title: `CV - ${application.firstName} ${application.lastName}` })}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
            >
              <Eye size={15} />
              Aperçu du CV
            </button>
          )}

          {coverLetterProxyUrl && (
            <button
              onClick={() => setActivePreview({ url: coverLetterProxyUrl, title: `Lettre de motivation - ${application.firstName} ${application.lastName}` })}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <FileText size={15} />
              Aperçu Lettre de motivation (Fichier)
            </button>
          )}
        </div>
      </div>

      {/* Bouton réinitialiser */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Effectuer une autre recherche
        </button>
      </div>

      {/* Modale d'Aperçu Intégrée */}
      {activePreview && (
        <FilePreviewModal
          url={activePreview.url}
          title={activePreview.title}
          onClose={() => setActivePreview(null)}
        />
      )}
    </div>
  );
}