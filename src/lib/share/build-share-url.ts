/**
 * Construit une URL absolue partageable.
 */

import { SITE_LINK } from "@/data/site";

export function buildShareUrl(path: string): string {
  // Côté navigateur : utilise l'origine actuelle
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
  }

  // Côté serveur (SSR / Build) : utilise l'URL configurée dans SITE_LINK
  const base = SITE_LINK.landingUrl;

  if (!base) {
    throw new Error("Base URL is not defined (VITE_LANDING_URL inside SITE_LINK is missing)");
  }

  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}
