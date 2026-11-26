import { CalendarDays, Download, Link2, Network, Newspaper, PackageSearch, Sparkles, type LucideIcon } from "lucide-react";
import { SITE_LINK } from "@/data/site";

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
    href: SITE_LINK.shortUrl,
    icon: Link2,
    title: "Raccourcir un lien",
    desc: "Générez des liens courts et faciles à partager pour simplifier votre communication.",
    actionLabel: "Réduire un lien",
  },
  {
    id: "ai",
    href: SITE_LINK.aiUrl,
    icon: Sparkles,
    title: "SPC Intelligence",
    desc: "Discutez avec notre assistant IA pour obtenir des informations, explorer nos services et trouver rapidement les réponses à vos besoins.",
    actionLabel: "Discuter avec l'IA",
  },
  {
    id: "ressources",
    to: "/tools/ressources",
    icon: Download,
    title: "Ressources & templates",
    desc: "Bibliothèque de ressources gratuites et premium avec fiches détaillées.",
    actionLabel: "Parcourir les ressources",
  },
  {
    id: "ecosystem",
    to: "/tools/ecosystem",
    icon: Network,
    title: "Notre écosystème",
    desc: "Découvrez tous nos sites et plateformes : espaces formateur, apprenant, documentation et outils internes.",
    actionLabel: "Explorer l'écosystème",
  },
];