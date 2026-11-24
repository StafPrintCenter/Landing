import { X } from "lucide-react";
import { motion } from "framer-motion";
import { type APIAnnouncement, STYLES_CONFIG, TOAST_POSITIONS, getAnnouncementIcon } from "@/data/announcements";

interface AnnouncementToastProps {
  announcement: APIAnnouncement;
  onClose: () => void;
  onAction: () => void;
}

export function AnnouncementToast({ announcement, onClose, onAction }: AnnouncementToastProps) {
  const Icon = getAnnouncementIcon(announcement.icon);
  const styleConfig = STYLES_CONFIG[announcement.style] ?? STYLES_CONFIG.info;
  const positionClass = TOAST_POSITIONS[announcement.position] ?? TOAST_POSITIONS["bottom-right"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      className={[
        "pointer-events-auto fixed z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-l-4 shadow-md backdrop-blur-md transition-all",
        positionClass,
        styleConfig.surfaceCard,
      ].join(" ")}
      style={{ borderLeftColor: "currentColor" }}
    >
      <div className="flex items-start gap-2.5 p-3">
        <Icon size={18} className={["mt-0.5 shrink-0", styleConfig.icon].join(" ")} />

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-foreground leading-snug wrap-break-word">
            {announcement.title}
          </p>

          {announcement.message && (
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed wrap-break-word">
              {announcement.message}
            </p>
          )}

          {announcement.action && (
            <a
              href={announcement.action.url}
              target={announcement.action.target}
              rel={announcement.action.target === "_blank" ? "noreferrer" : undefined}
              onClick={onAction}
              className="mt-2 inline-block text-[11px] font-semibold text-primary underline underline-offset-2 hover:opacity-80 wrap-break-word"
            >
              {announcement.action.label}
            </a>
          )}
        </div>

        {announcement.isClosable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la notification"
            className="shrink-0 rounded-md p-0.5 text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </motion.div>
  );
}