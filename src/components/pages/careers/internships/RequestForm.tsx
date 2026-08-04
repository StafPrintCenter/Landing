import { useState } from "react";
import { Loader2, User, Mail, Phone, School, BookOpen, Calendar, Timer, MessageSquare, Upload, X, Check, ShieldCheck } from "lucide-react";
import { createInternshipRequest, InternshipApiError } from "@/stores/useInternshipsStore";
import { SuccessScreen } from "./SuccessScreen";
import { useFormDraft } from "@/hooks/use-form-draft";
import { DraftBanner } from "@/components/shared/DraftBanner";
import { SITE } from "@/data/site";

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

  // État Drag & Drop pour le CV
  const [isCvDragging, setIsCvDragging] = useState(false);

  // Soumission et gestion des erreurs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Le CV (fichier) n'est jamais inclus dans le brouillon - non sérialisable, devra être resélectionné manuellement à la restauration.
  const draftValues = { firstName, lastName, email, phone, institution, fieldOfStudy, desiredStartDate, duration, message };
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

  // Handlers pour Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCvDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCvDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsCvDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setCv(droppedFile);
    }
  };

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
      discardDraft(); // formulaire abouti - plus besoin du brouillon
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Formulaire de demande de stage
        </h2>
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
              placeholder="jean.dupont@example.com"
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

        {/* Établissement & Filière */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <School size={14} className="text-primary" /> Établissement{" "}
              <span className="font-normal text-muted-foreground">(Optionnel)</span>
            </span>
            <input
              type="text"
              placeholder="Ex: Université d'Abomey-Calavi"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <BookOpen size={14} className="text-primary" /> Filière / Domaine{" "}
              <span className="font-normal text-muted-foreground">(Optionnel)</span>
            </span>
            <input
              type="text"
              placeholder="Ex: Informatique, Marketing..."
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        {/* Date de début & Durée */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Calendar size={14} className="text-primary" /> Date de début souhaitée{" "}
              <span className="font-normal text-muted-foreground">(Optionnel)</span>
            </span>
            <input
              type="date"
              value={desiredStartDate}
              onChange={(e) => setDesiredStartDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Timer size={14} className="text-primary" /> Durée souhaitée{" "}
              <span className="font-normal text-muted-foreground">(Optionnel)</span>
            </span>
            <input
              type="text"
              placeholder="Ex: 3 mois"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        {/* Message de motivation */}
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <MessageSquare size={14} className="text-primary" /> Message / Motivations{" "}
            <span className="font-normal text-muted-foreground">(Optionnel)</span>
          </span>
          <textarea
            rows={4}
            maxLength={2000}
            placeholder="Présentez votre projet académique, vos attentes pour ce stage..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        {/* BLOC : Upload du CV (Drag & Drop) */}
        <div className="space-y-1.5">
          <span className="block text-xs font-semibold text-foreground">
            Votre CV <span className="font-normal text-muted-foreground">(Optionnel - PDF, DOC, DOCX - Max 5 Mo)</span>
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
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
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
            J'autorise {SITE.name} à traiter mes données personnelles dans le cadre du traitement de ma demande de stage.
          </span>
        </label>

        {/* Gestion des erreurs */}
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

        {/* Bouton d'envoi */}
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
      </form>
    </div>
  );
}