import { useState } from "react";
import { Loader2, User, Mail, Phone, FileText, Upload, X, Check, ShieldCheck, GraduationCap } from "lucide-react";
import { applyToJobOffer, JobsApiError } from "@/stores/useJobsStore";
import { ApplySuccessScreen } from "./SuccessScreen";
import { ApplyErrorBanner } from "./ErrorBanner";
import { FieldErrorsBanner } from "./FieldErrorsBanner";
import { useFormDraft } from "@/hooks/use-form-draft";
import { DraftBanner } from "@/components/shared/DraftBanner";
import type { APIJobOffer } from "@/data/jobs";
import { SITE } from "@/data/site";

const EDUCATION_LEVEL_OPTIONS = [
  { value: "sans_diplome", label: "Sans diplôme" },
  { value: "bepc", label: "BEPC" },
  { value: "bac", label: "BAC" },
  { value: "bac+2", label: "BAC +2 (BTS, DUT...)" },
  { value: "bac+3", label: "BAC +3 (Licence...)" },
  { value: "master", label: "BAC +5 (Master, DEA...)" },
  { value: "doctorat", label: "Doctorat" },
];

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

  // Fichiers - jamais inclus dans le brouillon (non sérialisables, retirés
  // automatiquement par le gestionnaire même si on les y mettait).
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  // États Drag & Drop
  const [isCvDragging, setIsCvDragging] = useState(false);
  const [isCoverLetterDragging, setIsCoverLetterDragging] = useState(false);

  // Soumission et erreurs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Un brouillon distinct par offre - postuler à deux offres différentes ne
  // doit jamais mélanger les champs. Seuls les champs texte sont sauvegardés :
  // le CV et la lettre de motivation en fichier devront être resélectionnés.
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

  // Handlers pour Drag & Drop
  const handleDragOver = (e: React.DragEvent, setDragging: (state: boolean) => void) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent, setDragging: (state: boolean) => void) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (
    e: React.DragEvent,
    setFile: (file: File | null) => void,
    setDragging: (state: boolean) => void
  ) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      discardDraft(); // formulaire abouti - plus besoin du brouillon
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Formulaire de candidature
        </h2>
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
        {/* Prénom & Nom */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <User size={14} className="text-primary" /> Prénom <span className="text-destructive">*</span>
            </span>
            <input
              type="text"
              required
              placeholder="Ex: Tony"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <User size={14} className="text-primary" /> Nom <span className="text-destructive">*</span>
            </span>
            <input
              type="text"
              required
              placeholder="Ex: Dossou"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        {/* Email & Téléphone */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Mail size={14} className="text-primary" /> Email <span className="text-destructive">*</span>
            </span>
            <input
              type="email"
              required
              placeholder="votre.nom@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Phone size={14} className="text-primary" /> Téléphone <span className="text-destructive">*</span>
            </span>
            <input
              type="tel"
              required
              placeholder="+229 01 02 03 04"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        {/* Niveau d'études (OBLIGATOIRE) */}
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <GraduationCap size={14} className="text-primary" /> Niveau d'études <span className="text-destructive">*</span>
          </span>
          <select
            required
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="" disabled>
              Sélectionnez votre niveau d'études
            </option>
            {EDUCATION_LEVEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Motivation en texte (Optionnel) */}
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <FileText size={14} className="text-primary" /> Votre motivation{" "}
            <span className="text-xs font-normal text-muted-foreground">(Optionnel)</span>
          </span>
          <textarea
            rows={4}
            maxLength={3000}
            placeholder="Présentez brièvement vos motivations pour ce poste..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        {/* BLOC 1 : Fichier de Lettre de Motivation (Optionnel) */}
        <div className="space-y-1.5">
          <span className="block text-xs font-semibold text-foreground">
            Fichier de lettre de motivation{" "}
            <span className="font-normal text-muted-foreground">(Optionnel - PDF, DOC, DOCX - Max 5 Mo)</span>
          </span>

          {coverLetterFile ? (
            <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
              <div className="flex items-center gap-2.5 truncate">
                <Check size={16} className="text-primary shrink-0" />
                <span className="truncate font-medium text-foreground">{coverLetterFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(coverLetterFile.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCoverLetterFile(null)}
                className="ml-2 shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                title="Supprimer la lettre"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label
              onDragOver={(e) => handleDragOver(e, setIsCoverLetterDragging)}
              onDragLeave={(e) => handleDragLeave(e, setIsCoverLetterDragging)}
              onDrop={(e) => handleDrop(e, setCoverLetterFile, setIsCoverLetterDragging)}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${isCoverLetterDragging
                ? "border-primary bg-primary/10"
                : "border-border bg-background hover:border-primary/50 hover:bg-muted/30"
                }`}
            >
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Upload size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Cliquez pour parcourir ou glissez votre lettre de motivation ici
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Formats acceptés : PDF, DOC, DOCX</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCoverLetterFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* BLOC 2 : Upload du CV (OBLIGATOIRE) */}
        <div className="space-y-1.5">
          <span className="block text-xs font-semibold text-foreground">
            Votre CV <span className="text-destructive">*</span>{" "}
            <span className="font-normal text-muted-foreground">(PDF, DOC, DOCX - Max 5 Mo)</span>
          </span>

          {cv ? (
            <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
              <div className="flex items-center gap-2.5 truncate">
                <Check size={16} className="text-primary shrink-0" />
                <span className="truncate font-medium text-foreground">{cv.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(cv.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCv(null)}
                className="ml-2 shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                title="Supprimer le fichier"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label
              onDragOver={(e) => handleDragOver(e, setIsCvDragging)}
              onDragLeave={(e) => handleDragLeave(e, setIsCvDragging)}
              onDrop={(e) => handleDrop(e, setCv, setIsCvDragging)}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${isCvDragging
                ? "border-primary bg-primary/10"
                : "border-border bg-background hover:border-primary/50 hover:bg-muted/30"
                }`}
            >
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Upload size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Cliquez pour parcourir ou glissez votre CV ici
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Formats acceptés : PDF, DOC, DOCX</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                className="hidden"
                required
              />
            </label>
          )}
        </div>

        {/* Consentement */}
        <label className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-muted/20 p-3.5 text-xs text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-border text-primary focus:ring-primary cursor-pointer"
            required
          />
          <span className="leading-relaxed">
            J'autorise {SITE.name} à traiter mes données personnelles dans le cadre strict du recrutement pour cette offre de {offer.title}.
          </span>
        </label>

        {/* Bannières d'erreur */}
        {fieldErrors && Object.keys(fieldErrors).length > 0 ? (
          <FieldErrorsBanner fieldErrors={fieldErrors} />
        ) : errorMessage ? (
          <ApplyErrorBanner message={errorMessage} status={errorStatus} slug={offer.slug} />
        ) : null}

        {/* Bouton d'envoi */}
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