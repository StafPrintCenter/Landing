export type Discipline = | "Design" | "Web" | "Impression" | "Vidéo" | "Formation" | "Conseils" | "Actus";
export const DISCIPLINES: Discipline[] = ["Design", "Web", "Impression", "Vidéo", "Formation", "Conseils", "Actus",];

export const DISCIPLINE_COLORS: Record<Discipline, string> = {
  Design: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-500/20 border-indigo-500/20",
  Web: "bg-sky-500/10 text-sky-600 dark:text-sky-400 dark:bg-sky-500/20 border-sky-500/20",
  Impression: "bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20 border-amber-500/20",
  Vidéo: "bg-purple-500/10 text-purple-600 dark:text-purple-400 dark:bg-purple-500/20 border-purple-500/20",
  Formation: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20 border-emerald-500/20",
  Conseils: "bg-teal-500/10 text-teal-600 dark:text-teal-400 dark:bg-teal-500/20 border-teal-500/20",
  Actus: "bg-rose-500/10 text-rose-600 dark:text-rose-400 dark:bg-rose-500/20 border-rose-500/20",
};

// Style neutre de repli quand une catégorie ne correspond à aucune discipline connue
// (ex: la catégorie "Service" utilisée pour les résultats de recherche de type service).
const FALLBACK_BADGE_COLOR = "bg-primary/10 text-primary border-primary/20";

/**
 * Retourne la classe de couleur associée à une discipline pour un badge.
 */
export function getDisciplineColorClass(category?: string): string {
  if (category && (DISCIPLINES as string[]).includes(category)) {
    return DISCIPLINE_COLORS[category as Discipline];
  }
  return FALLBACK_BADGE_COLOR;
}

// ── Formations ──
export type FormationTheme = Exclude<Discipline, "Formation" | "Conseils" | "Actus">;

const FORMATION_EXCLUDED: Discipline[] = ["Formation", "Conseils", "Actus"];
export const FORMATION_THEMES: FormationTheme[] = DISCIPLINES.filter(
  (d): d is FormationTheme => !FORMATION_EXCLUDED.includes(d)
);

// ── Projets ──
export type ProjectCategory = Exclude<Discipline, "Conseils" | "Actus">;

const PROJECT_EXCLUDED: Discipline[] = ["Conseils", "Actus"];
export const PROJECT_CATEGORIES: ProjectCategory[] = DISCIPLINES.filter(
  (d): d is ProjectCategory => !PROJECT_EXCLUDED.includes(d)
);

// ── Articles ──
export type ArticleCategory = Discipline;

// ── Services ──
export type ServiceCategory = "impression" | "digital" | "formation";

// Disciplines qui ont un équivalent en tant que famille de service
const SERVICE_RELEVANT_DISCIPLINES: Discipline[] = ["Design", "Web", "Vidéo", "Impression", "Formation"];

export const DISCIPLINE_TO_SERVICE_CATEGORY:
  Record<Exclude<Discipline, "Conseils" | "Actus">,
    ServiceCategory> = {
  Design: "digital",
  Web: "digital",
  Vidéo: "digital",
  Impression: "impression",
  Formation: "formation",
};

const SERVICE_CATEGORY_LABELS:
  Record<ServiceCategory, string> = {
  digital: "Digital",
  impression: "Impression",
  formation: "Formation",
};

// Construit dynamiquement la liste des filtres de service à partir de DISCIPLINES,
export const SERVICE_CATEGORIES: { value: ServiceCategory | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  ...Array.from(
    new Set(
      SERVICE_RELEVANT_DISCIPLINES.map(
        (d) => DISCIPLINE_TO_SERVICE_CATEGORY[d as Exclude<Discipline, "Conseils" | "Actus">]
      )
    )
  ).map((value) => ({ value, label: SERVICE_CATEGORY_LABELS[value] })),
];

// ── Recherche ──
// Source unique pour les types de contenu recherchables.
export type SearchType = "service" | "project" | "formation" | "article";

export const SEARCH_TYPE_LABELS: Record<SearchType, string> = {
  service: "Service",
  project: "Réalisation",
  formation: "Formation",
  article: "Article",
};

export const SEARCH_TYPES: Array<{ value: SearchType | "all"; label: string }> = [
  { value: "all", label: "Tout" },
  ...(Object.keys(SEARCH_TYPE_LABELS) as SearchType[]).map((value) => ({
    value,
    label: `${SEARCH_TYPE_LABELS[value]}s`,
  })),
];

// Couleurs des badges de type
export const SEARCH_TYPE_COLORS: Record<SearchType, string> = {
  service: "bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20 border-blue-500/20",
  project: "bg-orange-500/10 text-orange-600 dark:text-orange-400 dark:bg-orange-500/20 border-orange-500/20",
  formation: "bg-violet-500/10 text-violet-600 dark:text-violet-400 dark:bg-violet-500/20 border-violet-500/20",
  article: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 dark:bg-fuchsia-500/20 border-fuchsia-500/20",
};

export function getSearchTypeColorClass(type: SearchType): string {
  return SEARCH_TYPE_COLORS[type];
}