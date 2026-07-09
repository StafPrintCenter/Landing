import type { LucideIcon } from "lucide-react";

interface LegalHeroProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  lastUpdated: string;
}

export function LegalHero({ icon: Icon, badge, title, description, lastUpdated }: LegalHeroProps) {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="container-x max-w-5xl py-16 md:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <Icon size={12} className="text-primary" />
          {badge}
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{description}</p>
        <p className="mt-6 text-xs text-muted-foreground">
          Dernière mise à jour : <span className="font-medium text-foreground">{lastUpdated}</span>
        </p>
      </div>
    </section>
  );
}