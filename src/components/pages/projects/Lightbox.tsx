import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import type { APIProject } from "@/data/projects";
import { ShareModal } from "@/components/modal";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { getShortlinkCategory } from "@/data/shortlinks";

interface RealisationHomeLightboxProps {
  current: APIProject | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function RealisationHomeLightbox({ current, onClose, onPrev, onNext }: RealisationHomeLightboxProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Génération de l'URL spécifique qui ouvrira directement la Lightbox
  const shareUrl = current ? buildShareUrl(`/projects?open=${current.id}`) : "";

  return (
    <>
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4"
            onClick={onClose}
          >
            {/* Boutons du coin supérieur droit */}
            <div className="absolute right-4 top-4 flex items-center gap-2 z-70">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShareOpen(true);
                }}
                aria-label="Partager ce projet"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Share2 size={18} />
              </button>

              <button
                onClick={onClose}
                aria-label="Fermer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Précédent"
              className="absolute left-4 bottom-4 md:bottom-auto md:right-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Suivant"
              className="absolute right-4 bottom-4 md:bottom-auto md:right-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={current.cover} alt={current.title} className="max-h-[70vh] w-full object-contain" />
              <div className="px-6 py-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">{current.category}</span>
                <h3 className="mt-1 font-display text-xl font-bold">{current.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{current.client}</p>
                <p className="mt-3 text-sm">{current.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {current && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          url={shareUrl}
          title={current.title}
          text={current.description}
          shortlinkCategory={getShortlinkCategory(current.category)}
        />
      )}
    </>
  );
}