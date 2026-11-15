import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Eye, Sparkles } from "lucide-react";
import { getResourceIcon, formatResourcePrice, type APIResource } from "@/data/resources";

export function ResourceHomeCard({ resource }: { resource: APIResource }) {
  const Icon = getResourceIcon(resource);
  const isFree = resource.price === 0;
  const discount = resource.discountPercentage > 0 ? resource.discountPercentage : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-secondary text-secondary-foreground">
        {resource.cover ? (
          <>
            <img
              src={resource.cover}
              alt={`Couverture de ${resource.title}`}
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-secondary/75" />
          </>
        ) : (
          <>
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
          </>
        )}
        <Icon size={52} strokeWidth={1.25} className="relative z-10 text-accent transition duration-300 group-hover:scale-110" />
        <span className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${isFree ? "bg-leaf text-cream" : "bg-accent text-accent-foreground"}`}>
          {isFree ? <Download size={12} /> : <Sparkles size={12} />}
          {formatResourcePrice(resource.price)}
        </span>
        {discount !== null && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            -{discount}%
          </span>
        )}
        <span className="absolute bottom-3 left-4 rounded-full bg-background/10 px-3 py-1 text-[11px] font-medium text-secondary-foreground/80 backdrop-blur-sm">
          {resource.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="font-semibold uppercase tracking-widest text-primary">{resource.category}</span>
          <span className="text-muted-foreground">{resource.meta}</span>
        </div>
        <h2 className="mt-3 font-display text-xl font-semibold leading-snug">{resource.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{resource.short}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>{resource.format}</span>
            <span className="inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-1"><Eye size={12} />{resource.viewsCount}</span>
              <span className="inline-flex items-center gap-1"><Download size={12} />{resource.downloadsCount}</span>
            </span>
            {discount !== null && resource.originalPrice !== null && (
              <span><s>{formatResourcePrice(resource.originalPrice)}</s> <strong className="text-primary">{formatResourcePrice(resource.price)}</strong></span>
            )}
          </div>
          <Link
            to="/tools/ressources/$slug"
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
}
