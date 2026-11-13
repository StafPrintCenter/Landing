import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  Download,
  FileCheck2,
  Layers3,
  MessageCircle,
  MonitorCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { RESOURCES, formatResourcePrice, getDiscountPercent, getResource, getResourceIcon, getResourceStatus } from "@/data/resources";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/tests/ressources/$slug")({
  loader: ({ params }) => {
    const resource = getResource(params.slug);
    if (!resource) throw notFound();
    return { slug: resource.slug };
  },
  head: ({ loaderData }) => {
    const resource = loaderData ? getResource(loaderData.slug) : undefined;
    if (!resource) {
      return { meta: [{ title: "Ressource introuvable — STAF PRINT CENTER" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${resource.title} — Ressources STAF PRINT CENTER`;
    return {
      meta: [
        { title },
        { name: "description", content: resource.short },
        { name: "robots", content: "noindex" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: resource.short },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: resource.short },
      ],
    };
  },
  notFoundComponent: ResourceNotFound,
  component: ResourceDetailPage,
});

function ResourceNotFound() {
  return (
    <SiteShell>
      <section className="container-x py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Ressource introuvable</h1>
        <p className="mt-3 text-muted-foreground">Cette ressource n'existe pas ou a été déplacée.</p>
        <Link to="/tests/ressources" className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          <ArrowLeft size={16} /> Retour aux ressources
        </Link>
      </section>
    </SiteShell>
  );
}

function ResourceDetailPage() {
  const { slug } = Route.useLoaderData();
  const resource = getResource(slug);
  if (!resource) throw notFound();
  const Icon = getResourceIcon(resource);
  const isFree = resource.price === 0;
  const price = formatResourcePrice(resource.price);
  const discount = getDiscountPercent(resource);
  const originalPrice = discount !== null && resource.originalPrice ? formatResourcePrice(resource.originalPrice) : null;
  const related = RESOURCES.filter((item) => item.slug !== resource.slug && item.category === resource.category).slice(0, 2);
  const whatsappUrl = `${SITE.whatsappLink}?text=${encodeURIComponent(
    isFree
      ? `Bonjour STAF PRINT CENTER, je souhaite recevoir gratuitement la ressource « ${resource.title} » (${resource.format}).`
      : `Bonjour STAF PRINT CENTER, je souhaite commander la ressource « ${resource.title} » au prix ${originalPrice ? `promotionnel de ${price} au lieu de ${originalPrice} (-${discount}%)` : `de ${price}`}. Pouvez-vous m'indiquer la marche à suivre ?`,
  )}`;

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border bg-secondary text-secondary-foreground">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="container-x relative py-10 md:py-16">
          <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-sm text-secondary-foreground/60">
            <Link to="/" className="transition hover:text-accent">Accueil</Link>
            <span>/</span>
            <Link to="/tests" className="transition hover:text-accent">Tests</Link>
            <span>/</span>
            <Link to="/tests/ressources" className="transition hover:text-accent">Ressources</Link>
            <span>/</span>
            <span className="text-secondary-foreground">{resource.title}</span>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-secondary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                  {resource.category}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isFree ? "bg-leaf/20 text-secondary-foreground" : "bg-accent text-accent-foreground"}`}>
                  {isFree ? <Download size={13} /> : <Sparkles size={13} />}
                  {isFree ? "Ressource gratuite" : "Ressource premium"}
                </span>
              </div>
              <div className="mt-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-xl">
                <Icon size={30} />
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">{resource.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary-foreground/75">{resource.description}</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-secondary-foreground/65">
                <span className="inline-flex items-center gap-2"><FileCheck2 size={16} className="text-accent" />{resource.format}</span>
                <span className="inline-flex items-center gap-2"><Layers3 size={16} className="text-accent" />{resource.meta}</span>
                <span className="inline-flex items-center gap-2"><BadgeCheck size={16} className="text-accent" />{getResourceStatus(resource)}</span>
              </div>
            </div>

            <aside className="rounded-3xl border border-secondary-foreground/15 bg-background/5 p-6 shadow-2xl backdrop-blur-sm md:p-8">
              <p className="text-sm text-secondary-foreground/60">{isFree ? "Accès libre" : originalPrice ? "Prix promotionnel" : "Prix de la ressource"}</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-3">
                <p className="font-display text-4xl font-bold">{price}</p>
                {originalPrice && (
                  <>
                    <s className="text-lg text-secondary-foreground/50">{originalPrice}</s>
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">-{discount}%</span>
                  </>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/60">
                {isFree ? "Demandez le fichier et recevez-le directement sur WhatsApp." : "Commande et remise du fichier confirmées directement sur WhatsApp."}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {isFree ? <Download size={18} /> : <ShoppingBag size={18} />}
                {isFree ? "Recevoir gratuitement" : "Commander sur WhatsApp"}
              </a>
              <div className="mt-5 space-y-3 border-t border-secondary-foreground/15 pt-5 text-xs text-secondary-foreground/65">
                <p className="flex items-center gap-2"><MessageCircle size={14} className="text-accent" />Réponse de l'équipe STAF PRINT CENTER</p>
                <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-accent" />Licence d'utilisation incluse</p>
                <p className="flex items-center gap-2"><MonitorCheck size={14} className="text-accent" />Fichier numérique, aucun envoi physique</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contenu du fichier</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Tout ce qui est inclus.</h2>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {resource.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Check size={13} strokeWidth={3} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">À quoi ça sert ?</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Des résultats concrets, rapidement.</h2>
              <div className="mt-7 space-y-4">
                {resource.outcomes.map((item, index) => (
                  <div key={item} className="flex items-center gap-4 border-b border-border pb-4 last:border-0">
                    <span className="font-display text-2xl font-bold text-primary/35">0{index + 1}</span>
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-muted/60 p-6">
              <BookOpenCheck className="text-primary" size={24} />
              <h2 className="mt-4 font-display text-xl font-bold">Pour qui ?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resource.audience}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <MonitorCheck className="text-primary" size={24} />
              <h2 className="mt-4 font-display text-xl font-bold">Prérequis</h2>
              <ul className="mt-4 space-y-3">
                {resource.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <ShieldCheck className="text-primary" size={24} />
              <h2 className="mt-4 font-display text-xl font-bold">Licence simple</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resource.license}</p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-muted/50">
          <div className="container-x py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Dans la même catégorie</p>
                <h2 className="mt-2 font-display text-3xl font-bold">À explorer aussi.</h2>
              </div>
              <Link to="/tests/ressources" className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Toute la bibliothèque <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((item) => {
                const RelatedIcon = getResourceIcon(item);
                return (
                  <Link key={item.slug} to="/tests/ressources/$slug" params={{ slug: item.slug }} className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><RelatedIcon size={22} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">{item.format}<span>·</span>{formatResourcePrice(item.price)}</span>
                      <span className="mt-2 block font-display text-lg font-semibold group-hover:text-primary">{item.title}</span>
                      <span className="mt-2 block text-sm text-muted-foreground">{item.short}</span>
                    </span>
                    <ArrowRight size={18} className="mt-1 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
