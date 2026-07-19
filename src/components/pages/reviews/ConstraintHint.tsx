import type { APIReviewQuestion } from "@/data/reviews";

interface ConstraintHintProps {
  question: APIReviewQuestion;
}

export function ConstraintHint({ question }: ConstraintHintProps) {
  const rules = question.validationRules;
  const settings = question.settings;

  const hints: string[] = [];

  if (rules?.max_length) hints.push(`${rules.max_length} caractères maximum`);
  if (rules?.min !== undefined && rules?.max !== undefined) hints.push(`Entre ${rules.min} et ${rules.max}`);
  else if (rules?.min !== undefined) hints.push(`Minimum ${rules.min}`);
  else if (rules?.max !== undefined) hints.push(`Maximum ${rules.max}`);
  if (settings?.max_size_kb) hints.push(`Fichier de ${(settings.max_size_kb / 1024).toFixed(1)} Mo maximum`);

  if (hints.length === 0) return null;

  return <p className="mt-1 text-[11px] text-muted-foreground/80">{hints.join(" · ")}</p>;
}