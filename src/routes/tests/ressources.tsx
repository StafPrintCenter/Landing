import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Download, FileText, Palette, BookOpen, Layers, Sparkles } from "lucide-react";

export const Route = createFileRoute("/tests/ressources")({
  head: () => ({
    meta: [
      { title: "Ressources gratuites (test) — STAF PRINT CENTER" },
      { name: "description", content: "Templates, guides et outils gratuits pour vos projets d'impression et de design." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RessourcesPage,
});

const RESOURCES = [
  { icon: FileText, category: "Template", title: "Gabarit carte de visite (85×55mm)", desc: "Fichier PDF/AI aux bonnes dimensions avec fond perdu.", format: "PDF · AI" },
  { icon: Palette, category: "Guide", title: "Choisir ses couleurs de marque", desc: "Petit guide pratique pour définir une palette cohérente.", format: "PDF · 12 pages" },
  { icon: Layers, category: "Template", title: "Kit kakemono 85×200 cm", desc: "Modèle prêt à personnaliser dans votre logiciel favori.", format: "PSD · AI" },
  { icon: BookOpen, category: "Guide", title: "Réussir son brief design", desc: "Checklist pour préparer un brief efficace avant une prestation.", format: "PDF · 6 pages" },
  { icon: Sparkles, category: "Outil", title: "Checklist site web performant", desc: "20 points à vérifier avant de mettre votre site en ligne.", format: "PDF · Checklist" },
  { icon: FileText, category: "Template", title: "Gabarit flyer A5", desc: "Modèle recto/verso avec marges et fond perdu inclus.", format: "PDF · INDD" },
];

function RessourcesPage() {
  return (
    <SiteShell>
      <section className="container-x max-w-6xl py-16 md:py-24">
        <div className="mb-8 flex items-center gap-3 text-sm text-foreground/60">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <Link to="/tests" className="hover:text-primary">Tests</Link>
          <span>/</span>
          <span className="text-foreground">Ressources gratuites</span>
        </div>

        <div className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Download size={24} />
          </div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Ressources gratuites</h1>
          <p className="mt-3 text-foreground/70">Templates, guides et outils à télécharger pour préparer vos projets d'impression et de design. Nouvelles ressources ajoutées régulièrement.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => {
            const Icon = r.icon;
            return (
              <article key={r.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/70">{r.category}</span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm text-foreground/70">{r.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-foreground/60">{r.format}</span>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                  >
                    <Download size={14} /> Télécharger
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-sm text-foreground/70">Une ressource vous manque ? <a href="/#contact" className="font-semibold text-primary hover:underline">Suggérez-la nous</a>.</p>
        </div>
      </section>
    </SiteShell>
  );
}