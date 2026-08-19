import { Globe, Link2, BookOpen, GraduationCap, Users, Video, type LucideIcon } from "lucide-react";
import { SITE } from "@/data/site";

export type EcosystemSiteCategory = "principal" | "outil" | "formation" | "communication";

export interface EcosystemSite {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
  category: EcosystemSiteCategory;
  isCurrent?: boolean;
}

export const ECOSYSTEM_CATEGORY_LABELS: Record<EcosystemSiteCategory, string> = {
  principal: "Site principal",
  outil: "Outils",
  formation: "Formation",
  communication: "Communication",
};

export const ECOSYSTEM_SITES: EcosystemSite[] = [
  {
    id: "website",
    name: "Site web",
    description: `Le site principal de ${SITE.name} : services, réalisations, formations, blog et contact.`,
    url: SITE.url,
    icon: Globe,
    category: "principal",
    isCurrent: true,
  },
  {
    id: "shortener",
    name: "SPC Shortener",
    description: `Raccourcisseur de liens officiel, réservé exclusivement aux contenus de ${SITE.name}.`,
    url: SITE.shortUrl,
    icon: Link2,
    category: "outil",
  },
  {
    id: "documentation",
    name: "Documentation officielle",
    description: `Guides, procédures et ressources techniques de ${SITE.name}.`,
    url: SITE.url,
    icon: BookOpen,
    category: "outil",
  },
  {
    id: "teacher-space",
    name: "Espace Formateur",
    description: "Portail dédié aux formateurs pour la gestion de leurs sessions et de leurs apprenants.",
    url: SITE.url,
    icon: GraduationCap,
    category: "formation",
  },
  {
    id: "student-space",
    name: "Espace Apprenant",
    description: `Portail dédié aux étudiants inscrits aux formations ${SITE.name}.`,
    url: SITE.url,
    icon: Users,
    category: "formation",
  },
  {
    id: "meet",
    name: "SPC Meet",
    description: `Plateforme de visioconférence pour les réunions et sessions à distance de ${SITE.name}.`,
    url: SITE.url,
    icon: Video,
    category: "communication",
  },
];