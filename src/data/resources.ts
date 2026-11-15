import { BookOpen, LayoutTemplate, Wrench, type LucideIcon } from "lucide-react";

export const RESOURCE_CATEGORIES = ["Gabarit", "Guide", "Outil"] as const;
export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

export type APIResource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  price: number;
  originalPrice: number | null;
  discountPercentage: number;
  cover?: string | null;
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

export function getResourceIcon(resource: Pick<APIResource, "category">): LucideIcon {
  return CATEGORY_ICONS[resource.category];
}

export function formatResourcePrice(price: number) {
  return price === 0 ? "Gratuit" : `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}
