import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { PackageSearch, CheckCircle2, Clock, Loader2, Truck, Package } from "lucide-react";

export const Route = createFileRoute("/tests/suivie")({
  head: () => ({
    meta: [
      { title: "Suivi de commande (test) — STAF PRINT CENTER" },
      { name: "description", content: "Suivez l'avancement de votre commande d'impression ou de prestation digitale en temps réel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuiviPage,
});

type Step = { key: string; label: string; icon: typeof Package; done: boolean; current?: boolean };

const DEMO: Record<string, { customer: string; product: string; steps: Step[] }> = {
  "SPC-2026-001": {
    customer: "Jean Dupont",
    product: "500 cartes de visite Premium",
    steps: [
      { key: "confirmed", label: "Commande confirmée", icon: CheckCircle2, done: true },
      { key: "design", label: "BAT en validation", icon: CheckCircle2, done: true },
      { key: "print", label: "Impression en cours", icon: Loader2, done: false, current: true },
      { key: "ready", label: "Prête au retrait", icon: Package, done: false },
      { key: "delivered", label: "Livrée", icon: Truck, done: false },
    ],
  },
  "SPC-2026-002": {
    customer: "Marie Kossou",
    product: "Site vitrine 5 pages",
    steps: [
      { key: "confirmed", label: "Commande confirmée", icon: CheckCircle2, done: true },
      { key: "design", label: "Maquette validée", icon: CheckCircle2, done: true },
      { key: "print", label: "Développement", icon: CheckCircle2, done: true },
      { key: "ready", label: "Recette client", icon: Loader2, done: false, current: true },
      { key: "delivered", label: "Mise en ligne", icon: Truck, done: false },
    ],
  },
};

function SuiviPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<typeof DEMO[string] | null | undefined>(undefined);

  const search = () => {
    const key = code.trim().toUpperCase();
    setResult(DEMO[key] ?? null);
  };

  return (
    <SiteShell>
      <section className="container-x max-w-3xl py-16 md:py-24">
        <div className="mb-8 flex items-center gap-3 text-sm text-foreground/60">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <Link to="/tests" className="hover:text-primary">Tests</Link>
          <span>/</span>
          <span className="text-foreground">Suivi de commande</span>
        </div>

        <div className="mb-8 flex items-start gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PackageSearch size={24} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Suivi de commande</h1>
            <p className="mt-2 text-foreground/70">Entrez votre numéro de commande pour voir l'avancement. Essayez <code className="rounded bg-muted px-1 py-0.5 text-xs">SPC-2026-001</code> ou <code className="rounded bg-muted px-1 py-0.5 text-xs">SPC-2026-002</code>.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Ex : SPC-2026-001"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm"
          />
          <button
            onClick={search}
            className="cursor-pointer rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Rechercher
          </button>
        </div>

        {result === null && (
          <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            Aucune commande trouvée avec ce numéro.
          </div>
        )}

        {result && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-foreground/60">Client</div>
                <div className="font-semibold">{result.customer}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-foreground/60">Produit</div>
                <div className="font-semibold">{result.product}</div>
              </div>
            </div>

            <ol className="space-y-4">
              {result.steps.map((s) => {
                const Icon = s.done ? CheckCircle2 : s.current ? Loader2 : Clock;
                return (
                  <li key={s.key} className="flex items-center gap-4">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${s.done ? "bg-primary text-primary-foreground" : s.current ? "bg-primary/10 text-primary" : "bg-muted text-foreground/50"}`}>
                      <Icon size={18} className={s.current ? "animate-spin" : ""} />
                    </div>
                    <div className={`text-sm font-medium ${s.done ? "text-foreground" : s.current ? "text-primary" : "text-foreground/50"}`}>
                      {s.label}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </section>
    </SiteShell>
  );
}