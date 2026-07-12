import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { Gift, Copy, Check, Users, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/tests/affiliation")({
  head: () => ({
    meta: [
      { title: "Programme de parrainage (test) — STAF PRINT CENTER" },
      { name: "description", content: "Parrainez un ami et gagnez des réductions sur vos prochaines commandes et formations." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ParrainagePage,
});

const TIERS = [
  { icon: Gift, filleuls: "1 filleul", reward: "-10 % sur votre prochaine commande", detail: "Applicable dès la première commande du filleul." },
  { icon: Sparkles, filleuls: "3 filleuls", reward: "1 formation offerte (jusqu'à 60 000 FCFA)", detail: "Au choix parmi le catalogue en cours." },
  { icon: Trophy, filleuls: "5 filleuls et +", reward: "Statut Ambassadeur : -20 % à vie", detail: "Sur tous les services et formations." },
];

function slugify(v: string) {
  return v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ParrainagePage() {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => {
    const base = slugify(name).slice(0, 12) || "ami";
    return `SPC-${base.toUpperCase()}-2026`;
  }, [name]);

  const shareLink = `https://stafprintcenter.com/?ref=${code}`;
  const waMessage = encodeURIComponent(
    `Salut ! Je te recommande STAF PRINT CENTER (impression + digital + formations). Utilise mon code ${code} pour bénéficier de -10 % : ${shareLink}`,
  );

  const copy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SiteShell>
      <section className="container-x max-w-5xl py-16 md:py-24">
        <div className="mb-8 flex items-center gap-3 text-sm text-foreground/60">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <Link to="/tests" className="hover:text-primary">Tests</Link>
          <span>/</span>
          <span className="text-foreground">Programme de parrainage</span>
        </div>

        <div className="mb-12 flex items-start gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Gift size={24} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Parrainez, gagnez, répétez</h1>
            <p className="mt-2 max-w-2xl text-foreground/70">Recommandez STAF PRINT CENTER à vos proches ou collègues et débloquez des récompenses à chaque commande signée.</p>
          </div>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.filleuls} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <t.icon size={20} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-foreground/60">{t.filleuls}</div>
              <div className="mt-1 font-display text-lg font-semibold">{t.reward}</div>
              <p className="mt-2 text-sm text-foreground/70">{t.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 rounded-2xl border border-border bg-primary/5 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <label className="mb-2 block text-sm font-medium">Votre prénom / nom d'entreprise</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex : Aster ou Agence Kora"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
            />
            <div className="mt-4 rounded-lg border border-border bg-background p-4">
              <div className="text-xs uppercase tracking-wide text-foreground/60">Votre code personnel</div>
              <div className="mt-1 font-display text-2xl font-bold text-primary">{code}</div>
              <div className="mt-2 truncate text-sm text-foreground/70">{shareLink}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={copy}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-primary bg-background px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10">
              {copied ? <><Check size={16} /> Copié !</> : <><Copy size={16} /> Copier le lien</>}
            </button>
            <a href={`${SITE.whatsappLink}?text=${waMessage}`} target="_blank" rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              <Users size={16} /> Partager sur WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-border p-6 text-sm text-foreground/70">
          <div className="mb-2 font-semibold text-foreground">Comment ça marche ?</div>
          <ol className="ml-5 list-decimal space-y-1">
            <li>Générez votre code personnel ci-dessus.</li>
            <li>Partagez-le à vos proches (WhatsApp, mail, réseaux).</li>
            <li>Votre filleul mentionne le code lors de sa commande ou formation.</li>
            <li>Vous recevez votre récompense dès la commande signée.</li>
          </ol>
        </div>
      </section>
    </SiteShell>
  );
}