import * as LucideIcons from "lucide-react";
import { type ServiceCategory, SERVICE_CATEGORIES } from "@/data/categories";
import { type ProjectCategory } from "@/data/projects";
export { SERVICE_CATEGORIES };

export type ServiceProcessStep = {
  step: string;
  text: string;
};

export type APIService = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  short: string;
  long: string;
  category: ServiceCategory;
  projectCategory: ProjectCategory;
  featured: boolean;
  color: string;
  features: string[];
  process: ServiceProcessStep[] | null;
};

// 💡 Process par défaut
export const DEFAULT_PROCESS: ServiceProcessStep[] = [
  { step: "Brief", text: "On écoute vos besoins et vos contraintes." },
  { step: "Devis", text: "Proposition claire sous 24h." },
  { step: "Production", text: "On exécute avec rigueur et créativité." },
  { step: "Livraison", text: "Vérification, ajustements, remise finale." },
];

/**
 * Sécurise la récupération du process d'un service
 */
export function getServiceProcess(service: APIService): ServiceProcessStep[] {
  if (service.process && service.process.length > 0) {
    return service.process;
  }
  return DEFAULT_PROCESS;
}

/**
 * Associe dynamiquement une chaîne de caractères à un composant Lucide.
 */
export function getServiceIcon(iconName: string): LucideIcons.LucideIcon {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle;
}
