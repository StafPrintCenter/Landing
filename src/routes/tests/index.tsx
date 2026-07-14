import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Calculator, PackageSearch, Download, CalendarDays, Users, Mail, FlaskConical, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/tests/")({
  head: () => ({
    meta: [
      { title: "Pages de test — STAF PRINT CENTER" },
      { name: "description", content: "Index des prototypes et modules en cours de test." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TestsIndexPage,
});

const TESTS = [
  { to: "/tests/devis", icon: Calculator, title: "Devis intelligent", desc: "Configurateur de prix en temps réel selon produit, quantité et finition." },
  { to: "/tests/ressources", icon: Download, title: "Ressources gratuites", desc: "Zone de templates, guides et outils à télécharger." },
  { to: "/tests/calendar", icon: CalendarDays, title: "Calendrier des sessions", desc: "Agenda public des prochaines sessions de formation." },
  { to: "/tests/affiliation", icon: Users, title: "Programme de parrainage", desc: "Génération de codes de parrainage et paliers de récompenses." },
  { to: "/tests/newsletter", icon: Mail, title: "Newsletter", desc: "Inscription à la newsletter avec centres d'intérêt." },
] as const;

function TestsIndexPage() {
  return (
    <SiteShell>
      <section className="container-x max-w-6xl py-16 md:py-24">
        <div className="mb-8 flex items-center gap-3 text-sm text-foreground/60">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <span className="text-foreground">Tests</span>
        </div>

        <div className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FlaskConical size={24} />
          </div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Pages de test</h1>
          <p className="mt-3 text-foreground/70">
            Prototypes de modules en cours de validation. Ces pages sont non indexées et destinées à un usage interne pour évaluer les fonctionnalités avant leur intégration définitive au site.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTS.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug">{t.title}</h3>
                <p className="mt-2 flex-1 text-sm text-foreground/70">{t.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Ouvrir <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}