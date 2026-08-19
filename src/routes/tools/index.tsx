import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import { AVAILABLE_TOOLS, UPCOMING_TOOLS } from "@/data/tools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: `Outils | ${SITE.name}` },
      { name: "description", content: `Retrouvez tous les outils pratiques mis à disposition par ${SITE.name} : rendez-vous, suivi de demande, newsletter et plus.` },
    ],
  }),
  component: ToolsPage,
});

const AVAILABLE_TOOLS = [
  {
    to: "/tools/appointment",
    icon: CalendarDays,
    title: "Prendre rendez-vous",
    desc: "Choisissez un créneau disponible et réservez votre passage en atelier ou en ligne en quelques clics.",
    actionLabel: "Réserver un créneau",
  },
  {
    to: "/tools/lookup",
    icon: PackageSearch,
    title: "Suivre une demande",
    desc: "Entrez votre email et votre numéro de ticket pour connaître l'état de traitement de votre message.",
    actionLabel: "Suivre mon ticket",
  },
  {
    to: "/tools/newsletter",
    icon: Newspaper,
    title: "Newsletter",
    desc: "Recevez nos actualités, conseils et offres selon vos centres d'intérêt.",
    actionLabel: "Gérer mon abonnement",
  },
  {
    href: SITE.shortUrl,
    icon: Link2,
    title: "Raccourcir un lien",
    desc: "Générez des liens courts et faciles à partager pour simplifier votre communication.",
    actionLabel: "Reduire un lien",
  },
] as const;

const UPCOMING_TOOLS = [
  { icon: Calculator, title: "Devis intelligent", desc: "Configurateur de prix selon produit, quantité et finition." },
  { icon: Download, title: "Ressources gratuites", desc: "Templates et guides à télécharger." },
  { icon: Users, title: "Programme de parrainage", desc: "Codes de parrainage et paliers de récompenses." },
] as const;

function ToolsIndexPage() {
  return (
    <SiteShell>
      <section className="container-x py-16">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <div className="mb-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles size={14} /> Outils
                </span>
              </div>
              <h1 className="text-3xl font-bold md:text-4xl">Outils pratiques</h1>
              <p className="mt-3 text-foreground/70">
                Des fonctionnalités pensées pour vous simplifier la vie, en attendant votre prochaine visite en atelier.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/70">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {AVAILABLE_TOOLS.length} outil{AVAILABLE_TOOLS.length > 1 ? "s" : ""} disponible{AVAILABLE_TOOLS.length > 1 ? "s" : ""}
            </div>
          </div>
        </Reveal>

        {/* Outils disponibles */}
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {AVAILABLE_TOOLS.map((t) => {
            const Icon = t.icon;
            const isExternal = "href" in t;
            const content = (
              <>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {tool.actionLabel} <ArrowRight size={14} />
                </span>
              </>
            );

            const className = "group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition hover:border-primary/40 hover:shadow-lg";

            return tool.to ? (
              <Link key={tool.id} to={tool.to} className={className}>
                {cardContent}
              </Link>
            );
          })}
        </div>

        {UPCOMING_TOOLS.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              À venir
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {UPCOMING_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className="flex flex-col rounded-2xl border border-dashed border-border bg-muted/20 p-6 opacity-70"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground/80">{tool.title}</h3>
                    <p className="mt-1.5 flex-1 text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                    {tool.statusLabel && (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                        <Clock size={12} /> {tool.statusLabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </SiteShell>
  );
}