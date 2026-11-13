import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, LibraryBig, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { RESOURCES, formatResourcePrice, getDiscountPercent, getResourceIcon, getResourceStatus } from "@/data/resources";

export const Route = createFileRoute("/tests/ressources/")({
  head: () => ({
    meta: [
      { title: "Ressources & templates (test) — STAF PRINT CENTER" },
      { name: "description", content: "Gabarits, guides et outils gratuits ou premium pour vos projets d'impression, de design et de communication." },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Ressources & templates — STAF PRINT CENTER" },
      { property: "og:description", content: "Des ressources pratiques pour préparer vos projets d'impression et de design." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RessourcesPage,
});

type ResourceFilter = "all" | "free" | "paid";

const FILTERS: { value: ResourceFilter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "free", label: "Gratuites" },
  { value: "paid", label: "Payantes" },
];

function RessourcesPage() {
  const [filter, setFilter] = useState<ResourceFilter>("all");
  const visibleResources = useMemo(
    () => RESOURCES.filter((resource) => filter === "all" || (filter === "free" ? resource.price === 0 : resource.price > 0)),
    [filter],
  );
  const freeCount = RESOURCES.filter((resource) => resource.price === 0).length;

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border bg-muted/45">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="container-x relative max-w-6xl py-12 md:py-20">
          <nav aria-label="Fil d'Ariane" className="mb-8 flex flex-wrap items-center gap-3 text-sm text-foreground/60">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            <span>/</span>
            <Link to="/tests" className="hover:text-primary">Tests</Link>
            <span>/</span>
            <span className="text-foreground">Ressources</span>
          </nav>

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LibraryBig size={24} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">La bibliothèque STAF</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">Des ressources pour passer de l'idée au fichier prêt à produire.</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                Gabarits, guides et checklists conçus pour vos projets d'impression, de design et de communication. Commencez gratuitement ou gagnez du temps avec un modèle premium.
              </p>
            </div>
            <div className="flex gap-6 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
              <div>
                <p className="font-display text-3xl font-bold text-primary">{RESOURCES.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">ressources</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-display text-3xl font-bold text-leaf">{freeCount}</p>
                <p className="mt-1 text-xs text-muted-foreground">gratuites</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x max-w-6xl py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">Explorer la collection</h2>
            <p className="mt-1 text-sm text-muted-foreground">{visibleResources.length} ressource{visibleResources.length > 1 ? "s" : ""} affichée{visibleResources.length > 1 ? "s" : ""}</p>
          </div>
          <div className="inline-flex rounded-full border border-border bg-card p-1" aria-label="Filtrer les ressources">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${filter === item.value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleResources.map((resource) => {
            const Icon = getResourceIcon(resource);
            const isFree = resource.price === 0;
            const discount = getDiscountPercent(resource);
            return (
              <article key={resource.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-secondary text-secondary-foreground">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
                  <Icon size={52} strokeWidth={1.25} className="relative text-accent transition duration-300 group-hover:scale-110" />
                  <span className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${isFree ? "bg-leaf text-cream" : "bg-accent text-accent-foreground"}`}>
                    {isFree ? <Download size={12} /> : <Sparkles size={12} />}
                    {formatResourcePrice(resource.price)}
                  </span>
                  {discount !== null && (
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">-{discount}%</span>
                  )}
                  <span className="absolute bottom-3 left-4 rounded-full bg-background/10 px-3 py-1 text-[11px] font-medium text-secondary-foreground/80 backdrop-blur-sm">{getResourceStatus(resource)}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold uppercase tracking-widest text-primary">{resource.category}</span>
                    <span className="text-muted-foreground">{resource.meta}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{resource.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{resource.short}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="flex flex-col text-xs text-muted-foreground">
                      {resource.format}
                      {discount !== null && resource.originalPrice && (
                        <span className="mt-1"><s>{formatResourcePrice(resource.originalPrice)}</s> <strong className="text-primary">{formatResourcePrice(resource.price)}</strong></span>
                      )}
                    </span>
                    <Link
                      to="/tests/ressources/$slug"
                      params={{ slug: resource.slug }}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:gap-2.5 hover:opacity-90"
                      aria-label={`Découvrir ${resource.title}`}
                    >
                      Découvrir <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-display text-lg font-semibold">Une ressource vous manque ?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Dites-nous quel modèle ou quel guide vous ferait gagner du temps.</p>
          </div>
          <a href="/#contact" className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
            Suggérer une ressource <ArrowRight size={15} />
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
