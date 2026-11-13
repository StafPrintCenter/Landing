import { useMemo, useState } from "react";
import { SITE } from "@/data/site";
import { DraftBanner } from "@/components/shared/DraftBanner";
import { useFormDraft } from "@/hooks/use-form-draft";
import { FileUploadField } from "@/components/pages/careers/FileUploadField";
import { createInternshipRequest, InternshipApiError } from "@/stores/useInternshipsStore";
import { SuccessScreen } from "../SuccessScreen";
import { InternshipDetailsFields } from ".";
import { PersonalFields } from "./PersonalFields";
import { RequestFormFeedback } from "./FormFeedback";

const INTERNSHIP_DRAFT_VERSION = 1;
const INTERNSHIP_DRAFT_TTL_MS = 1000 * 60 * 60 * 24 * 2;

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
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const { minStartDate, maxStartDate } = useMemo(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14);
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    return {
      minStartDate: minDate.toISOString().split("T")[0],
      maxStartDate: maxDate.toISOString().split("T")[0],
    };
  }, []);

  const draftValues = {
    firstName,
    lastName,
    email,
    phone,
    institution,
    fieldOfStudy,
    desiredStartDate,
    duration,
    message,
  };
  const { draftAvailable, restoreDraft, discardDraft, getSavedAgeLabel } = useFormDraft({
    formId: "internship-request",
    version: INTERNSHIP_DRAFT_VERSION,
    ttlMs: INTERNSHIP_DRAFT_TTL_MS,
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
      if (draft.institution !== undefined) setInstitution(draft.institution as string);
      if (draft.fieldOfStudy !== undefined) setFieldOfStudy(draft.fieldOfStudy as string);
      if (draft.desiredStartDate !== undefined) setDesiredStartDate(draft.desiredStartDate as string);
      if (draft.duration !== undefined) setDuration(draft.duration as string);
      if (draft.message !== undefined) setMessage(draft.message as string);
    }
    setBannerDismissed(true);
  };

  const handleDiscardDraft = () => {
    discardDraft();
    setBannerDismissed(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!consent) return;
    if (desiredStartDate && desiredStartDate < minStartDate) {
      setErrorMessage("La date de début souhaitée doit être au moins deux semaines dans le futur.");
      return;
    }
    if (desiredStartDate && desiredStartDate > maxStartDate) {
      setErrorMessage("La date de début souhaitée ne peut pas dépasser 6 mois dans le futur.");
      return;
    }

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
      discardDraft();
    } catch (error) {
      if (error instanceof InternshipApiError) {
        setErrorMessage(error.message);
        setFieldErrors(error.fieldErrors);
      } else {
        setErrorMessage("Une erreur inattendue est survenue. Merci de réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) return <SuccessScreen />;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Formulaire de demande de stage</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Renseignez vos informations et téléversez votre CV pour nous transmettre votre candidature.
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
        <PersonalFields
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          institution={institution}
          fieldOfStudy={fieldOfStudy}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPhone={setPhone}
          setInstitution={setInstitution}
          setFieldOfStudy={setFieldOfStudy}
        />
        <InternshipDetailsFields
          desiredStartDate={desiredStartDate}
          duration={duration}
          message={message}
          minStartDate={minStartDate}
          maxStartDate={maxStartDate}
          setDesiredStartDate={setDesiredStartDate}
          setDuration={setDuration}
          setMessage={setMessage}
        />
        <FileUploadField
          label="Votre CV"
          description="(Optionnel - PDF, DOC, DOCX - Max 5 Mo)"
          prompt="Cliquez pour parcourir ou glissez votre CV ici"
          file={cv}
          onChange={setCv}
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
            J'autorise {SITE.name} à traiter mes données personnelles dans le cadre du traitement de ma demande de stage.
          </span>
        </label>
        <RequestFormFeedback
          fieldErrors={fieldErrors}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          consent={consent}
        />
      </form>
    </div>
  );
}
