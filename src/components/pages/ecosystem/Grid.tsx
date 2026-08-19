import { EcosystemCard } from "./Card";
import { EmptyState } from "@/components/shared/EmptyState";
import type { EcosystemSite } from "@/data/ecosystem";

interface EcosystemGridProps {
  sites: EcosystemSite[];
}

export function EcosystemGrid({ sites }: EcosystemGridProps) {
  if (sites.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState description="Aucun site ne correspond à ce filtre." />
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <EcosystemCard key={site.id} site={site} />
      ))}
    </div>
  );
}