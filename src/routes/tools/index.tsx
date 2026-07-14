import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { CalendarDays, PackageSearch, Calculator, Download, Users, Mail, ArrowRight, Clock, } from "lucide-react";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: `Outils en ligne | ${SITE.name}` },
      { name: "description", content: "Prenez rendez-vous ou suivez l'état de votre demande en ligne, sans appel ni file d'attente." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ToolsIndexPage,
});

const AVAILABLE_TOOLS = [
  {
    to: "/tools/appointment",
    icon: CalendarDays,
    title: "Prendre rendez-vous",
    desc: "Choisissez un créneau disponible et réservez votre passage en atelier en quelques clics.",
  },
  {
    to: "/tools/lookup",
    icon: PackageSearch,
    title: "Suivre une demande",
    desc: "Entrez votre email et votre numéro de ticket pour connaître l'état de traitement de votre message.",
  },
] as const;

const UPCOMING_TOOLS = [
  { icon: Calculator, title: "Devis intelligent", desc: "Configurateur de prix selon produit, quantité et finition." },
  { icon: Download, title: "Ressources gratuites", desc: "Templates et guides à télécharger." },
  { icon: Users, title: "Programme de parrainage", desc: "Codes de parrainage et paliers de récompenses." },
  { icon: Mail, title: "Newsletter", desc: "Inscription avec centres d'intérêt personnalisés." },
] as const;

function ToolsIndexPage() {
  return (
    <SiteShell>
      <section className="container-x max-w-6xl py-14 md:py-20">
        {/* En-tête : aligné à gauche, pas de bloc centré isolé */}
        <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-sm text-foreground/60">
              <Link to="/" className="hover:text-primary">Accueil</Link>
              <span>/</span>
              <span className="text-foreground">Outils</span>
            </div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Outils en ligne</h1>
            <p className="mt-3 text-foreground/70">
              Services accessibles dès maintenant, sans appel ni déplacement. D'autres outils
              sont en cours de préparation.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/70">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {AVAILABLE_TOOLS.length} outil{AVAILABLE_TOOLS.length > 1 ? "s" : ""} disponible{AVAILABLE_TOOLS.length > 1 ? "s" : ""}
          </div>
        </div>

        {/* Outils disponibles : mis en avant, format plus large qu'une simple card de grille */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {AVAILABLE_TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition hover:border-primary/40 hover:shadow-lg"
              >
                <div>
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug">{t.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{t.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Ouvrir l'outil <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Outils à venir : visuellement distincts, non cliquables */}
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground/50">
            <Clock size={14} />
            Bientôt disponibles
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {UPCOMING_TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="flex flex-col rounded-2xl border border-dashed border-border bg-muted/30 p-5 opacity-70"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5 text-foreground/50">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground/80">{t.title}</h3>
                  <p className="mt-1.5 flex-1 text-xs text-foreground/60">{t.desc}</p>
                  <span className="mt-3 inline-flex w-fit items-center rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-foreground/50">
                    En préparation
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}