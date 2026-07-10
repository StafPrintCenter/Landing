import { type Discipline } from "@/data/categories";

export type APIFaq = {
  id: string;
  category: Discipline;
  question: string;
  answer: string;
};