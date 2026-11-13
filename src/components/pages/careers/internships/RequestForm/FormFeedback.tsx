import { Loader2, ShieldCheck } from "lucide-react";

const FIELD_LABELS: Record<string, string> = {
  first_name: "Prénom",
  last_name: "Nom",
  email: "Email",
  phone: "Téléphone",
  institution: "Établissement",
  field_of_study: "Filière",
  desired_start_date: "Date souhaitée",
  duration: "Durée",
  message: "Message",
  cv: "CV",
  consent_accepted: "Consentement",
};

interface RequestFormFeedbackProps {
  fieldErrors?: Record<string, string[]>;
  errorMessage: string | null;
  isSubmitting: boolean;
  consent: boolean;
}

export function RequestFormFeedback({
  fieldErrors,
  errorMessage,
  isSubmitting,
  consent,
}: RequestFormFeedbackProps) {
  return (
    <>
      {fieldErrors && Object.keys(fieldErrors).length > 0 ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive">
          <p className="font-semibold">Merci de corriger les champs suivants :</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            {Object.entries(fieldErrors).map(([field, messages]) => (
              <li key={field}>
                <strong className="font-medium">{FIELD_LABELS[field] ?? field}</strong> : {messages.join(" ")}
              </li>
            ))}
          </ul>
        </div>
      ) : errorMessage ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive">
          {errorMessage}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting || !consent}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Envoi en cours…
          </>
        ) : (
          <>
            <ShieldCheck size={18} /> Soumettre ma demande de stage
          </>
        )}
      </button>
    </>
  );
}
