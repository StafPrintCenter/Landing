import { X } from "lucide-react";
import { motion } from "framer-motion";
import {
  type APIAnnouncement,
  STYLES_CONFIG,
  MODAL_POSITIONS,
  getAnnouncementIcon,
} from "@/data/announcements";

interface AnnouncementModalProps {
  announcement: APIAnnouncement;
  onClose: () => void;
  onAction: () => void;
}

export function AnnouncementModal({ announcement, onClose, onAction }: AnnouncementModalProps) {
  const Icon = getAnnouncementIcon(announcement.icon);
  const styleConfig = STYLES_CONFIG[announcement.style] ?? STYLES_CONFIG.info;

  const posKey = announcement.position ?? "center";
  const positionClass = MODAL_POSITIONS[posKey] ?? MODAL_POSITIONS.center;

  // Calcul dynamique de la direction de transition selon la position
  const isTop = posKey.includes("top");
  const isBottom = posKey.includes("bottom");
  const initialY = isTop ? -40 : isBottom ? 40 : 0;
  const initialScale = posKey === "center" ? 0.9 : 0.95;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={[
        "fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm transition-all",
        positionClass,
      ].join(" ")}
      onClick={announcement.isClosable ? onClose : undefined}
    >
      <motion.div
        initial={{ opacity: 0, scale: initialScale, y: initialY }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: initialScale, y: initialY }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className={[
          "relative w-full max-w-lg rounded-3xl border p-6 shadow-2xl",
          styleConfig.surfaceCard,
        ].join(" ")}
      >
        {announcement.isClosable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la boîte de dialogue"
            className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          <div className={["mb-4 rounded-2xl p-3.5 bg-muted/50", styleConfig.icon].join(" ")}>
            <Icon size={32} />
          </div>

          <h3 className="text-xl font-bold text-foreground wrap-break-word">{announcement.title}</h3>

          {announcement.message && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed wrap-break-word">
              {announcement.message}
            </p>
          )}

          {announcement.action && (
            <a
              href={announcement.action.url}
              target={announcement.action.target}
              rel={announcement.action.target === "_blank" ? "noreferrer" : undefined}
              onClick={onAction}
              className={[
                "mt-6 w-full inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all",
                styleConfig.button,
              ].join(" ")}
            >
              {announcement.action.label}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}