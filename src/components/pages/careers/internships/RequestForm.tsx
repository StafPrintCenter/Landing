import { useState } from "react";
import { Loader2, User, Mail, Phone, School, BookOpen, Calendar, Timer, MessageSquare, Upload, X } from "lucide-react";
import { createInternshipRequest, InternshipApiError } from "@/stores/useInternshipsStore";
import { SuccessScreen } from "./SuccessScreen";

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

export function InternshipRequestForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [desiredStartDate, setDesiredStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setErrorMessage(null);
    setFieldErrors(undefined);
    setIsSubmitting(true);
    try {
      await createInternshipRequest({
        firstName,
        lastName,
        email,
        phone,
        institution: institution.trim() || undefined,
        fieldOfStudy: fieldOfStudy.trim() || undefined,
        desiredStartDate: desiredStartDate || undefined,
        duration: duration.trim() || undefined,
        message: message.trim() || undefined,
        cv: cv ?? undefined,
        consentAccepted: consent,
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof InternshipApiError) {
        setErrorMessage(err.message);
        setFieldErrors(err.fieldErrors);
      } else {
        setErrorMessage("Une erreur inattendue est survenue. Merci de réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><User size={14} /> Prénom</span>
          <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><User size={14} /> Nom</span>
          <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Mail size={14} /> Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Phone size={14} /> Téléphone</span>
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><School size={14} /> Établissement (optionnel)</span>
          <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><BookOpen size={14} /> Filière (optionnel)</span>
          <input type="text" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Calendar size={14} /> Date de début souhaitée (optionnel)</span>
          <input type="date" value={desiredStartDate} onChange={(e) => setDesiredStartDate(e.target.value)} className="input w-full" />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Timer size={14} /> Durée souhaitée (optionnel)</span>
          <input type="text" placeholder="Ex: 3 mois" value={duration} onChange={(e) => setDuration(e.target.value)} className="input w-full" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><MessageSquare size={14} /> Message (optionnel)</span>
        <textarea rows={4} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} className="input w-full" placeholder="Motivation, projet de stage, contexte académique…" />
      </label>

      <div>
        <span className="mb-1.5 block text-sm font-medium">CV (optionnel — PDF, DOC, DOCX, 5 Mo max)</span>
        {cv ? (
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm">
            <span className="truncate">{cv.name}</span>
            <button type="button" onClick={() => setCv(null)} className="ml-2 shrink-0 text-muted-foreground hover:text-destructive cursor-pointer">
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-4 text-sm text-muted-foreground hover:bg-muted/40">
            <Upload size={16} /> Choisir un fichier
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCv(e.target.files?.[0] ?? null)} className="hidden" />
          </label>
        )}
      </div>

      <label className="flex items-start gap-2 text-xs text-foreground/70 cursor-pointer">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 cursor-pointer" required />
        <span>J'accepte que mes données soient utilisées dans le cadre du traitement de ma demande de stage.</span>
      </label>

      {fieldErrors && Object.keys(fieldErrors).length > 0 && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-xs text-destructive">
          <p className="font-medium">Merci de corriger les points suivants :</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4">
            {Object.entries(fieldErrors).map(([field, messages]) => (
              <li key={field}><span className="font-medium">{FIELD_LABELS[field] ?? field}</span> : {messages.join(" ")}</li>
            ))}
          </ul>
        </div>
      )}
      {!fieldErrors && errorMessage && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-xs text-destructive">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !consent}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? (<><Loader2 size={16} className="animate-spin" /> Envoi…</>) : "Envoyer ma demande"}
      </button>
    </form>
  );
}