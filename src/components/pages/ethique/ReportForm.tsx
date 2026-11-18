import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, Copy } from "lucide-react";
import { toast } from "sonner";
import { ETHIQUE_CATEGORIES } from "@/data/ethique";
import { DraftBanner } from "@/components/shared/DraftBanner";
import { useFormDraft } from "@/hooks/use-form-draft";
import { ApiError } from "@/lib/api/error";
import { createEthicalReport, type EthicalReportReceipt } from "@/stores/useEthicalReportsStore";

const reportSchema = z.object({
  category: z.string().min(1, "Choisissez une catégorie"),
  concerned: z.string().trim().max(200),
  when: z.string().trim().max(100),
  description: z.string().trim().min(30, "Décrivez les faits (30 caractères minimum)").max(3000),
  evidence: z.string().trim().max(500),
  anonymous: z.boolean(),
  contact: z.string().trim().max(150),
  goodFaith: z.literal(true, { message: "Vous devez attester de votre bonne foi" }),
});

interface ReportFormData extends Record<string, unknown> {
  category: string;
  concerned: string;
  when: string;
  description: string;
  evidence: string;
  anonymous: boolean;
  contact: string;
  goodFaith: boolean;
}

const INITIAL_FORM: ReportFormData = {
  category: "",
  concerned: "",
  when: "",
  description: "",
  evidence: "",
  anonymous: true,
  contact: "",
  goodFaith: false,
};

const ETHICAL_REPORT_DRAFT_VERSION = 1;
const ETHICAL_REPORT_DRAFT_TTL_MS = 1000 * 60 * 60 * 24;

const FIELD_CLASS_NAME =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none";

export function EthiqueReportForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<EthicalReportReceipt | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const { draftAvailable, restoreDraft, discardDraft, getSavedAgeLabel } =
    useFormDraft<ReportFormData>({
      formId: "ethical-report",
      version: ETHICAL_REPORT_DRAFT_VERSION,
      ttlMs: ETHICAL_REPORT_DRAFT_TTL_MS,
      values: form,
      excludeFields: ["goodFaith"],
      enabled: !receipt,
      isEmpty: (values) =>
        !values.category.trim() &&
        !values.concerned.trim() &&
        !values.when.trim() &&
        !values.description.trim() &&
        !values.evidence.trim() &&
        !values.contact.trim() &&
        values.anonymous,
    });

  function setField<Key extends keyof ReportFormData>(key: Key, value: ReportFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleRestoreDraft() {
    const draft = restoreDraft();
    if (draft) setForm((current) => ({ ...current, ...draft, goodFaith: false }));
    setBannerDismissed(true);
  }

  function handleDiscardDraft() {
    discardDraft();
    setBannerDismissed(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    const result = reportSchema.safeParse(form);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        nextErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const submittedReport = await createEthicalReport(result.data);
      setReceipt(submittedReport);
      discardDraft();
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.message);
        if (error.fieldErrors) {
          const fieldErrors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(error.fieldErrors)) {
            if (messages[0]) fieldErrors[field] = messages[0];
          }
          setErrors(fieldErrors);
        }
      } else {
        setSubmitError("Une erreur est survenue lors de l'envoi. Merci de réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
    window.scrollTo({
      top: document.getElementById("formulaire")?.offsetTop ?? 0,
      behavior: "smooth",
    });
  }

  return (
    <section id="formulaire" className="container-x max-w-3xl scroll-mt-24 py-16">
      <h2 className="font-display text-3xl font-bold">Formulaire de signalement</h2>
      {receipt ? (
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-1 shadow-lg">
          <div className="rounded-[1.35rem] border border-border/70 bg-card/90 p-6 backdrop-blur md:p-8">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <h3 className="mt-3 font-display text-xl font-semibold">
              Votre signalement a été enregistré
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Conservez votre code de suivi. Votre signalement a été transmis de manière
              confidentielle au référent éthique.
            </p>
            <p className="mt-4 font-mono text-2xl font-bold text-primary">{receipt.trackingCode}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(receipt.trackingCode);
                    toast.success("Code de suivi copié.");
                  } catch {
                    toast.error("Impossible de copier le code de suivi.");
                  }
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:bg-secondary hover:text-card"
              >
                <Copy className="h-4 w-4" /> Copier le code
              </button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Statut : {receipt.status === "pending" ? "en attente" : receipt.status}.
            </p>
            <button
              type="button"
              onClick={() => {
                setReceipt(null);
                setForm(INITIAL_FORM);
                setErrors({});
                setSubmitError(null);
              }}
              className="mt-4 cursor-pointer text-sm font-semibold text-primary underline"
            >
              Déposer un autre signalement
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="mt-8 space-y-5 rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 shadow-lg md:p-8"
          noValidate
        >
          {draftAvailable && !bannerDismissed && (
            <DraftBanner
              savedAgeLabel={getSavedAgeLabel()}
              onRestore={handleRestoreDraft}
              onDiscard={handleDiscardDraft}
            />
          )}
          <p className="text-xs text-muted-foreground">
            Les réponses non envoyées sont sauvegardées dans ce navigateur pendant 24 heures. Sur un
            appareil partagé, pensez à supprimer votre brouillon après utilisation.
          </p>
          <div>
            <label className="text-sm font-semibold" htmlFor="cat">
              Nature des faits *
            </label>
            <select
              id="cat"
              className={`${FIELD_CLASS_NAME} mt-2 cursor-pointer border-border/80 bg-card/80 transition focus:ring-2 focus:ring-primary/20`}
              value={form.category}
              onChange={(event) => setField("category", event.target.value)}
            >
              <option value="">Choisir…</option>
              {ETHIQUE_CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold" htmlFor="who">
                Personnes ou services concernés
              </label>
              <input
                id="who"
                maxLength={200}
                className={`${FIELD_CLASS_NAME} mt-2 border-border/80 bg-card/80 transition focus:ring-2 focus:ring-primary/20`}
                value={form.concerned}
                onChange={(event) => setField("concerned", event.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="when">
                Date ou période des faits
              </label>
              <input
                id="when"
                maxLength={100}
                placeholder="ex : mars 2026, répété"
                className={`${FIELD_CLASS_NAME} mt-2 border-border/80 bg-card/80 transition focus:ring-2 focus:ring-primary/20`}
                value={form.when}
                onChange={(event) => setField("when", event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="desc">
              Description factuelle *{" "}
              <span className="font-normal text-muted-foreground">(qui, quoi, où, comment)</span>
            </label>
            <textarea
              id="desc"
              rows={6}
              maxLength={3000}
              className={`${FIELD_CLASS_NAME} mt-2 border-border/80 bg-card/80 transition focus:ring-2 focus:ring-primary/20`}
              value={form.description}
              onChange={(event) => setField("description", event.target.value)}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold" htmlFor="ev">
              Éléments probants disponibles
            </label>
            <input
              id="ev"
              maxLength={500}
              placeholder="documents, messages, témoins…"
              className={`${FIELD_CLASS_NAME} mt-2 border-border/80 bg-card/80 transition focus:ring-2 focus:ring-primary/20`}
              value={form.evidence}
              onChange={(event) => setField("evidence", event.target.value)}
            />
          </div>

          <fieldset className="rounded-2xl border border-border/80 bg-card/60 p-5">
            <legend className="px-2 text-sm font-semibold">Mode de transmission</legend>
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="radio"
                checked={form.anonymous}
                onChange={() => {
                  setField("anonymous", true);
                  setField("contact", "");
                }}
              />
              100 % anonyme
            </label>
            <label className="mt-2 flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="radio"
                checked={!form.anonymous}
                onChange={() => setField("anonymous", false)}
              />
              Confidentiel avec coordonnées
            </label>
            {!form.anonymous && (
              <input
                maxLength={150}
                placeholder="Nom, e-mail ou téléphone"
                className={`${FIELD_CLASS_NAME} mt-4 border-border/80 bg-card/80 transition focus:ring-2 focus:ring-primary/20`}
                value={form.contact}
                onChange={(event) => setField("contact", event.target.value)}
              />
            )}
          </fieldset>

          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.goodFaith}
              onChange={(event) => setField("goodFaith", event.target.checked)}
            />
            J'atteste agir de bonne foi et que les informations transmises sont, à ma connaissance,
            exactes.
          </label>
          {errors.goodFaith && <p className="text-xs text-destructive">{errors.goodFaith}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Envoi en cours…" : "Envoyer mon signalement"}
          </button>
          {submitError && (
            <p role="alert" className="text-sm text-destructive">
              {submitError}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
