import * as Icons from "lucide-react";
import { Megaphone, type LucideIcon } from "lucide-react";

export type AnnouncementType = "banner" | "toast" | "popup" | "modal";
export type AnnouncementPosition =
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";
export type AnnouncementStyle = "info" | "success" | "warning" | "danger" | "neutral";

export type AnnouncementAction = {
  label: string;
  type: string;
  url: string;
  target: "_self" | "_blank";
};

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
 * Thèmes visuels complets pour chaque style (bg, text, border, ring, accents)
 */
export const STYLES_CONFIG: Record<
  AnnouncementStyle,
  {
    banner: string;
    surfaceCard: string;
    accent: string;
    icon: string;
    button: string;
  }
> = {
  success: {
    banner: "bg-emerald-600 text-white border-emerald-700",
    surfaceCard: "border-emerald-500/30 bg-card text-card-foreground shadow-emerald-500/5",
    accent: "bg-emerald-500",
    icon: "text-emerald-500",
    button: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  warning: {
    banner: "bg-amber-500 text-amber-950 border-amber-600",
    surfaceCard: "border-amber-500/30 bg-card text-card-foreground shadow-amber-500/5",
    accent: "bg-amber-500",
    icon: "text-amber-500",
    button: "bg-amber-500 text-amber-950 hover:bg-amber-600",
  },
  danger: {
    banner: "bg-destructive text-destructive-foreground border-destructive/80",
    surfaceCard: "border-destructive/30 bg-card text-card-foreground shadow-destructive/5",
    accent: "bg-destructive",
    icon: "text-destructive",
    button: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  },
  neutral: {
    banner: "bg-muted text-foreground border-border",
    surfaceCard: "border-border bg-card text-card-foreground shadow-black/5",
    accent: "bg-muted-foreground",
    icon: "text-muted-foreground",
    button: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  info: {
    banner: "bg-primary text-primary-foreground border-primary/80",
    surfaceCard: "border-primary/30 bg-card text-card-foreground shadow-primary/5",
    accent: "bg-primary",
    icon: "text-primary",
    button: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
};

/**
 * Mappages précis des positions
 */
export const TOAST_POSITIONS: Record<AnnouncementPosition, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  top: "top-4 left-1/2 -translate-x-1/2",
  bottom: "bottom-4 left-1/2 -translate-x-1/2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export const POPUP_POSITIONS: Record<AnnouncementPosition, string> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-20 right-6",
  "top-left": "top-20 left-6",
  bottom: "bottom-6 left-1/2 -translate-x-1/2",
  top: "top-20 left-1/2 -translate-x-1/2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

/**
 * Dynamic Lucide Icon Resolver
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