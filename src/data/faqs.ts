import { type Discipline } from "@/data/categories";

export type APIFaq = {
  id: string;
  category: Discipline;
  question: string;
  answer: string;
};

export function shuffleFaqs(faqs: APIFaq[]): APIFaq[] {
  const shuffled = [...faqs];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}