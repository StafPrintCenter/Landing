import logos from "@/assets/logos.json";
import { SITE } from "@/data/site";

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
    id: "website",
    name: "Site web",
    description: `Le site principal de ${SITE.name} : services, réalisations, formations, blog et contact.`,
    url: SITE.url,
    logoKey: "mc",
    category: "principal",
    isCurrent: true,
  },
  {
    id: "shortener",
    name: "SPC Shortener",
    description: `Raccourcisseur de liens officiel, réservé exclusivement aux contenus de ${SITE.name}.`,
    url: SITE.shortUrl,
    logoKey: "shortener",
    category: "outil",
  },
  {
    id: "teacher-space",
    name: "Espace Formateur",
    description: "Portail dédié aux formateurs pour la gestion de leurs sessions et de leurs apprenants.",
    url: SITE.url,
    logoKey: "instructor",
    category: "formation",
  },
  {
    id: "student-space",
    name: "Espace Apprenant",
    description: `Portail dédié aux étudiants inscrits aux formations ${SITE.name}.`,
    url: SITE.url,
    logoKey: "student",
    category: "formation",
  },
  {
    id: "meet",
    name: "SPC Meet",
    description: `Plateforme de visioconférence pour les réunions et sessions à distance de ${SITE.name}.`,
    url: SITE.url,
    logoKey: "meet",
    category: "communication",
  },
  {
    id: "arcade",
    name: "SPC Arcade",
    description: `Hub de jeux interactifs pour se divertir tout en développant ses compétences techniques.`,
    url: SITE.url,
    logoKey: "arcarde",
    category: "communication",
  },
  {
    id: "documentation",
    name: "Documentation officielle",
    description: `Guides, procédures et ressources techniques de ${SITE.name}.`,
    url: SITE.docsUrl,
    logoKey: "docs",
    category: "outil",
  },
];