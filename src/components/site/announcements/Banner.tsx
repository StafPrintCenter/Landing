import { X } from "lucide-react";
import { motion } from "framer-motion";
import { type APIAnnouncement, getAnnouncementBarClasses, getAnnouncementIcon } from "@/data/announcements";

interface AnnouncementBannerProps {
  announcement: APIAnnouncement;
  onClose: () => void;
  onAction: () => void;
}

export function AnnouncementBanner({ announcement, onClose, onAction }: AnnouncementBannerProps) {
  const Icon = getAnnouncementIcon(announcement.icon);
  const isBottom = announcement.position === "bottom";

  return (
    <motion.div
      initial={{ y: isBottom ? 40 : -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: isBottom ? 40 : -40, opacity: 0 }}
      className={[
        "fixed inset-x-0 z-40 border-b",
        isBottom ? "bottom-0" : "top-16",
        getAnnouncementBarClasses(announcement.style),
      ].join(" ")}
    >
      <div className="container-x flex flex-wrap items-center justify-center gap-3 py-2.5 text-center text-sm">
        <Icon size={16} className="shrink-0" />
        <p>
          <strong className="font-semibold">{announcement.title}</strong>
          {announcement.message && <span className="ml-1.5 opacity-90">{announcement.message}</span>}
        </p>

        {announcement.action && (
          <a
            href={announcement.action.url}
            target={announcement.action.target}
            rel={announcement.action.target === "_blank" ? "noreferrer" : undefined}
            onClick={onAction}
            className="shrink-0 font-semibold underline underline-offset-2 hover:opacity-80"
          >
            {announcement.action.label}
          </a>
        )}

        {announcement.isClosable && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer l'annonce"
            className="shrink-0 rounded-full p-1 hover:bg-black/10 cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </motion.div >
  );
}