import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useAnnouncementsStore, trackAnnouncementEvent } from "@/stores/useAnnouncementsStore";
import { getVisitorId } from "@/lib/announces/visitor";
import { getDismissedAnnouncementIds, dismissAnnouncement } from "@/lib/announces/storage";
import { type APIAnnouncement } from "@/data/announcements";
import {
  AnnouncementBanner,
  AnnouncementToast,
  AnnouncementOverlay
} from "./";

export function AnnouncementsHost() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { announcements } = useAnnouncementsStore(pathname);

  const [dismissedIds, setDismissedIds] = useState<string[]>(() => getDismissedAnnouncementIds());

  const visible = useMemo(
    () => announcements.filter((a) => !dismissedIds.includes(a.id)),
    [announcements, dismissedIds]
  );

  // Enregistre un événement "view" une seule fois par annonce affichée
  useEffect(() => {
    const visitorId = getVisitorId();
    visible.forEach((a) => trackAnnouncementEvent(a.id, "view", pathname, visitorId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible.map((a) => a.id).join(",")]);

  function handleClose(announcement: APIAnnouncement) {
    dismissAnnouncement(announcement.id);
    setDismissedIds((prev) => [...prev, announcement.id]);
    trackAnnouncementEvent(announcement.id, "close", pathname, getVisitorId());
  }

  function handleAction(announcement: APIAnnouncement) {
    trackAnnouncementEvent(announcement.id, "click", pathname, getVisitorId());
  }

  const banners = visible.filter((a) => a.type === "banner");
  const toasts = visible.filter((a) => a.type === "toast");
  const overlays = visible.filter((a) => a.type === "popup" || a.type === "modal");

  return (
    <>
      <AnimatePresence>
        {banners.map((a) => (
          <AnnouncementBanner key={a.id} announcement={a} onClose={() => handleClose(a)} onAction={() => handleAction(a)} />
        ))}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {toasts.map((a) => (
            <AnnouncementToast key={a.id} announcement={a} onClose={() => handleClose(a)} onAction={() => handleAction(a)} />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {overlays.map((a) => (
          <AnnouncementOverlay key={a.id} announcement={a} onClose={() => handleClose(a)} onAction={() => handleAction(a)} />
        ))}
      </AnimatePresence>
    </>
  );
}