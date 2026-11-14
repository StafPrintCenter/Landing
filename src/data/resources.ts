import { BookOpen, LayoutTemplate, Wrench, type LucideIcon } from "lucide-react";

export type ResourceCategory = "Gabarit" | "Guide" | "Outil";

type Resource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  icon?: LucideIcon;
  price: number;
  originalPrice?: number;
  status?: string;
  short: string;
  description: string;
  format: string;
  meta: string;
  includes: string[];
  outcomes: string[];
  audience: string;
  requirements: string[];
  license: string;
};

export type APIResource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  price: number;
  originalPrice: number | null;
  discountPercentage: number;
  status: string;
  short: string;
  format: string;
  meta: string;
  viewsCount: number;
  downloadsCount: number;
  description?: string;
  includes?: string[];
  outcomes?: string[];
  audience?: string;
  requirements?: string[];
  license?: string;
  downloadUrl?: string | null;
  downloadFileName?: string | null;
  createdAt: string;
  updatedAt: string;
};

export const CATEGORY_ICONS: Record<ResourceCategory, LucideIcon> = {
  Gabarit: LayoutTemplate,
  Guide: BookOpen,
  Outil: Wrench,
};

export const DEFAULT_RESOURCE_STATUS = "Prêt à l'emploi";

export function getResourceIcon(resource: Pick<Resource, "icon" | "category">) {
  return resource.icon ?? CATEGORY_ICONS[resource.category];
}

export function getResourceStatus(resource: Pick<Resource, "status">) {
  return resource.status ?? DEFAULT_RESOURCE_STATUS;
}

/** Pourcentage de réduction arrondi, ou null si pas de promotion valide. */
export function getDiscountPercent(resource: { price: number; originalPrice?: number | null }) {
  const { price, originalPrice } = resource;
  if (!originalPrice || price <= 0 || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function formatResourcePrice(price: number) {
  return price === 0 ? "Gratuit" : `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

