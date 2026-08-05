const DISMISSED_KEY = "spc_dismissed_announcements";

/**
 * Annonces fermées par l'utilisateur pendant la session courante (sessionStorage :
 * elles réapparaissent après fermeture de l'onglet, contrairement au visitor_id)
 */
export function getDismissedAnnouncementIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.sessionStorage.getItem(DISMISSED_KEY) || "[]");
  } catch {
    return [];
  }
}

export function dismissAnnouncement(id: string): void {
  if (typeof window === "undefined") return;
  const current = getDismissedAnnouncementIds();
  window.sessionStorage.setItem(DISMISSED_KEY, JSON.stringify([...current, id]));
}