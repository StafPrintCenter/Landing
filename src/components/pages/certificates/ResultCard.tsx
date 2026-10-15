import { ShieldCheck, ShieldX } from "lucide-react";
import type { APICertificateVerification } from "@/data/certificates";

interface CertificateResultCardProps {
  number: string;
  certificate: APICertificateVerification;
}

function formatIssuedAt(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function CertificateResultCard({ number, certificate }: CertificateResultCardProps) {
  const isValid = certificate.valid;
  const isRevoked = certificate.status === "revoked";

  const rows = [
    { label: "Titulaire", value: certificate.studentName },
    { label: "Formation", value: certificate.trainingTitle },
    { label: "Formateur", value: certificate.instructorName },
    { label: "Délivré le", value: formatIssuedAt(certificate.issuedAt) },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div
        className={`flex flex-col items-center gap-3 px-6 py-10 text-center ${isValid ? "bg-emerald-500/10" : "bg-destructive/10"
          }`}
      >
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${isValid ? "bg-emerald-500/15 text-emerald-600" : "bg-destructive/15 text-destructive"
            }`}
        >
          {isValid ? <ShieldCheck size={28} /> : <ShieldX size={28} />}
        </div>
        <h2 className="font-display text-xl font-bold md:text-2xl">
          {isValid ? "Certificat valide" : isRevoked ? "Certificat révoqué" : "Certificat non valide"}
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          {isValid
            ? "Ce certificat est authentique et toujours actif."
            : "Ce certificat a bien été émis, mais il n'est plus valable."}
        </p>
        <code className="rounded-full border border-border bg-background px-3 py-1 text-xs">{number}</code>
      </div>

      <dl className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm text-muted-foreground">{r.label}</dt>
            <dd className="font-medium sm:text-right">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}