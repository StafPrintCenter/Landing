import { AlertCircle } from "lucide-react";

const FIELD_LABELS: Record<string, string> = {
  first_name: "Prénom",
  last_name: "Nom",
  email: "Email",
  phone: "Téléphone",
  cover_letter: "Lettre de motivation",
  cv: "CV",
  consent_accepted: "Consentement",
};

interface FieldErrorsBannerProps {
  fieldErrors: Record<string, string[]>;
}

export function FieldErrorsBanner({ fieldErrors }: FieldErrorsBannerProps) {
  const entries = Object.entries(fieldErrors);
  if (entries.length === 0) return null;

  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-destructive/10 px-4 py-3 text-xs text-destructive">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <div className="space-y-1">
        <p className="font-medium">Merci de corriger les points suivants :</p>
        <ul className="list-disc space-y-0.5 pl-4">
          {entries.map(([field, messages]) => (
            <li key={field}>
              <span className="font-medium">{FIELD_LABELS[field] ?? field}</span> : {messages.join(" ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}