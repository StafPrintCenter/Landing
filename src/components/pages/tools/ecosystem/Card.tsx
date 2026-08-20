import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import logos from "@/assets/logos.json";
import { stripProtocol } from "@/lib/domain";
import { ECOSYSTEM_CATEGORY_LABELS, type EcosystemSite } from "@/data/ecosystem";

interface EcosystemCardProps {
  site: EcosystemSite;
}

export function EcosystemCard({ site }: EcosystemCardProps) {
  const defaultImage = logos.mc;
  const initialImage = logos[site.logoKey] || defaultImage;
  const [imgSrc, setImgSrc] = useState(initialImage);

  return (
    <a
      href={site.url}
      target={site.isCurrent ? undefined : "_blank"}
      rel={site.isCurrent ? undefined : "noreferrer"}
      className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
    >
      {/* Contenu principal (Haut) */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-muted/40 p-2 transition-colors group-hover:border-primary/30">
            <img
              src={imgSrc}
              alt={`Logo ${site.name}`}
              className="h-full w-full object-contain"
              onError={() => setImgSrc(defaultImage)}
            />
          </div>

          {site.isCurrent ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
              <CheckCircle2 size={12} /> Vous êtes ici
            </span>
          ) : (
            <ArrowUpRight
              size={18}
              className="text-muted-foreground transition-colors group-hover:text-primary"
            />
          )}
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {site.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          {site.description}
        </p>
      </div>

      {/* Pied de carte : Badge + URL en flex */}
      <div className="mt-6 flex items-center justify-between gap-2 border-t border-border/40 pt-4">
        <span className="inline-flex shrink-0 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {ECOSYSTEM_CATEGORY_LABELS[site.category]}
        </span>

        <p className="truncate text-xs font-mono text-muted-foreground/70">
          {stripProtocol(site.url)}
        </p>
      </div>
    </a>
  );
}