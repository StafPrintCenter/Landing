import { BadgeCheck, Download, Eye, FileCheck2, Layers3, MessageCircle, MonitorCheck, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { formatResourcePrice, getResourceIcon, type APIResource } from "@/data/resources";

interface ResourceDetailHeaderProps {
  resource: APIResource;
  whatsappUrl: string;
}

export function ResourceDetailHeader({ resource, whatsappUrl }: ResourceDetailHeaderProps) {
  const Icon = getResourceIcon(resource);
  const isFree = resource.price === 0;
  const discount = resource.discountPercentage > 0 ? resource.discountPercentage : null;
  const originalPrice = discount !== null && resource.originalPrice !== null ? formatResourcePrice(resource.originalPrice) : null;

  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary text-secondary-foreground">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-x relative py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
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
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary-foreground/75">{resource.description ?? resource.short}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-secondary-foreground/65">
              <span className="inline-flex items-center gap-2"><FileCheck2 size={16} className="text-accent" />{resource.format}</span>
              <span className="inline-flex items-center gap-2"><Layers3 size={16} className="text-accent" />{resource.meta}</span>
              <span className="inline-flex items-center gap-2"><BadgeCheck size={16} className="text-accent" />{resource.status}</span>
              <span className="inline-flex items-center gap-2"><Eye size={16} className="text-accent" />{resource.viewsCount} vues</span>
            </div>
          </div>

          <aside className="rounded-3xl border border-secondary-foreground/15 bg-background/5 p-6 shadow-2xl backdrop-blur-sm md:p-8">
            <p className="text-sm text-secondary-foreground/60">{isFree ? "Accès libre" : originalPrice ? "Prix promotionnel" : "Prix de la ressource"}</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-3">
              <p className="font-display text-4xl font-bold">{formatResourcePrice(resource.price)}</p>
              {originalPrice && (
                <>
                  <s className="text-lg text-secondary-foreground/50">{originalPrice}</s>
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">-{discount}%</span>
                </>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/60">
              {isFree ? "Téléchargez directement le fichier ou demandez-le sur WhatsApp." : "Commande et remise du fichier confirmées directement sur WhatsApp."}
            </p>
            {isFree && resource.downloadUrl ? (
              <a
                href={resource.downloadUrl}
                download={resource.downloadFileName ?? undefined}
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Download size={18} /> Télécharger la ressource
              </a>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:opacity-90"
              >
                {isFree ? <Download size={18} /> : <ShoppingBag size={18} />}
                {isFree ? "Recevoir gratuitement sur WhatsApp" : "Commander sur WhatsApp"}
              </a>
            )}
            <div className="mt-5 space-y-3 border-t border-secondary-foreground/15 pt-5 text-xs text-secondary-foreground/65">
              <p className="flex items-center gap-2"><MessageCircle size={14} className="text-accent" />Réponse de l'équipe STAF PRINT CENTER</p>
              <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-accent" />Licence d'utilisation incluse</p>
              <p className="flex items-center gap-2"><MonitorCheck size={14} className="text-accent" />Fichier numérique, aucun envoi physique</p>
              <p className="flex items-center gap-2"><Download size={14} className="text-accent" />{resource.downloadsCount} téléchargements</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
