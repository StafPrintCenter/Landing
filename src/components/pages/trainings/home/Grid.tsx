import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FormationHomeCard } from "./Card";
import { FormationHomeSkeleton } from "./Skeleton";
import { TrainningRegistration } from "@/components/modal";
import type { APIFormation } from "@/data/trainings";
import { EmptyState } from "@/components/shared/EmptyState";

interface FormationGridProps {
  isLoading: boolean;
  formations: APIFormation[];
}

export function FormationHomeGrid({ isLoading, formations }: FormationGridProps) {
  // Stocke la formation sélectionnée pour l'inscription (null = modal fermée)
  const [selectedFormation, setSelectedFormation] = useState<APIFormation | null>(null);

  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={`skeleton-${idx}`}>
              <FormationHomeSkeleton />
            </div>
          ))
        ) : formations.length > 0 ? (
          formations.map((f) => (
            <FormationHomeCard
              key={f.id}
              formation={f}
              onRegister={() => setSelectedFormation(f)}
            />
          ))
        ) : (
          <EmptyState description="Aucune formation ne correspond aux critères sélectionnés. Essayez un autre filtre." />
        )}
      </AnimatePresence>

      {/* Modal unique partagée pour toute la grille */}
      <AnimatePresence>
        {selectedFormation && (
          <TrainningRegistration
            formation={selectedFormation}
            isOpen={true}
            onClose={() => setSelectedFormation(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
