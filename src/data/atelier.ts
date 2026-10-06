import {
  Clock,
  Factory,
  Layers,
  MonitorCheck,
  Printer,
  Ruler,
  Scissors,
  ShieldCheck,
  Stamp,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Machine = {
  name: string;
  icon: LucideIcon;
  spec: string;
  usage: string;
};

export const MACHINES: Machine[] = [
  {
    name: "Presse numérique couleur",
    icon: Printer,
    spec: "A3+ · 1 200 × 4 800 dpi",
    usage:
      "Cartes de visite, flyers, brochures et petits tirages avec une régularité de couleur parfaite d'un lot à l'autre.",
  },
  {
    name: "Traceur grand format",
    icon: Ruler,
    spec: "Laize 1,60 m · encres tenaces",
    usage:
      "Bâches, roll-up, panneaux, stickers muraux et habillage de vitrine, de la devanture au stand d'exposition.",
  },
  {
    name: "Plotter & table de découpe",
    icon: Scissors,
    spec: "Vinyle, gabarits, pochoirs",
    usage:
      "Lettrage adhésif, numérotation, logos découpés et formes personnalisées au tracé près.",
  },
  {
    name: "Poste de finitions",
    icon: Layers,
    spec: "Plastifieuse · massicot · relieuse",
    usage:
      "Pelliculage, vernis, pliage, reliure et mise sous film pour des supports qui tiennent dans le temps.",
  },
  {
    name: "Presse à badges & tampons",
    icon: Stamp,
    spec: "PVC · métal · nominatif",
    usage:
      "Accréditations d'événements, cartons d'identification d'équipe et cachets d'entreprise en quelques heures.",
  },
  {
    name: "Stations de création",
    icon: MonitorCheck,
    spec: "Écrans étalonnés · profils ICC",
    usage:
      "Nos maquettes sont calibrées pour que la couleur vue à l'écran soit exactement celle du tirage.",
  },
];

export type Expertise = { title: string; text: string };

export const EXPERTISE: Expertise[] = [
  {
    title: "Conception & PAO",
    text: "Identité visuelle, mise en page et visuels prêts à imprimer, livrés en vectoriel et réutilisables par vos équipes.",
  },
  {
    title: "Contrôle de fichier avant tirage",
    text: "Fonds perdus, résolution, aplats, surimpressions : on vérifie tout avant de lancer la machine, pour éviter les mauvaises surprises.",
  },
  {
    title: "Gestion couleur",
    text: "Profils ICC et épreuve systématique : vos teintes de marque ne dérivent pas d'une impression à l'autre.",
  },
  {
    title: "Finitions & assemblage",
    text: "Pelliculage, dorure, œillets, pliage, reliure — nos finitions tiennent en salle de conférence comme sous un auvent de marché.",
  },
  {
    title: "Grand format & pose",
    text: "Œillets, rails, structures roll-up et conseils de pose pour vos façades, stands et campagnes de proximité.",
  },
  {
    title: "Transmission & accompagnement",
    text: "Formations internes, suivi de projet et conseils concrets pour les PME, associations et institutions.",
  },
];

export type Step = { title: string; text: string };

export const PROCESS: Step[] = [
  {
    title: "Brief",
    text: "Vous nous expliquez le besoin, le délai et le budget. Sur place, en ligne ou par WhatsApp.",
  },
  {
    title: "Devis clair",
    text: "Un prix ferme en FCFA, détaillé par support et par finition, qui vous revient sous 24 h.",
  },
  {
    title: "Maquette & validation",
    text: "Vous validez un bon à tirer avant tout lancement de production. Rien n'est imprimé sans votre accord.",
  },
  {
    title: "Production",
    text: "Impression, découpe et finitions enchaînées dans notre atelier, sans sous-traitance lointaine.",
  },
  {
    title: "Contrôle & remise",
    text: "Chaque lot est vérifié, compté, emballé, puis remis à l'atelier ou expédié où vous le souhaitez.",
  },
];

export type Engagement = { title: string; text: string; icon: LucideIcon };

export const ENGAGEMENTS: Engagement[] = [
  {
    title: "Prix fermes en FCFA",
    text: "Le devis annoncé est le prix payé. Pas de supplément découvert à la livraison.",
    icon: ShieldCheck,
  },
  {
    title: "Délais tenus",
    text: "Date de retrait confirmée à la commande, et on vous appelle avant que ça glisse.",
    icon: Clock,
  },
  {
    title: "Production sur place",
    text: "Tout est imprimé, découpé et fini dans notre atelier de Porto-Novo.",
    icon: Factory,
  },
  {
    title: "Équipe formée ici",
    text: "Nos opérateurs sont béninois, formés en interne, et connaissent vos fichiers d'une commande à l'autre.",
    icon: Users,
  },
];

export type Stat = { to: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { to: 7, suffix: " ans", label: "au service des marques béninoises" },
  { to: 480, suffix: "+", label: "projets imprimés et livrés" },
  { to: 120, suffix: "", label: "personnes formées à Porto-Novo" },
  { to: 8, suffix: "", label: "expertises sous un même toit" },
];

export type Milestone = { year: string; title: string; text: string };

export const TIMELINE: Milestone[] = [
  {
    year: "2019",
    title: "Le premier atelier",
    text: "Une presse, un bureau, et les commerçants du quartier comme premiers clients.",
  },
  {
    year: "2021",
    title: "Le grand format",
    text: "Arrivée du traceur 1,60 m : premières bâches, premiers roll-up, premières façades.",
  },
  {
    year: "2023",
    title: "Le virage web",
    text: "Nous concevons nos premiers sites, puis ouvrons les premières sessions de formation.",
  },
  {
    year: "2025",
    title: "Un studio complet",
    text: "Design, impression, web, vidéo et formations réunis sous un même toit.",
  },
];
