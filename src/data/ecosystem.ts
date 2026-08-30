export type EcosystemSiteCategory = "principal" | "outil" | "formation" | "communication" | "divertissement";
export type EcosystemSiteStatus = "available" | "building";

export interface APIEcosystemSite {
  id: string;
  name: string;
  description: string;
  url: string;
  logoKey: string;
  logoBaseUrl: string;
  logoUrl: string;
  logoVariants: {
    mc: string;
    mw: string;
    dc: string;
    dw: string;
  };
  category: EcosystemSiteCategory;
  status: EcosystemSiteStatus;
  createdAt: string;
  updatedAt: string;
}

export const ECOSYSTEM_CATEGORIES: EcosystemSiteCategory[] = [
  "principal",
  "outil",
  "formation",
  "communication",
  "divertissement",
];

export const ECOSYSTEM_CATEGORY_LABELS: Record<EcosystemSiteCategory, string> = {
  principal: "Site principal",
  outil: "Outils",
  formation: "Formation",
  communication: "Communication",
  divertissement: "Divertissement",
};

export const ECOSYSTEM_STATUS_LABELS: Record<EcosystemSiteStatus | "Tout", string> = {
  Tout: "Tous les statuts",
  available: "Disponible",
  building: "Bientôt",
};
