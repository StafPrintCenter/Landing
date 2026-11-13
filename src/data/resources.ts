import { BookOpen, LayoutTemplate, Wrench, type LucideIcon } from "lucide-react";

export type ResourceCategory = "Gabarit" | "Guide" | "Outil";

export type Resource = {
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

export const RESOURCES: Resource[] = [
  {
    slug: "gabarit-carte-visite-85x55",
    status: "Prêt à imprimer",
    title: "Gabarit carte de visite 85 × 55 mm",
    category: "Gabarit",
    price: 0,
    short: "Un fichier propre aux bonnes dimensions, avec fond perdu et marges de sécurité.",
    description:
      "Préparez une carte de visite prête pour l'impression sans repartir d'une page blanche. Le gabarit vous aide à placer correctement vos textes, votre logo et les zones de coupe.",
    format: "PDF · AI",
    meta: "Recto & verso",
    includes: ["Format fini 85 × 55 mm", "Fond perdu de 3 mm", "Marges de sécurité visibles", "Versions recto et verso", "Repères de coupe"],
    outcomes: ["Positionner vos éléments sans risque de coupe", "Exporter un fichier conforme pour l'imprimeur", "Gagner du temps sur la mise en page"],
    audience: "Entrepreneurs, graphistes débutants et communications qui préparent leurs cartes de visite.",
    requirements: ["Adobe Illustrator pour modifier le fichier AI", "Un lecteur PDF pour consulter le gabarit"],
    license: "Usage personnel et commercial autorisé. La revente ou le partage public du fichier source est interdit.",
  },
  {
    slug: "choisir-couleurs-de-marque",
    status: "Lecture 15 min",
    title: "Choisir ses couleurs de marque",
    category: "Guide",
    price: 2500,
    short: "Une méthode simple pour construire une palette cohérente et mémorable.",
    description:
      "Un guide pratique pour passer d'une collection de couleurs à une véritable palette de marque. Vous apprendrez à définir les couleurs principales, secondaires et fonctionnelles de votre identité.",
    format: "PDF",
    meta: "12 pages",
    includes: ["La signification des grandes familles de couleurs", "Une méthode de sélection en 4 étapes", "Les règles de contraste et de lisibilité", "Des exemples de palettes commentées", "Une fiche pour documenter vos codes couleurs"],
    outcomes: ["Créer une palette de 4 à 6 couleurs", "Choisir des associations lisibles sur écran et en print", "Documenter vos couleurs pour toute l'équipe"],
    audience: "Créateurs de marque, entrepreneurs, community managers et designers qui veulent structurer leur identité visuelle.",
    requirements: ["Aucun logiciel de création requis", "Un lecteur PDF"],
    license: "Licence individuelle. Utilisation sur vos propres projets et ceux de vos clients. Redistribution interdite.",
  },
  {
    slug: "kit-kakemono-85x200",
    status: "Prêt à personnaliser",
    title: "Kit kakémono 85 × 200 cm",
    category: "Gabarit",
    price: 3000,
    originalPrice: 5000,
    short: "Un modèle professionnel à personnaliser pour vos stands et événements.",
    description:
      "Concevez un kakémono lisible de loin et techniquement prêt pour la production. Le kit organise les zones importantes et vous évite de placer un logo ou un texte dans une zone masquée par la structure.",
    format: "PSD · AI",
    meta: "3 mises en page",
    includes: ["Format 85 × 200 cm à l'échelle", "Zone de sécurité et encombrement du mécanisme", "Trois compositions de départ", "Hiérarchie titre, visuel et contact", "Guide d'export pour l'impression"],
    outcomes: ["Créer un visuel lisible à plusieurs mètres", "Adapter rapidement trois directions graphiques", "Préparer un fichier exploitable par l'atelier"],
    audience: "Designers, responsables événementiels et entreprises qui préparent un stand, une conférence ou une exposition.",
    requirements: ["Adobe Photoshop ou Adobe Illustrator", "Notions de base sur les calques et l'export PDF"],
    license: "Utilisation illimitée sur vos projets commerciaux. Revente du modèle, même modifié, interdite.",
  },
  {
    slug: "reussir-son-brief-design",
    status: "Checklist à remplir",
    title: "Réussir son brief design",
    category: "Guide",
    price: 0,
    short: "Les bonnes questions pour obtenir une proposition créative vraiment utile.",
    description:
      "Une checklist courte pour clarifier votre besoin avant de contacter un designer. Elle vous aide à formuler vos objectifs, votre audience, vos contraintes et les livrables attendus.",
    format: "PDF",
    meta: "6 pages",
    includes: ["Les 10 questions d'un brief utile", "Une trame d'objectifs et de messages", "La liste des éléments à fournir", "Une checklist de validation finale"],
    outcomes: ["Exprimer clairement votre besoin", "Réduire les allers-retours inutiles", "Comparer plus facilement les propositions reçues"],
    audience: "Porteurs de projet, associations, commerçants et responsables communication.",
    requirements: ["Un lecteur PDF", "Aucune compétence en design nécessaire"],
    license: "Usage personnel et professionnel autorisé. Vous pouvez partager le brief rempli avec vos prestataires.",
  },
  {
    slug: "checklist-site-web-performant",
    status: "Nouveauté 2026",
    title: "Checklist site web performant",
    category: "Outil",
    price: 0,
    short: "20 points à contrôler avant de mettre votre site en ligne.",
    description:
      "Passez en revue les essentiels d'un site professionnel : contenu, mobile, vitesse, référencement, sécurité et mesure d'audience. Chaque point est formulé pour être vérifié sans jargon inutile.",
    format: "PDF",
    meta: "20 contrôles",
    includes: ["Contrôles contenu et identité visuelle", "Vérifications mobile et accessibilité", "Essentiels SEO et partage social", "Points de sécurité et de confidentialité", "Checklist finale avant publication"],
    outcomes: ["Repérer les oublis avant la mise en ligne", "Prioriser les corrections importantes", "Préparer une recette plus rigoureuse"],
    audience: "Entrepreneurs, développeurs, intégrateurs et chefs de projet web.",
    requirements: ["Un lecteur PDF", "Un accès au site ou à sa version de préproduction"],
    license: "Utilisation libre dans vos projets personnels, internes et clients. Revente interdite.",
  },
  {
    slug: "gabarit-flyer-a5",
    status: "Prêt à personnaliser",
    title: "Gabarit flyer A5 recto-verso",
    category: "Gabarit",
    price: 3500,
    short: "Deux compositions professionnelles avec marges et fond perdu inclus.",
    description:
      "Un point de départ structuré pour créer un flyer A5 équilibré. Les deux mises en page vous aident à organiser une offre, un événement ou une campagne promotionnelle sans sacrifier la lisibilité.",
    format: "PDF · INDD",
    meta: "2 compositions",
    includes: ["Format A5 avec fond perdu de 3 mm", "Recto et verso", "Deux compositions modifiables", "Styles de titres et de textes", "Guide d'export PDF pour l'impression"],
    outcomes: ["Mettre en page une offre claire et attractive", "Adapter le flyer à votre identité", "Produire un PDF prêt pour l'atelier"],
    audience: "Graphistes, communicants, organisateurs d'événements et commerçants.",
    requirements: ["Adobe InDesign pour modifier les sources", "Polices à remplacer par celles de votre marque"],
    license: "Utilisation commerciale autorisée sur un nombre illimité de projets. Redistribution des sources interdite.",
  },
];

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
export function getDiscountPercent(resource: Pick<Resource, "price" | "originalPrice">) {
  const { price, originalPrice } = resource;
  if (!originalPrice || price <= 0 || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function formatResourcePrice(price: number) {
  return price === 0 ? "Gratuit" : `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
}

export function getResource(slug: string) {
  return RESOURCES.find((resource) => resource.slug === slug);
}
