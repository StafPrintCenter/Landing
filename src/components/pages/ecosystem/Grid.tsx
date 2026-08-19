import {
  ECOSYSTEM_SITES,
  ECOSYSTEM_CATEGORY_LABELS,
  type EcosystemSiteCategory,
} from "@/data/ecosystem";
import { EcosystemCard } from "./Card";

const CATEGORY_ORDER: EcosystemSiteCategory[] = ["principal", "outil", "formation", "communication"];

export function EcosystemGrid() {
  return (
    <div className="mt-10 space-y-10">
      {CATEGORY_ORDER.map((category) => {
        const sites = ECOSYSTEM_SITES.filter((s) => s.category === category);
        if (sites.length === 0) return null;

        return (
          <div key={category}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {ECOSYSTEM_CATEGORY_LABELS[category]}
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sites.map((site) => (
                <EcosystemCard key={site.id} site={site} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}