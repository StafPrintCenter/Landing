/**
 * Construit l'URL de désinscription — route WEB Laravel (pas /api/...), qui
 * renvoie directement une page HTML de confirmation. Navigation complète,
 * pas un appel fetch : le résultat n'est pas du JSON.
 */
export function buildUnsubscribeUrl(token: string): string {
  const origin = import.meta.env.VITE_API_ORIGIN;
  return `${origin}/newsletter/unsubscribe/${encodeURIComponent(token)}`;
}