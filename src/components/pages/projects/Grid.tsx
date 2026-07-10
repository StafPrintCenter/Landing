import { AnimatePresence, motion } from "framer-motion";
import { RealisationHomeCard } from "./Card";
import { RealisationHomeSkeleton } from "./Skeleton";
import type { APIProject } from "@/data/projects";
import { EmptyState } from "@/components/shared/EmptyState";

interface RealisationHomeGridProps {
  isLoading: boolean;
  projects: APIProject[];
  onOpen: (index: number) => void;
}

export function RealisationHomeGrid({ isLoading, projects, onOpen }: RealisationHomeGridProps) {
  return (
    <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={`skeleton-${idx}`}>
              <RealisationHomeSkeleton />
            </div>
          ))
        ) : projects.length > 0 ? (
          projects.map((p, i) => (
            <RealisationHomeCard key={p.id} project={p} onClick={() => onOpen(i)} />
          ))
        ) : (
          <EmptyState description="Aucun project ne correspond aux critères sélectionnés. Essayez un autre filtre." />
        )}
      </AnimatePresence>
    </motion.div>
  );
}