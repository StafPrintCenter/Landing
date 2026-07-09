import { type ProjectCategory, PROJECT_CATEGORIES, DISCIPLINE_COLORS } from "@/data/categories";
export type { ProjectCategory };
export { PROJECT_CATEGORIES, DISCIPLINE_COLORS };

export type APIProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  client: string;
  cover: string;
  description: string;
};

export function getDisciplineColor(category: string): string {
  return DISCIPLINE_COLORS[category as ProjectCategory] || "border-border bg-muted text-muted-foreground";
}