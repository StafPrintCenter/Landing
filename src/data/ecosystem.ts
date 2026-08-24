import logos from "@/assets/logos.json";
import { SITE, SITE_LINK } from "@/data/site";

export type EcosystemSiteCategory = "principal" | "outil" | "formation" | "communication" | "divertissement";

export interface EcosystemSite {
  id: string;
  name: string;
  description: string;
  url: string;
  logoKey: keyof typeof logos;
  category: EcosystemSiteCategory;
  isCurrent?: boolean;
}

export const ECOSYSTEM_CATEGORY_LABELS: Record<EcosystemSiteCategory, string> = {
  principal: "Site principal",
  outil: "Outils",
  formation: "Formation",
  communication: "Communication",
  divertissement: "Divertissement",
};

export const ECOSYSTEM_SITES: EcosystemSite[] = [
  {
    id: "landing",
    name: "Site vitrine",
    description: `Le site principal de ${SITE.name} : services, réalisations, formations, blog et contact.`,
    url: SITE_LINK.landingUrl,
    logoKey: "mc",
    category: "principal",
    isCurrent: true,
  },
  {
    id: "shortener",
    name: "SPC Shortener",
    description: `Raccourcisseur de liens officiel, réservé exclusivement aux contenus de ${SITE.name}.`,
    url: SITE_LINK.shortUrl,
    logoKey: "shortener",
    category: "outil",
  },
  {
    id: "instructor",
    name: "Espace Formateur",
    description: "Portail dédié aux formateurs pour la gestion de leurs sessions et de leurs apprenants.",
    url: SITE_LINK.landingUrl,
    logoKey: "instructor",
    category: "formation",
  },
  {
    id: "student",
    name: "Espace Apprenant",
    description: `Portail dédié aux étudiants inscrits aux formations ${SITE.name}.`,
    url: SITE_LINK.landingUrl,
    logoKey: "student",
    category: "formation",
  },
  {
    id: "meet",
    name: "SPC Meet",
    description: `Plateforme de visioconférence pour les réunions et sessions à distance de ${SITE.name}.`,
    url: SITE_LINK.landingUrl,
    logoKey: "meet",
    category: "communication",
  },
  {
    id: "arcade",
    name: "SPC Arcade",
    description: `Hub de jeux interactifs pour se divertir tout en développant ses compétences techniques.`,
    url: SITE_LINK.arcadeUrl,
    logoKey: "arcade",
    category: "divertissement",
  },
  {
    id: "documentation",
    name: "Documentation officielle",
    description: `Guides, procédures et ressources techniques de ${SITE.name}.`,
    url: SITE_LINK.docsUrl,
    logoKey: "docs",
    category: "outil",
  },
];