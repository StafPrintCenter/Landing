/**
 * Type aligné sur la réponse de l'API publique /categories/list.
 * Contrairement aux disciplines statiques de data/categories.ts, ces catégories
 * viennent avec un vrai UUID — nécessaire pour des usages comme la newsletter
 * où category_ids doit référencer des identifiants réels.
 */
export type APICategory = {
  id: string;
  slug: string;
  name: string;
  colorClass: string;
  isTrainingTheme: boolean;
  isProjectCategory: boolean;
  isArticleCategory: boolean;
  isNewsletterCategory?: boolean;
};