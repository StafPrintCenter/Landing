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
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="wait">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <motion.div
              key={`ecosystem-skeleton-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <EcosystemSkeleton />
            </motion.div>
          ))
        ) : sites.length > 0 ? (
          sites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
            >
              <EcosystemCard site={site} />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmptyState description="Aucun site ne correspond aux critères sélectionnés. Essayez un autre filtre." />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}