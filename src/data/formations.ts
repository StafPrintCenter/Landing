import { type FormationTheme, FORMATION_THEMES, DISCIPLINE_COLORS } from "@/data/categories";
export type { FormationTheme };
export { FORMATION_THEMES, DISCIPLINE_COLORS };

export type FormationProgramStep = {
  title: string;
  items: string[];
};

export type APIFormation = {
  id: string;
  title: string;
  theme: FormationTheme;
  duration: string;
  durationHours: number;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  price: number;
  short: string;
  audience?: string;
  objectives: string[];
  prerequisites?: string[];
  program?: FormationProgramStep[];
  certification?: string;
  schedule?: string;
};

/**
 * Retourne les classes Tailwind associées à la couleur d'un thème de formation,
 * avec un fallback neutre si le thème n'est pas répertorié.
 */
export function getThemeColor(theme: string): string {
  return DISCIPLINE_COLORS[theme as FormationTheme] || "border-border bg-muted text-muted-foreground";
}

// FAQ statique — ne provient pas de l'API
export const FAQ_FORMATIONS = [
  {
    q: "Les formations sont-elles en présentiel ou en ligne ?",
    a: "Toutes nos formations se déroulent principalement en présentiel dans nos locaux à Porto-Novo pour garantir un suivi pratique de proximité. Toutefois, certains cours théoriques ou coachings avancés peuvent être aménagés en visioconférence si nécessaire."
  },
  {
    q: "Faut-il apporter son propre ordinateur ?",
    a: "Oui, nous recommandons vivement d'apporter votre propre ordinateur portable. Cela vous permet de conserver l'ensemble de vos fichiers, configurations de logiciels et projets de fin d'études directement chez vous. Nous disposons aussi de quelques postes disponibles à la location pour 5 000 FCFA / jour."
  },
  {
    q: "Y a-t-il une attestation à la fin ?",
    a: "Oui, une attestation de formation STAF PRINT CENTER est remise à chaque participant ayant suivi 80% du module."
  },
  {
    q: "Peut-on payer en plusieurs fois ?",
    a: "Oui, pour les formations supérieures à 100 000 FCFA, un paiement en 2 ou 3 tranches est possible."
  },
  {
    q: "Que se passe-t-il si je manque une séance ?",
    a: "Les supports de cours vous sont transmis après chaque séance. En cas d'absence ponctuelle, un rattrapage peut être organisé selon les disponibilités du formateur.",
  },
  {
    q: "Puis-je suivre une formation sans aucune connaissance préalable ?",
    a: "Oui, les formations marquées niveau Débutant ne demandent aucun prérequis technique. Pour les niveaux Intermédiaire et Avancé, consultez la section Prérequis de chaque fiche formation.",
  },
  {
    q: "Les logiciels utilisés sont-ils fournis ?",
    a: "Nos postes sont équipés des logiciels nécessaires (suite Adobe, WordPress, etc.). Si vous venez avec votre propre ordinateur, une licence ou version d'essai du logiciel concerné est requise.",
  },
  {
    q: "Y a-t-il un accompagnement après la formation ?",
    a: "Les anciens participants restent dans un groupe d'entraide et peuvent solliciter un accompagnement ponctuel pour leurs premiers projets, selon disponibilité.",
  },
  {
    q: "Comment s'inscrire à une session ?",
    a: "L'inscription se fait via WhatsApp ou par e-mail. Une session est confirmée dès que le nombre minimum de participants est atteint.",
  },
];