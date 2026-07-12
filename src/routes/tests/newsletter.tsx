import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Mail, CheckCircle2, Sparkles, BookOpen, Tag } from "lucide-react";

export const Route = createFileRoute("/tests/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter (test) — STAF PRINT CENTER" },
      { name: "description", content: "Recevez chaque mois nos conseils design, impression et digital, plus les offres exclusives." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NewsletterPage,
});

const BENEFITS = [
  { icon: Sparkles, title: "Conseils exclusifs", desc: "Chaque mois, 3 astuces design, impression ou web actionnables tout de suite." },
  { icon: Tag, title: "Offres réservées", desc: "Promotions abonnés sur les formations et prestations digitales." },
  { icon: BookOpen, title: "Ressources gratuites", desc: "Templates, guides et checklists envoyés en avant-première." },
];

const TOPICS = ["Design graphique", "Impression", "Sites web", "Formations", "Actus STAF"];

function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>(["Design graphique", "Formations"]);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (t: string) =>
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;
    setSubmitted(true);
  };

  return (
    <SiteShell>
      <section className="container-x max-w-5xl py-16 md:py-24">
        <div className="mb-8 flex items-center gap-3 text-sm text-foreground/60">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <span>Tests</span>
          <span>/</span>
          <span className="text-foreground">Newsletter</span>
        </div>

        <div className="mb-12 flex items-start gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Mail size={24} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">La newsletter STAF</h1>
            <p className="mt-2 max-w-2xl text-foreground/70">Une fois par mois. Zéro spam. Des idées concrètes pour faire rayonner votre marque.</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon size={20} />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{b.title}</div>
                  <p className="mt-1 text-sm text-foreground/70">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="font-display text-2xl font-bold">Inscription enregistrée</h2>
                <p className="mt-2 text-sm text-foreground/70">Un email de confirmation vous sera envoyé à <b>{email}</b> dès l'activation du backend.</p>
                <p className="mt-1 text-xs text-foreground/50">(Page de test — aucune donnée n'est stockée pour le moment.)</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Prénom</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Optionnel"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm" />
                </div>
                <div>
                  <div className="mb-2 block text-sm font-medium">Sujets qui vous intéressent</div>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => {
                      const on = selected.includes(t);
                      return (
                        <button type="button" key={t} onClick={() => toggle(t)}
                          className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition ${on ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <label className="flex items-start gap-2 text-xs text-foreground/70">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 cursor-pointer" />
                  <span>J'accepte de recevoir la newsletter STAF PRINT CENTER et je peux me désabonner à tout moment.</span>
                </label>
                <button type="submit" disabled={!email || !consent}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}