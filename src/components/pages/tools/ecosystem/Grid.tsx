import { AnimatePresence, motion } from "framer-motion";
import { EcosystemCard } from "./Card";
import { EcosystemSkeleton } from "./Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import type { APIEcosystemSite } from "@/data/ecosystem";

interface EcosystemGridProps {
  isLoading: boolean;
  sites: APIEcosystemSite[];
}

export function EcosystemGrid({ isLoading, sites }: EcosystemGridProps) {
  return (
    <motion.div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={`ecosystem-skeleton-${idx}`}>
              <EcosystemSkeleton />
            </div>
          ))
        ) : sites.length > 0 ? (
          sites.map((site) => (
            <EcosystemCard key={site.id} site={site} />
          ))
        ) : (
          <EmptyState description="Aucun site ne correspond aux critères sélectionnés. Essayez un autre filtre." />
        )}
      </AnimatePresence>
    </motion.div>
  );
}