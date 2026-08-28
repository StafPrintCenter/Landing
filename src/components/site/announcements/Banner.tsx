import { X } from "lucide-react";
import { motion } from "framer-motion";
import {
  type APIAnnouncement,
  STYLES_CONFIG,
  BANNER_POSITIONS,
  getAnnouncementIcon,
} from "@/data/announcements";

interface AnnouncementBannerProps {
  announcement: APIAnnouncement;
  onClose: () => void;
  onAction: () => void;
}

export function AnnouncementBanner({ announcement, onClose, onAction }: AnnouncementBannerProps) {
  const Icon = getAnnouncementIcon(announcement.icon);
  const styleConfig = STYLES_CONFIG[announcement.style] ?? STYLES_CONFIG.info;

  const posKey = announcement.position ?? "top";
  const positionClass = BANNER_POSITIONS[posKey] ?? BANNER_POSITIONS.top;

  // Animation dynamique selon la position
  const isBottom = posKey.includes("bottom");
  const isCenter = posKey === "center";
  const initialY = isCenter ? 0 : isBottom ? 40 : -40;
  const initialScale = isCenter ? 0.95 : 1;

  return (
    <motion.div
      initial={{ y: initialY, scale: initialScale, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: initialY, scale: initialScale, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={[
        "fixed z-40 p-1.5 transition-all",
        positionClass,
        styleConfig.banner,
      ].join(" ")}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-3 py-1.5 text-sm">
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
              title={announcement.action.label}
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