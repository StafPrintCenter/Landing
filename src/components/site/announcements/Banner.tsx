import { X } from "lucide-react";
import { motion } from "framer-motion";
import { type APIAnnouncement, STYLES_CONFIG, getAnnouncementIcon } from "@/data/announcements";

interface AnnouncementBannerProps {
  announcement: APIAnnouncement;
  onClose: () => void;
  onAction: () => void;
}

export function AnnouncementBanner({ announcement, onClose, onAction }: AnnouncementBannerProps) {
  const Icon = getAnnouncementIcon(announcement.icon);
  const isBottom = announcement.position === "bottom";
  const styleConfig = STYLES_CONFIG[announcement.style] ?? STYLES_CONFIG.info;

  return (
    <motion.div
      initial={{ y: isBottom ? 50 : -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: isBottom ? 50 : -50, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={[
        "fixed inset-x-0 z-40 border-b shadow-sm",
        isBottom ? "bottom-0" : "top-20",
        styleConfig.banner,
      ].join(" ")}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 text-sm">
        <div className="flex flex-1 items-center justify-center gap-2 text-center md:justify-start">
          <Icon size={18} className="shrink-0 opacity-90" />
          <p className="line-clamp-2">
            <strong className="font-semibold">{announcement.title}</strong>
            {announcement.message && <span className="ml-2 opacity-90">{announcement.message}</span>}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 mx-auto md:mx-0">
          {announcement.action && (
            <a
              href={announcement.action.url}
              target={announcement.action.target}
              rel={announcement.action.target === "_blank" ? "noreferrer" : undefined}
              onClick={onAction}
              className="font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              {announcement.action.label}
            </a>
          )}

          {announcement.isClosable && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer l'annonce"
              className="rounded-full p-1 hover:bg-black/10 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}