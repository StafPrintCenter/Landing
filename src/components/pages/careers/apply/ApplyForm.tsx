import { useState } from "react";
import { Loader2, User, Mail, Phone, FileText, Upload, X, Check, ShieldCheck, GraduationCap } from "lucide-react";
import { applyToJobOffer, JobsApiError } from "@/stores/useJobsStore";
import { ApplySuccessScreen } from "./SuccessScreen";
import { ApplyErrorBanner } from "./ErrorBanner";
import { FieldErrorsBanner } from "./FieldErrorsBanner";
import type { APIJobOffer } from "@/data/jobs";
import { SITE } from "@/data/site";

// Options pour le niveau d'études
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

export function ApplyForm({ offer }: ApplyFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
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
        educationLevel: educationLevel || undefined,
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Formulaire de candidature
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Veuillez remplir vos informations personnelles et déposer votre CV pour postuler.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Champs Prénom & Nom */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <User size={14} className="text-primary" /> Prénom <span className="text-destructive">*</span>
            </span>
            <input
              type="text"
              required
              placeholder="Ex: Jean"
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
              placeholder="Ex: Dupont"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        {/* Champs Email & Téléphone */}
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

        {/* Niveau d'études */}
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <GraduationCap size={14} className="text-primary" /> Niveau d'études{" "}
            <span className="text-xs font-normal text-muted-foreground">(Optionnel)</span>
          </span>
          <select
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="">Sélectionnez votre niveau d'études</option>
            {EDUCATION_LEVEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Votre motivation (Ex-Lettre de motivation) */}
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

        {/* Upload du CV */}
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
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background p-6 text-center transition-all hover:border-primary/50 hover:bg-muted/30">
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
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>
          )}
        </div>

        {/* Case de consentement */}
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

        {/* Messages d'erreur */}
        {fieldErrors && Object.keys(fieldErrors).length > 0 ? (
          <FieldErrorsBanner fieldErrors={fieldErrors} />
        ) : errorMessage ? (
          <ApplyErrorBanner message={errorMessage} status={errorStatus} slug={offer.slug} />
        ) : null}

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting || !cv || !consent}
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