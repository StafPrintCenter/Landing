import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { FormationHomeCard } from "./Card";
import { FormationHomeSkeleton } from "./Skeleton";
import { TrainningRegistration } from "@/components/modal";
import type { APIFormation } from "@/data/formations";

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
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="col-span-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
              <SearchX size={28} className="text-muted-foreground/60" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-foreground">Aucun résultat</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Aucune formation ne correspond aux critères sélectionnés. Essayez un autre filtre.
              </p>
            </div>
          </motion.div>
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
