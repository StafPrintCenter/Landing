/**
 * URL de la route WEB Laravel de désinscription — sert uniquement de cible
 * pour un fetch déclenchant l'effet de bord (marquer désinscrit) et renvoyant
 * une page HTML qu'on n'affiche PAS directement : notre propre page front
 * (/tools/newsletter/unsubscribe) affiche sa propre confirmation stylée.
 */
export function buildUnsubscribeBackendUrl(token: string): string {
  const origin = import.meta.env.VITE_API_ORIGIN ?? "http://localhost:8000";
  return `${origin}/newsletter/unsubscribe/${encodeURIComponent(token)}`;
}