import { AlertCircle } from "lucide-react";

const FIELD_LABELS: Record<string, string> = {
  first_name: "Prénom",
  last_name: "Nom",
  email: "Email",
  phone: "Téléphone",
  education_level: "Niveau d'études",
  cover_letter: "Votre motivation",
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
    <div className="flex items-start gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <div className="space-y-1">
        <p className="font-semibold">Merci de corriger les erreurs suivantes :</p>
        <ul className="list-disc space-y-0.5 pl-4">
          {entries.map(([field, messages]) => (
            <li key={field}>
              <span className="font-semibold">{FIELD_LABELS[field] ?? field}</span> : {messages.join(" ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}