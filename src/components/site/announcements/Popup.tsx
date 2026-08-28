import { X } from "lucide-react";
import { motion } from "framer-motion";
import { type APIAnnouncement, STYLES_CONFIG, POPUP_POSITIONS, getAnnouncementIcon } from "@/data/announcements";

interface AnnouncementPopupProps {
  announcement: APIAnnouncement;
  onClose: () => void;
  onAction: () => void;
}

export function AnnouncementPopup({ announcement, onClose, onAction }: AnnouncementPopupProps) {
  const Icon = getAnnouncementIcon(announcement.icon);
  const styleConfig = STYLES_CONFIG[announcement.style] ?? STYLES_CONFIG.info;
  const positionClass = POPUP_POSITIONS[announcement.position] ?? POPUP_POSITIONS["bottom-right"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className={[
        "fixed z-50 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border p-5 shadow-2xl backdrop-blur-md bg-linear-to-b from-card via-card to-muted/20",
        positionClass,
        styleConfig.surfaceCard,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={["rounded-2xl p-3 shadow-inner bg-muted/80 shrink-0", styleConfig.icon].join(" ")}>
            <Icon size={24} />
          </div>
          <h4
            className="font-bold text-base text-foreground truncate cursor-help min-w-0"
            title={announcement.title}
          >
            {announcement.title}
          </h4>
        </div>

        {announcement.isClosable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le popup"
            className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {announcement.message && (
        <p
          className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 cursor-help"
          title={announcement.message}
        >
          {announcement.message}
        </p>
      )}

      {announcement.action && (
        <div className="mt-4 pt-2 flex justify-end">
          <a
            href={announcement.action.url}
            target={announcement.action.target}
            rel={announcement.action.target === "_blank" ? "noreferrer" : undefined}
            onClick={onAction}
            title={announcement.action.label}
            className={[
              "w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all",
              styleConfig.button,
            ].join(" ")}
          >
            {announcement.action.label}
          </a>
        </div>
      )}
    </motion.div>
  );
}