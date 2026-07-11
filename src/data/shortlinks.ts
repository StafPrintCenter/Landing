export type ShortlinkStatus = "active" | "disabled" | string;
export type ShortlinkCategory = "design" | "web" | "print" | "video" | "formation" | "tips" | "news" | "blog" | "newsletter" | "other";

/**
 * Type aligné sur la réponse de l'API publique /shortlinks
 */
export type APIShortlink = {
  id: string;
  alias: string;
  shortUrl: string;
  longUrl: string;
  category: ShortlinkCategory;
  clicksCount: number | null;
  isActive: boolean | null;
  activateAt: string | null;
  expiresAt: string | null;
  status: ShortlinkStatus;
  createdAt: string;
};