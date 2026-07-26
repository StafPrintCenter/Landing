import { X } from "lucide-react";
import { motion } from "framer-motion";
import { type APIAnnouncement, getAnnouncementStyleClasses, getAnnouncementIcon } from "@/data/announcements";

interface AnnouncementOverlayProps {
  announcement: APIAnnouncement;
  onClose: () => void;
  onAction: () => void;
}

export function AnnouncementOverlay({ announcement, onClose, onAction }: AnnouncementOverlayProps) {
  const Icon = getAnnouncementIcon(announcement.icon);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 grid place-items-center bg-black/50 p-4"
      onClick={announcement.isClosable ? onClose : undefined}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className={[
          "relative w-full max-w-md rounded-3xl border bg-card p-6 shadow-2xl",
          getAnnouncementStyleClasses(announcement.style),
        ].join(" ")}
      >
        {announcement.isClosable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-black/10 cursor-pointer"
          >
            <X size={16} />
          </button>
        )}

        <Icon size={28} className="mb-3" />
        <h3 className="font-display text-lg font-semibold text-foreground">{announcement.title}</h3>
        {announcement.message && <p className="mt-2 text-sm text-muted-foreground">{announcement.message}</p>}

        {announcement.action && (
          <a
            href={announcement.action.url}
            target={announcement.action.target}
            rel={announcement.action.target === "_blank" ? "noreferrer" : undefined}
            onClick={onAction}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {announcement.action.label}
          </a>
        )}
      </motion.div>
    </motion.div >
  );
}