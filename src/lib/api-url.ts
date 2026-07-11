/**
 * Résout une URL d'API relative pour qu'elle fonctionne à la fois côté client (navigateur)
 * et côté serveur (SSR / loaders exécutés sur Node).
 */

export function resolveApiUrl(path: string): string {
  if (typeof window !== "undefined") {
    return path;
  }
  const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? "http://localhost:8000";
  const backendPath = path.replace(/^\/api\//, "/api/v1/");
  return `${apiOrigin}${backendPath}`;
}