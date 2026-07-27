import { useState } from "react";
import { Loader2, User, Mail, Phone, FileText, Upload, X } from "lucide-react";
import { applyToJobOffer, JobsApiError } from "@/stores/useJobsStore";
import { ApplySuccessScreen } from "./SuccessScreen";
import { ApplyErrorBanner } from "./ErrorBanner";
import { FieldErrorsBanner } from "./FieldErrorsBanner";
import type { APIJobOffer } from "@/data/jobs";

interface ApplyFormProps {
  offer: APIJobOffer;
}

export function ApplyForm({ offer }: ApplyFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCv(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv || !consent) return;

    setErrorMessage(null);
    setFieldErrors(undefined);
    setIsSubmitting(true);
    try {
      await applyToJobOffer(offer.slug, {
        firstName,
        lastName,
        email,
        phone,
        coverLetter: coverLetter.trim() || undefined,
        cv,
        consentAccepted: consent,
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof JobsApiError) {
        setErrorMessage(err.message);
        setErrorStatus(err.status);
        setFieldErrors(err.fieldErrors);
      } else {
        setErrorMessage("Une erreur inattendue est survenue. Merci de réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <ApplySuccessScreen offerTitle={offer.title} />;
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
      </div>

      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><FileText size={14} /> Lettre de motivation (optionnel)</span>
        <textarea rows={5} maxLength={3000} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="input w-full" />
      </label>

      <div>
        <span className="mb-1.5 block text-sm font-medium">CV (PDF, DOC, DOCX de 5 Mo max)</span>
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
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" required />
          </label>
        )}
      </div>

      <label className="flex items-start gap-2 text-xs text-foreground/70 cursor-pointer">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 cursor-pointer" required />
        <span>J'accepte que mes données soient utilisées dans le cadre du traitement de ma candidature.</span>
      </label>

      {fieldErrors && Object.keys(fieldErrors).length > 0 ? (
        <FieldErrorsBanner fieldErrors={fieldErrors} />
      ) : errorMessage ? (
        <ApplyErrorBanner message={errorMessage} status={errorStatus} slug={offer.slug} />
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting || !cv || !consent}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Envoi…
          </>
        ) : (
          "Envoyer ma candidature"
        )}
      </button>
    </form>
  );
}