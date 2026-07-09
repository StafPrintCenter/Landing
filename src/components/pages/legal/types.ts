import type { LucideIcon } from "lucide-react";

export type LegalSection = {
  id: string;
  number: string;
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
};