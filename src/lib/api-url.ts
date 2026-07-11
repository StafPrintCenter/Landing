/**
 * Résout une URL d'API relative pour qu'elle fonctionne à la fois côté client (navigateur)
 * et côté serveur (SSR / loaders exécutés sur Node).
 *
 * Côté client : le chemin relatif est retourné tel quel — le navigateur le résout contre
 * l'origine courante, et un éventuel proxy de dev (Vite) s'applique normalement.
 *
 * Côté serveur : `fetch` n'a pas de "window.location" pour fournir une origine implicite,
 * donc un chemin relatif fait planter le parsing d'URL. On préfixe alors avec une URL absolue.
 */
export function resolveApiUrl(path: string): string {
  if (typeof window !== "undefined") {
    return path;
  }
  const base = import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_SITE_URL ?? "http://localhost:3000";
  return `${base}${path}`;
}