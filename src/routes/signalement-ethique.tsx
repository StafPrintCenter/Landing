import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ShieldCheck, EyeOff, Lock, Scale, Copy, MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import {
  ETHIQUE_FRAMEWORK, ETHIQUE_PILLARS, ETHIQUE_SCOPE, ETHIQUE_CATEGORIES,
  ETHIQUE_PROCESS, ETHIQUE_FAQ, ETHIQUE_POSTAL, generateTrackingCode,
} from "@/data/ethique";

const TITLE = "Signalement éthique & droit d'alerte — STAF PRINT CENTER";
const DESC = "Signalez de façon anonyme et confidentielle tout fait de corruption, fraude ou conflit d'intérêts. Dispositif conforme à la loi béninoise n° 2011-20.";

export const Route = createFileRoute("/signalement-ethique")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/signalement-ethique" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/signalement-ethique" }],
    scripts: [{
      type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebPage", name: TITLE, description: DESC,
        publisher: { "@type": "LocalBusiness", name: "STAF PRINT CENTER" },
      })
    }],
  }),
  component: EthiquePage,
});

const schema = z.object({
  category: z.string().min(1, "Choisissez une catégorie"),
  concerned: z.string().trim().max(200),
  when: z.string().trim().max(100),
  description: z.string().trim().min(30, "Décrivez les faits (30 caractères minimum)").max(3000),
  evidence: z.string().trim().max(500),
  anonymous: z.boolean(),
  contact: z.string().trim().max(150),
  goodFaith: z.literal(true, { message: "Vous devez attester de votre bonne foi" }),
});

const PILLAR_ICONS = [EyeOff, Lock, ShieldCheck];

function EthiquePage() {
  const [form, setForm] = useState({ category: "", concerned: "", when: "", description: "", evidence: "", anonymous: true, contact: "", goodFaith: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [code, setCode] = useState<string | null>(null);
  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs); return;
    }
    setErrors({}); setCode(generateTrackingCode());
    window.scrollTo({ top: document.getElementById("formulaire")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const report = code ? [
    `SIGNALEMENT ÉTHIQUE — ${code}`, `Catégorie : ${form.category}`,
    form.concerned && `Personnes/services : ${form.concerned}`, form.when && `Période : ${form.when}`,
    `Faits : ${form.description}`, form.evidence && `Éléments probants : ${form.evidence}`,
    form.anonymous || !form.contact ? "Déclarant : anonyme" : `Contact : ${form.contact}`,
  ].filter(Boolean).join("\n") : "";

  const field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none";

  return (
    <SiteShell>
      <section className="border-b border-border bg-muted/40">
        <div className="container-x py-16 md:py-24">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"
          >
            <ShieldCheck className="h-4 w-4" />
            Canal confidentiel — Tolérance zéro corruption
          </span>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold md:text-6xl">
            Dispositif de signalement éthique & droit d'alerte
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            STAF PRINT CENTER refuse toute forme de corruption, de fraude ou d'arrangement occulte. Si vous êtes témoin d'un manquement, vous pouvez nous le signaler en toute sécurité, de manière anonyme si vous le souhaitez.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#formulaire" className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Faire un signalement</a>
            <a href="#cadre" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90">Notre cadre de référence</a>
          </div>
          <blockquote className="mt-12 max-w-2xl border-l-4 border-primary pl-5 text-foreground/80 italic">
            « L'intégrité est la base de la confiance que nos clients nous accordent. Aucun contrat ne vaut une compromission. »
            <footer className="mt-2 text-sm not-italic font-semibold text-foreground">— {SITE.manager}, gérant</footer>
          </blockquote>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {ETHIQUE_PILLARS.map((p, i) => {
            const I = PILLAR_ICONS[i]; return (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
                <I className="h-8 w-8 text-primary" />
                <h2 className="mt-4 font-display text-xl font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>);
          })}
        </div>
      </section>

      <section id="cadre" className="container-x scroll-mt-24 pb-16">
        <h2 className="flex items-center gap-3 font-display text-3xl font-bold"><Scale className="h-7 w-7 text-primary" /> Cadre de référence</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {ETHIQUE_FRAMEWORK.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border p-6">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold">Ce que vous pouvez signaler</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ETHIQUE_SCOPE.map((s) => (
              <div key={s.title} className="rounded-2xl bg-card p-6 border border-border">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Les réclamations commerciales (retard, réimpression, litige de prix) relèvent du service client, pas de ce dispositif.</p>
        </div>
      </section>

      <section id="formulaire" className="container-x max-w-3xl scroll-mt-24 py-16">
        <h2 className="font-display text-3xl font-bold">Formulaire de signalement</h2>
        {code ? (
          <div className="mt-8 rounded-2xl border border-primary/40 bg-primary/5 p-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <h3 className="mt-3 font-display text-xl font-semibold">Votre signalement est prêt</h3>
            <p className="mt-2 text-sm text-muted-foreground">Conservez votre code de suivi, puis transmettez le signalement au référent éthique par le canal de votre choix.</p>
            <p className="mt-4 font-mono text-2xl font-bold text-primary">{code}</p>
            <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-background p-4 text-xs">{report}</pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => navigator.clipboard.writeText(report)} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"><Copy className="h-4 w-4" /> Copier</button>
              <a href={`${SITE.whatsappLink}?text=${encodeURIComponent(report)}`} target="_blank" rel="noopener noreferrer" className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><MessageCircle className="h-4 w-4" /> Envoyer par WhatsApp</a>
              <a href={`mailto:${SITE.email}?subject=${encodeURIComponent("Signalement éthique " + code)}&body=${encodeURIComponent(report)}`} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"><Mail className="h-4 w-4" /> Envoyer par e-mail</a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Pour rester totalement anonyme, utilisez une adresse e-mail ou un numéro qui ne vous identifie pas, ou le courrier postal ci-dessous.</p>
            <button type="button" onClick={() => setCode(null)} className="mt-4 cursor-pointer text-sm font-semibold text-primary underline">Modifier le signalement</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="text-sm font-semibold" htmlFor="cat">Nature des faits *</label>
              <select id="cat" className={field + " mt-2 cursor-pointer"} value={form.category} onChange={(e) => set("category", e.target.value)}>
                <option value="">Choisir…</option>
                {ETHIQUE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label className="text-sm font-semibold" htmlFor="who">Personnes ou services concernés</label>
                <input id="who" maxLength={200} className={field + " mt-2"} value={form.concerned} onChange={(e) => set("concerned", e.target.value)} /></div>
              <div><label className="text-sm font-semibold" htmlFor="when">Date ou période des faits</label>
                <input id="when" maxLength={100} placeholder="ex : mars 2026, répété" className={field + " mt-2"} value={form.when} onChange={(e) => set("when", e.target.value)} /></div>
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="desc">Description factuelle * <span className="font-normal text-muted-foreground">(qui, quoi, où, comment)</span></label>
              <textarea id="desc" rows={6} maxLength={3000} className={field + " mt-2"} value={form.description} onChange={(e) => set("description", e.target.value)} />
              {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
            </div>
            <div><label className="text-sm font-semibold" htmlFor="ev">Éléments probants disponibles</label>
              <input id="ev" maxLength={500} placeholder="documents, messages, témoins…" className={field + " mt-2"} value={form.evidence} onChange={(e) => set("evidence", e.target.value)} /></div>
            <fieldset className="rounded-2xl border border-border p-5">
              <legend className="px-2 text-sm font-semibold">Mode de transmission</legend>
              <label className="flex cursor-pointer items-center gap-3 text-sm"><input type="radio" checked={form.anonymous} onChange={() => set("anonymous", true)} /> 100 % anonyme</label>
              <label className="mt-2 flex cursor-pointer items-center gap-3 text-sm"><input type="radio" checked={!form.anonymous} onChange={() => set("anonymous", false)} /> Confidentiel avec coordonnées</label>
              {!form.anonymous && <input maxLength={150} placeholder="Nom, e-mail ou téléphone" className={field + " mt-4"} value={form.contact} onChange={(e) => set("contact", e.target.value)} />}
            </fieldset>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" checked={form.goodFaith} onChange={(e) => set("goodFaith", e.target.checked)} />
              J'atteste agir de bonne foi et que les informations transmises sont, à ma connaissance, exactes.
            </label>
            {errors.goodFaith && <p className="text-xs text-destructive">{errors.goodFaith}</p>}
            <button type="submit" className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Préparer mon signalement</button>
          </form>
        )}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="container-x">
          <h2 className="font-display text-3xl font-bold">Traitement & délais</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {ETHIQUE_PROCESS.map((p, i) => (
              <li key={p.title} className="rounded-2xl border border-border bg-card p-5">
                <span className="text-xs font-semibold text-primary">{i + 1}. {p.delay}</span>
                <h3 className="mt-2 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </li>))}
          </ol>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">Autres canaux</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><strong className="text-foreground">WhatsApp référent :</strong> {SITE.whatsapp}</li>
            <li><strong className="text-foreground">E-mail :</strong> {SITE.email}</li>
            <li><strong className="text-foreground">Courrier :</strong> {ETHIQUE_POSTAL}</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Questions fréquentes</h2>
          <div className="mt-4 space-y-3">
            {ETHIQUE_FAQ.map((f) => (
              <details key={f.q} className="rounded-xl border border-border p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
