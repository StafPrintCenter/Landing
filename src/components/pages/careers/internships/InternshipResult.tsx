import { useState } from "react";
import { Mail, Phone, School, BookOpen, Calendar, Clock, ArrowLeft, Eye, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { INTERNSHIP_STATUS_CONFIG, type APIInternshipRequest } from "@/data/internships";
import { FilePreviewModal } from "@/components/modal";

interface InternshipResultProps {
  request: APIInternshipRequest;
  onReset: () => void;
}

export function InternshipResult({ request, onReset }: InternshipResultProps) {
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  const status = INTERNSHIP_STATUS_CONFIG[request.status];
  const StatusIcon = status.icon;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Demande de stage</span>
            <h3 className="font-display text-xl font-bold">{request.firstName} {request.lastName}</h3>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${status.className}`}>
            <StatusIcon size={14} /> {status.label}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-sm">
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 p-3">
            <Mail size={18} className="shrink-0 text-primary" />
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="truncate font-medium">{request.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 p-3">
            <Phone size={18} className="shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Téléphone</p>
              <p className="font-medium">{request.phone}</p>
            </div>
          </div>
          {request.institution && (
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 p-3">
              <School size={18} className="shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Établissement</p>
                <p className="font-medium">{request.institution}</p>
              </div>
            </div>
          )}
          {request.fieldOfStudy && (
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 p-3">
              <BookOpen size={18} className="shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Filière</p>
                <p className="font-medium">{request.fieldOfStudy}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 p-3">
            <Calendar size={18} className="shrink-0 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Envoyée le</p>
              <p className="font-medium">{new Date(request.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>
          {request.reviewedAt && (
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/40 p-3">
              <Clock size={18} className="shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Dernière mise à jour</p>
                <p className="font-medium">{new Date(request.reviewedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            </div>
          )}
        </div>

        {request.message && (
          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider">Votre message</p>
            <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">{request.message}</p>
          </div>
        )}

        {request.infoRequestedMessage && (
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">Informations demandées</p>
            <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-purple-700/90">{request.infoRequestedMessage}</p>
          </div>
        )}

        {request.cvUrl && (
          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <button
              onClick={() => setPreview({ url: request.cvUrl as string, title: `CV - ${request.firstName} ${request.lastName}` })}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
            >
              <Eye size={15} /> Aperçu du CV
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button onClick={onReset} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer">
          <ArrowLeft size={14} /> Effectuer une autre recherche
        </button>
        <span className="text-muted-foreground/40">•</span>
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <Home size={14} /> Retour à l'accueil
        </Link>
      </div>

      {preview && <FilePreviewModal url={preview.url} title={preview.title} onClose={() => setPreview(null)} />}
    </div>
  );
}