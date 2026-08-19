import { CalendarDays, PackageSearch, Newspaper, Link2, Network, QrCode, FileSignature, Calculator, Download, Users, type LucideIcon } from "lucide-react";
import { SITE } from "@/data/site";

interface ToolBase {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface AvailableTool extends ToolBase {
  actionLabel: string;
  to?: string;
  href?: string;
}

export interface UpcomingTool extends ToolBase {
  statusLabel?: string;
}

export const AVAILABLE_TOOLS: AvailableTool[] = [
  {
    id: "appointment",
    to: "/tools/appointment",
    icon: CalendarDays,
    title: "Prendre rendez-vous",
    desc: "Choisissez un créneau disponible et réservez votre passage en atelier ou en ligne en quelques clics.",
    actionLabel: "Réserver un créneau",
  },
  {
    id: "lookup",
    to: "/tools/lookup",
    icon: PackageSearch,
    title: "Suivre une demande",
    desc: "Entrez votre email et votre numéro de ticket pour connaître l'état de traitement de votre message.",
    actionLabel: "Suivre mon ticket",
  },
  {
    id: "newsletter",
    to: "/tools/newsletter",
    icon: Newspaper,
    title: "Newsletter",
    desc: "Recevez nos actualités, conseils et offres selon vos centres d'intérêt.",
    actionLabel: "Gérer mon abonnement",
  },
  {
    id: "shortener",
    href: SITE.shortUrl,
    icon: Link2,
    title: "Raccourcir un lien",
    desc: "Générez des liens courts et faciles à partager pour simplifier votre communication.",
    actionLabel: "Réduire un lien",
  },
  {
    id: "ecosystem",
    to: "/ecosystem",
    icon: Network,
    title: "Notre écosystème",
    desc: "Découvrez tous nos sites et plateformes : espaces formateur, apprenant, documentation et outils internes.",
    actionLabel: "Explorer l'écosystème",
  },
];

/**
 * ⚠️ Fonctionnalités non encore développées — placeholders à ajuster
 * (titres/descriptions/icônes) au fur et à mesure de leur mise en œuvre réelle.
 */
export const UPCOMING_TOOLS: UpcomingTool[] = [
  {
    id: "qr-generator",
    icon: QrCode,
    title: "Générateur de QR Code",
    desc: "Créez un QR code personnalisé pour vos supports imprimés en quelques secondes.",
    statusLabel: "Bientôt disponible",
  },
  {
    id: "quote-simulator",
    icon: Calculator,
    title: "Simulateur de devis",
    desc: "Estimez rapidement le coût de votre projet d'impression ou de design.",
    statusLabel: "Bientôt disponible",
  },
  {
    id: "e-signature",
    icon: FileSignature,
    title: "Signature électronique",
    desc: "Signez vos devis et contrats directement en ligne, sans impression papier.",
    statusLabel: "Bientôt disponible",
  },
  {
    id: "free-ressources",
    icon: Download,
    title: "Ressources gratuites",
    desc: "Templates et guides à télécharger.",
    statusLabel: "Bientôt disponible",
  },
  {
    id: "affiliation",
    icon: Users,
    title: "Programme de parrainage",
    desc: "Codes de parrainage et paliers de récompenses.",
    statusLabel: "Bientôt disponible",
  },
];