/**
 * Construit une URL absolue partageable.
 */

import { SITE } from "@/data/site";

export function buildShareUrl(path: string) {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }

  const base =
    (SITE as { url?: string }).url ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL;

  if (!base) {
    throw new Error("Base URL is not defined (SITE.url or env URL missing)");
  }

  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
}
