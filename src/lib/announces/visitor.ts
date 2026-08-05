const VISITOR_ID_KEY = "spc_visitor_id";

/**
 * Retourne un identifiant visiteur anonyme et stable sur l'appareil (UUID généré
 * côté client, stocké en localStorage). Ne contient aucune donnée personnelle.
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  let visitorId = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}