import { type Discipline } from "@/data/categories";

/**
 * Type aligné sur la réponse de l'API publique /faqs.
 * category utilise le même référentiel strict que les articles (Discipline).
 */
export type APIFaq = {
  id: string;
  category: Discipline;
  question: string;
  answer: string;
};