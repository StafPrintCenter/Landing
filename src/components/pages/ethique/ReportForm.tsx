import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, Copy, Mail, MessageCircle } from "lucide-react";
import { ETHIQUE_CATEGORIES, generateTrackingCode } from "@/data/ethique";
import { SITE } from "@/data/site";

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

interface ReportFormData {
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

const FIELD_CLASS_NAME =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none";

export function EthiqueReportForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [code, setCode] = useState<string | null>(null);

  function setField<Key extends keyof ReportFormData>(key: Key, value: ReportFormData[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    setCode(generateTrackingCode());
    window.scrollTo({
      top: document.getElementById("formulaire")?.offsetTop ?? 0,
      behavior: "smooth",
    });
  }

  const report = code
    ? [
        `SIGNALEMENT ÉTHIQUE - ${code}`,
        `Catégorie : ${form.category}`,
        form.concerned && `Personnes/services : ${form.concerned}`,
        form.when && `Période : ${form.when}`,
        `Faits : ${form.description}`,
        form.evidence && `Éléments probants : ${form.evidence}`,
        form.anonymous || !form.contact ? "Déclarant : anonyme" : `Contact : ${form.contact}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return (
    <section id="formulaire" className="container-x max-w-3xl scroll-mt-24 py-16">
      <h2 className="font-display text-3xl font-bold">Formulaire de signalement</h2>
      {code ? (
        <div className="mt-8 rounded-2xl border border-primary/40 bg-primary/5 p-6">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <h3 className="mt-3 font-display text-xl font-semibold">Votre signalement est prêt</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Conservez votre code de suivi, puis transmettez le signalement au référent éthique par
            le canal de votre choix.
          </p>
          <p className="mt-4 font-mono text-2xl font-bold text-primary">{code}</p>
          <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-background p-4 text-xs">
            {report}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(report)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              <Copy className="h-4 w-4" /> Copier
            </button>
            <a
              href={`${SITE.whatsappLink}?text=${encodeURIComponent(report)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Envoyer par WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent("Signalement éthique " + code)}&body=${encodeURIComponent(report)}`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              <Mail className="h-4 w-4" /> Envoyer par e-mail
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Pour rester totalement anonyme, utilisez une adresse e-mail ou un numéro qui ne vous
            identifie pas, ou le courrier postal ci-dessous.
          </p>
          <button
            type="button"
            onClick={() => setCode(null)}
            className="mt-4 cursor-pointer text-sm font-semibold text-primary underline"
          >
            Modifier le signalement
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
          <div>
            <label className="text-sm font-semibold" htmlFor="cat">
              Nature des faits *
            </label>
            <select
              id="cat"
              className={`${FIELD_CLASS_NAME} mt-2 cursor-pointer`}
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
                className={`${FIELD_CLASS_NAME} mt-2`}
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
                className={`${FIELD_CLASS_NAME} mt-2`}
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
              className={`${FIELD_CLASS_NAME} mt-2`}
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
              className={`${FIELD_CLASS_NAME} mt-2`}
              value={form.evidence}
              onChange={(event) => setField("evidence", event.target.value)}
            />
          </div>

          <fieldset className="rounded-2xl border border-border p-5">
            <legend className="px-2 text-sm font-semibold">Mode de transmission</legend>
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="radio"
                checked={form.anonymous}
                onChange={() => setField("anonymous", true)}
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
                className={`${FIELD_CLASS_NAME} mt-4`}
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
            className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Préparer mon signalement
          </button>
        </form>
      )}
    </section>
  );
}
