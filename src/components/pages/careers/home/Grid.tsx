import { AnimatePresence, motion } from "framer-motion";
import { CareersHomeCard } from "./Card";
import { CareersHomeSkeleton } from "./Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import type { APIJobOffer } from "@/data/jobs";

interface CareersHomeGridProps {
  isLoading: boolean;
  offers: APIJobOffer[];
}

export function CareersHomeGrid({ isLoading, offers }: CareersHomeGridProps) {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={`skeleton-${idx}`}>
              <CareersHomeSkeleton />
            </div>
          ))
        ) : offers.length > 0 ? (
          offers.map((o) => (
            <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <CareersHomeCard offer={o} />
            </motion.div>
          ))
        ) : (
          <EmptyState description="Aucune offre ne correspond aux critères sélectionnés. Essayez un autre filtre." />
        )}
      </AnimatePresence>
    </div>
  );
}