import { CheckCircle2, Award, User, BookOpen, Calendar, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { APICertificateVerification } from "@/data/certificates";

interface CertificateValidStateProps {
  data: APICertificateVerification;
  number: string;
}

export function CertificateValidState({ data, number }: CertificateValidStateProps) {
  const formattedDate = new Date(data.issuedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex flex-col items-center text-center pb-6 border-b border-border">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-4">
          <CheckCircle2 size={36} />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 mb-2">
          <ShieldCheck size={14} /> Certificat Authentique et Actif
        </span>
        <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{number}</h2>
      </div>

      <div className="grid gap-4 py-6 md:grid-cols-2 text-sm">
        <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
          <User size={18} className="text-primary mt-0.5 shrink-0" />
          <div>
            <span className="block text-xs text-muted-foreground">Titulaire du certificat</span>
            <span className="font-semibold text-foreground">{data.studentName}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
          <BookOpen size={18} className="text-primary mt-0.5 shrink-0" />
          <div>
            <span className="block text-xs text-muted-foreground">Formation suivie</span>
            <span className="font-semibold text-foreground">{data.trainingTitle}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
          <Award size={18} className="text-primary mt-0.5 shrink-0" />
          <div>
            <span className="block text-xs text-muted-foreground">Formateur / Responsable</span>
            <span className="font-semibold text-foreground">{data.instructorName}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
          <Calendar size={18} className="text-primary mt-0.5 shrink-0" />
          <div>
            <span className="block text-xs text-muted-foreground">Date de délivrance</span>
            <span className="font-semibold text-foreground">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 text-center">
        <Link to="/" className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted transition">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}