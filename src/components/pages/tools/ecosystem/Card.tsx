import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Construction } from "lucide-react";
import logos from "@/assets/logos.json";
import { stripProtocol } from "@/lib/domain";
import { ECOSYSTEM_CATEGORY_LABELS, type APIEcosystemSite } from "@/data/ecosystem";
import { useTheme } from "@/hooks/use-theme";

type LogosType = typeof logos;

interface EcosystemCardProps {
  site: APIEcosystemSite;
}

export function EcosystemCard({ site }: EcosystemCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Sélection de l'image selon la variante du thème (mw pour dark, mc pour light)
  const getLogoSrc = (): string => {
    const variantUrl = isDark ? site.logoVariants?.mw : site.logoVariants?.mc;
    if (variantUrl) return variantUrl;

    // Repli sur site.logoUrl ou sur le fichier local JSON si présent
    if (site.logoUrl) return site.logoUrl;
    const logoKey = site.logoKey as keyof LogosType;
    return logoKey in logos ? logos[logoKey] : logos.mc;
  };

  const [imgSrc, setImgSrc] = useState<string>(getLogoSrc());
  const isCurrent = site.name.toLowerCase() === "site vitrine";

  return (
    <a
      href={site.url}
      target={isCurrent ? undefined : "_blank"}
      rel={isCurrent ? undefined : "noreferrer"}
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
              onError={() => setImgSrc(logos.mc)}
            />
          </div>

          <div className="flex items-center gap-2">
            {isCurrent ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                <CheckCircle2 size={12} /> Vous êtes ici
              </span>
            ) : site.status === "building" ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                <Construction size={12} /> En construction
              </span>
            ) : (
              <ArrowUpRight
                size={18}
                className="text-muted-foreground transition-colors group-hover:text-primary"
              />
            )}
          </div>
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {site.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {site.description}
        </p>
      </div>

      {/* Pied de carte : Badge + URL */}
      <div className="mt-6 flex items-center justify-between gap-2 border-t border-border/40 pt-4">
        <span className="inline-flex shrink-0 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {ECOSYSTEM_CATEGORY_LABELS[site.category] ?? site.category}
        </span>

        <p className="truncate font-mono text-xs text-muted-foreground/70">
          {stripProtocol(site.url)}
        </p>
      </div>
    </a>
  );
}