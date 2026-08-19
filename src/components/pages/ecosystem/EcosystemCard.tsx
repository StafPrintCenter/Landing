import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { stripProtocol } from "@/lib/domain";
import type { EcosystemSite } from "@/data/ecosystem";

interface EcosystemCardProps {
  site: EcosystemSite;
}

export function EcosystemCard({ site }: EcosystemCardProps) {
  const Icon = site.icon;

  return (
    <a
      href={site.url}
      target={site.isCurrent ? undefined : "_blank"}
      rel={site.isCurrent ? undefined : "noreferrer"}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={20} />
        </span>
        {site.isCurrent ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold text-success">
            <CheckCircle2 size={11} /> Vous êtes ici
          </span>
        ) : (
          <ArrowUpRight size={18} className="text-muted-foreground transition group-hover:text-primary" />
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold group-hover:text-primary transition-colors">
        {site.name}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{site.description}</p>

      <p className="mt-4 truncate text-xs font-mono text-muted-foreground/70">{stripProtocol(site.url)}</p>
    </a >
  );
}