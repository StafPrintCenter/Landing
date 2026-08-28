import { X } from "lucide-react";
import { motion } from "framer-motion";
import { type APIAnnouncement, getAnnouncementSurfaceClasses, getAnnouncementIcon } from "@/data/announcements";

interface AnnouncementToastProps {
  announcement: APIAnnouncement;
  onClose: () => void;
  onAction: () => void;
}

const POSITION_CLASSES: Record<string, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  top: "top-4 left-1/2 -translate-x-1/2",
  bottom: "bottom-4 left-1/2 -translate-x-1/2",
  center: "top-4 left-1/2 -translate-x-1/2",
};

export function AnnouncementToast({ announcement, onClose, onAction }: AnnouncementToastProps) {
  const Icon = getAnnouncementIcon(announcement.icon);
  const { card, accent, icon } = getAnnouncementSurfaceClasses(announcement.style);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      className={[
        "pointer-events-auto fixed z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border shadow-lg",
        POSITION_CLASSES[announcement.position] ?? POSITION_CLASSES["bottom-right"],
        card,
      ].join(" ")}
    >
      <div className={["h-1 w-full", accent].join(" ")} />

      <div className="flex items-start gap-3 p-4">
        <Icon size={18} className={["mt-0.5 shrink-0", icon].join(" ")} />
        <div className="flex-1">
          <p className="font-display text-sm font-semibold text-foreground">{announcement.title}</p>
          {announcement.message && <p className="mt-1 text-xs text-muted-foreground">{announcement.message}</p>}

          {announcement.action && (
            <a
              href={announcement.action.url}
              target={announcement.action.target}
              rel={announcement.action.target === "_blank" ? "noreferrer" : undefined}
              onClick={onAction}
              className="mt-2 inline-block text-xs font-semibold text-primary underline underline-offset-2 hover:opacity-80"
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
            className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </motion.div >
  );
}