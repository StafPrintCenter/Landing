import { type ArticleCategory, DISCIPLINES, DISCIPLINE_COLORS } from "@/data/categories";
export type { ArticleCategory };
export { DISCIPLINE_COLORS };
export const ARTICLE_CATEGORIES: ArticleCategory[] = DISCIPLINES;

/**
 * Type aligné sur la réponse de l'API publique /articles
 */
export type APIArticle = {
  slug: string;
  title: string;
  author: string;
  category: ArticleCategory;
  date: string;
  readMinutes: number;
  excerpt: string;
  cover: string;
  body?: string;
};

/**
 * Retourne les classes Tailwind associées à la couleur d'une catégorie d'article,
 * avec un fallback neutre si la catégorie n'est pas répertoriée.
 */
export function getArticleCategoryColor(category: string): string {
  return DISCIPLINE_COLORS[category as ArticleCategory] || "border-border bg-muted text-muted-foreground";
}

/**
 * Formatte une date ISO en date lisible française
 */
export function formatArticleDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}