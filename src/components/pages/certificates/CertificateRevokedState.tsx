import { XCircle, Link as LinkIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { APICertificateVerification } from "@/data/certificates";

interface CertificateRevokedStateProps {
  data: APICertificateVerification | null;
  number: string;
}

export function CertificateRevokedState({ data, number }: CertificateRevokedStateProps) {
  const isRevoked = data?.status === "revoked";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 text-center shadow-sm">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
        <XCircle size={36} />
      </div>

      <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive mb-2">
        {isRevoked ? "Certificat révoqué" : "Certificat introuvable"}
      </span>

      <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">{number}</h2>

      <p className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
        {isRevoked
          ? `Ce certificat délivré à ${data.studentName} pour la formation "${data.trainingTitle}" a été officiellement révoqué par l'organisme.`
          : "Le numéro de certificat saisi ne correspond à aucun enregistrement valide dans notre base de données."}
      </p>

      <Link to="/" className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted transition">
        Retour à l'accueil
      </Link>
    </div>
  );
}