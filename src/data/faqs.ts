/**
 * Type aligné sur la réponse de l'API publique /faqs
 */
export type APIFaq = {
  id: string;
  category: string;
  question: string;
  answer: string;
};