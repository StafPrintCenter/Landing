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
 * Palette visuelle complète par style
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
    banner: "bg-emerald-600 text-white border-emerald-700 shadow-emerald-950/10",
    surfaceCard: "border-emerald-500/30 bg-card text-card-foreground shadow-emerald-500/5",
    accent: "bg-emerald-500",
    icon: "text-emerald-500",
    button: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  warning: {
    banner: "bg-amber-500 text-amber-950 border-amber-600 shadow-amber-950/10",
    surfaceCard: "border-amber-500/30 bg-card text-card-foreground shadow-amber-500/5",
    accent: "bg-amber-500",
    icon: "text-amber-500",
    button: "bg-amber-500 text-amber-950 hover:bg-amber-600",
  },
  danger: {
    banner: "bg-destructive text-destructive-foreground border-destructive/80 shadow-destructive/10",
    surfaceCard: "border-destructive/30 bg-card text-card-foreground shadow-destructive/5",
    accent: "bg-destructive",
    icon: "text-destructive",
    button: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  },
  neutral: {
    banner: "bg-muted text-foreground border-border shadow-black/5",
    surfaceCard: "border-border bg-card text-card-foreground shadow-black/5",
    accent: "bg-muted-foreground",
    icon: "text-muted-foreground",
    button: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  info: {
    banner: "bg-primary text-primary-foreground border-primary/80 shadow-primary/10",
    surfaceCard: "border-primary/30 bg-card text-card-foreground shadow-primary/5",
    accent: "bg-primary",
    icon: "text-primary",
    button: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
};

/**
 * Positions des Bannières (Pleine largeur sur top/bottom, encadrée/flottante sur les coins/centre)
 */
export const BANNER_POSITIONS: Record<AnnouncementPosition, string> = {
  top: "top-20 inset-x-0 border-b",
  bottom: "bottom-0 inset-x-0 border-t",
  "top-left": "top-20 left-4 max-w-xl rounded-2xl border shadow-lg",
  "top-right": "top-20 right-4 max-w-xl rounded-2xl border shadow-lg",
  "bottom-left": "bottom-4 left-4 max-w-xl rounded-2xl border shadow-lg",
  "bottom-right": "bottom-4 right-4 max-w-xl rounded-2xl border shadow-lg",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl rounded-2xl border shadow-xl",
};

/**
 * Positions Toasts
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

/**
 * Positions Popups
 */
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

/**
 * Positions Modales (Alignement de l'overlay flexbox)
 */
export const MODAL_POSITIONS: Record<AnnouncementPosition, string> = {
  top: "items-start justify-center pt-10 md:pt-16",
  bottom: "items-end justify-center pb-10 md:pb-16",
  "top-left": "items-start justify-start p-4 md:p-6",
  "top-right": "items-start justify-end p-4 md:p-6",
  "bottom-left": "items-end justify-start p-4 md:p-6",
  "bottom-right": "items-end justify-end p-4 md:p-6",
  center: "items-center justify-center p-4",
};