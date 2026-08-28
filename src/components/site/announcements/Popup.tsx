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
        "fixed z-50 w-[min(26rem,calc(100vw-2rem))] rounded-2xl border p-5 shadow-2xl backdrop-blur-sm",
        positionClass,
        styleConfig.surfaceCard,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={["rounded-xl p-2.5 bg-muted/60", styleConfig.icon].join(" ")}>
            <Icon size={22} />
          </div>
          <h4 className="font-semibold text-base text-foreground">{announcement.title}</h4>
        </div>

        {announcement.isClosable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le popup"
            className="rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {announcement.message && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{announcement.message}</p>}

      {announcement.action && (
        <div className="mt-4 flex justify-end">
          <a
            href={announcement.action.url}
            target={announcement.action.target}
            rel={announcement.action.target === "_blank" ? "noreferrer" : undefined}
            onClick={onAction}
            className={["inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold transition-all", styleConfig.button].join(" ")}
          >
            {announcement.action.label}
          </a>
        </div>
      )}
    </motion.div>
  );
}