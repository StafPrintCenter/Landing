// MobileSheet.tsx
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqHomeMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function FaqHomeMobileSheet({ isOpen, onClose, resultCount, children }: FaqHomeMobileSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end bg-black/50 md:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Filtres</h2>
              <button onClick={onClose} aria-label="Fermer" className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4">{children}</div>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground cursor-pointer"
            >
              Voir {resultCount} résultat{resultCount > 1 ? "s" : ""}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}