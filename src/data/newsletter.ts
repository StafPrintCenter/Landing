export type NewsletterCategoryRef = {
  id: string;
  name: string;
  slug: string;
};

/**
 * Type aligné sur la réponse de l'API publique /newsletter (subscribe, preferences)
 */
export type APINewsletterSubscription = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  categories: NewsletterCategoryRef[];
  isActive: boolean;
  isBlocked: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
  blockedAt: string | null;
  createdAt: string;
  updatedAt: string;
};