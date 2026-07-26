import * as Icons from "lucide-react";
import { Megaphone, type LucideIcon } from "lucide-react";

export type AnnouncementType = "banner" | "toast" | "popup" | "modal";
export type AnnouncementPosition = | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
export type AnnouncementStyle = "info" | "success" | "warning" | "danger" | "neutral";

export type AnnouncementAction = {
  label: string;
  type: string;
  url: string;
  target: "_self" | "_blank";
};

/**
 * Type aligné sur la réponse de l'API publique /announcements/list
 */
export type APIAnnouncement = {
  id: string;
  type: AnnouncementType;
  position: AnnouncementPosition;
  style: AnnouncementStyle;
  title: string;
  message: string;
  icon: string | null;
  action: AnnouncementAction | null;
  isClosable: boolean;
};

/**
* Style translucide pour la bannière
*/
export function getAnnouncementBarClasses(style: AnnouncementStyle): string {
  switch (style) {
    case "success":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700";
    case "warning":
      return "border-amber-500/30 bg-amber-500/10 text-amber-700";
    case "danger":
      return "border-destructive/30 bg-destructive/10 text-destructive";
    case "neutral":
      return "border-border bg-muted text-foreground";
    case "info":
    default:
      return "border-primary/30 bg-primary/10 text-primary";
  }
}

/**
 * Style opaque pour les surfaces flottantes (Toast, Popup, Modal) : fond plein
 * (bg-card), accent coloré en bordure/icône seulement. Évite tout effet de
 * transparence ou de flou qui laisserait deviner le contenu de la page derrière.
 */
export function getAnnouncementSurfaceClasses(style: AnnouncementStyle): {
  card: string; accent: string; icon: string;
} {
  switch (style) {
    case "success":
      return { card: "border-emerald-500/30 bg-card", accent: "bg-emerald-500", icon: "text-emerald-600" };
    case "warning":
      return { card: "border-amber-500/30 bg-card", accent: "bg-amber-500", icon: "text-amber-600" };
    case "danger":
      return { card: "border-destructive/30 bg-card", accent: "bg-destructive", icon: "text-destructive" };
    case "neutral":
      return { card: "border-border bg-card", accent: "bg-muted-foreground", icon: "text-muted-foreground" };
    case "info":
    default:
      return { card: "border-primary/30 bg-card", accent: "bg-primary", icon: "text-primary" };
  }
}

/**
 * Résout un nom d'icône (ex: "megaphone") vers un composant lucide-react,
 * avec fallback sur Megaphone si le nom est inconnu ou absent
 */
export function getAnnouncementIcon(icon: string | null): LucideIcon {
  if (!icon) return Megaphone;

  const pascalCase = icon
    .split(/[-_]/)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join("");

  const found = (Icons as unknown as Record<string, LucideIcon>)[pascalCase];
  return found ?? Megaphone;
}