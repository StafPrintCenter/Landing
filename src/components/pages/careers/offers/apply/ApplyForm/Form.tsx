import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { DraftBanner } from "@/components/shared/DraftBanner";
import { FileUploadField } from "@/components/pages/careers/FileUploadField";
import { useFormDraft } from "@/hooks/use-form-draft";
import { SITE } from "@/data/site";
import type { APIJobOffer } from "@/data/jobs";
import { applyToJobOffer, JobsApiError } from "@/stores/useJobsStore";
import { ApplyErrorBanner } from "../ErrorBanner";
import { FieldErrorsBanner } from "../FieldErrorsBanner";
import { ApplySuccessScreen } from "../SuccessScreen";
import { ApplicantFields, MotivationField } from ".";

interface ApplyFormProps {
  offer: APIJobOffer;
}

const APPLY_DRAFT_VERSION = 1;
const APPLY_DRAFT_TTL_MS = 1000 * 60 * 60 * 24;

export function ApplyForm({ offer }: ApplyFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const draftValues = { firstName, lastName, email, phone, educationLevel, coverLetter };
  const { draftAvailable, restoreDraft, discardDraft, getSavedAgeLabel } = useFormDraft({
    formId: `job-apply-${offer.slug}`,
    version: APPLY_DRAFT_VERSION,
    ttlMs: APPLY_DRAFT_TTL_MS,
    values: draftValues,
    enabled: !submitted,
  });

  const handleRestoreDraft = () => {
    const draft = restoreDraft();
    if (draft) {
      if (draft.firstName !== undefined) setFirstName(draft.firstName as string);
      if (draft.lastName !== undefined) setLastName(draft.lastName as string);
      if (draft.email !== undefined) setEmail(draft.email as string);
      if (draft.phone !== undefined) setPhone(draft.phone as string);
      if (draft.educationLevel !== undefined) setEducationLevel(draft.educationLevel as string);
      if (draft.coverLetter !== undefined) setCoverLetter(draft.coverLetter as string);
    }
    setBannerDismissed(true);
  };

  const handleDiscardDraft = () => {
    discardDraft();
    setBannerDismissed(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!cv || !consent || !educationLevel) return;

    setErrorMessage(null);
    setFieldErrors(undefined);
    setIsSubmitting(true);
    try {
      await applyToJobOffer(offer.slug, {
        firstName,
        lastName,
        email,
        phone,
        educationLevel,
        coverLetter: coverLetter.trim() || undefined,
        coverLetterFile: coverLetterFile ?? undefined,
        cv,
        consentAccepted: consent,
      });
      setSubmitted(true);
      discardDraft();
    } catch (error) {
      if (error instanceof JobsApiError) {
        setErrorMessage(error.message);
        setErrorStatus(error.status);
        setFieldErrors(error.fieldErrors);
      } else {
        setErrorMessage("Une erreur inattendue est survenue. Merci de réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) return <ApplySuccessScreen offerTitle={offer.title} />;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Formulaire de candidature</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Veuillez remplir vos informations personnelles et déposer votre CV pour postuler.
        </p>
      </div>
      {draftAvailable && !bannerDismissed && (
        <DraftBanner
          savedAgeLabel={getSavedAgeLabel()}
          onRestore={handleRestoreDraft}
          onDiscard={handleDiscardDraft}
          hadStrippedFields
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <ApplicantFields
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          educationLevel={educationLevel}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPhone={setPhone}
          setEducationLevel={setEducationLevel}
        />
        <MotivationField value={coverLetter} onChange={setCoverLetter} />
        <FileUploadField
          label="Fichier de lettre de motivation"
          description="(Optionnel - PDF, DOC, DOCX - Max 5 Mo)"
          prompt="Cliquez pour parcourir ou glissez votre lettre de motivation ici"
          file={coverLetterFile}
          onChange={setCoverLetterFile}
          removeTitle="Supprimer la lettre"
        />
        <FileUploadField
          label="Votre CV"
          description="(PDF, DOC, DOCX - Max 5 Mo)"
          prompt="Cliquez pour parcourir ou glissez votre CV ici"
          file={cv}
          onChange={setCv}
          required
        />
        <label className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-muted/20 p-3.5 text-xs text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-0.5 rounded border-border text-primary focus:ring-primary cursor-pointer"
            required
          />
          <span className="leading-relaxed">
            J'autorise {SITE.name} à traiter mes données personnelles dans le cadre strict du recrutement pour cette offre de {offer.title}.
          </span>
        </label>
        {fieldErrors && Object.keys(fieldErrors).length > 0 ? (
          <FieldErrorsBanner fieldErrors={fieldErrors} />
        ) : errorMessage ? (
          <ApplyErrorBanner message={errorMessage} status={errorStatus} slug={offer.slug} />
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting || !cv || !consent || !educationLevel}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Envoi en cours…
            </>
          ) : (
            <>
              <ShieldCheck size={18} /> Soumettre ma candidature
            </>
          )}
        </button>
      </form>
    </div>
  );
}
