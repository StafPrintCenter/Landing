import { type FormationTheme, FORMATION_THEMES, DISCIPLINE_COLORS } from "@/data/categories";
export type { FormationTheme };
export { FORMATION_THEMES, DISCIPLINE_COLORS };

export type FormationProgramStep = {
  title: string;
  items: string[];
};

export type FormationLevel = "Débutant" | "Intermédiaire" | "Avancé";

export type APIFormation = {
  id: string;
  title: string;
  theme: FormationTheme;
  duration: string;
  durationHours: number;
  level: FormationLevel;
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
