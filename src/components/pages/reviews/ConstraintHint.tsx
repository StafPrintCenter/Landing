import type { APIReviewQuestion } from "@/data/reviews";

interface ConstraintHintProps {
  question: APIReviewQuestion;
  currentLength?: number;
}

export function ConstraintHint({ question, currentLength }: ConstraintHintProps) {
  const rules = question.validationRules;
  const settings = question.settings;

  const hints: string[] = [];

  if (rules?.max_length) hints.push(`${rules.max_length} caractères maximum`);
  if (rules?.min !== undefined && rules?.max !== undefined) hints.push(`Entre ${rules.min} et ${rules.max}`);
  else if (rules?.min !== undefined) hints.push(`Minimum ${rules.min}`);
  else if (rules?.max !== undefined) hints.push(`Maximum ${rules.max}`);
  if (settings?.max_size_kb) hints.push(`Fichier de ${(settings.max_size_kb / 1024).toFixed(1)} Mo maximum`);

  const maxLength = rules?.max_length;
  if (hints.length === 0 && maxLength === undefined) return null;

  return (
    <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground/80">
      {/* Contraintes de validation à gauche */}
      <span>{hints.join(" · ")}</span>

      {/* Compteur dynamique de saisie à droite */}
      {maxLength !== undefined && (
        <span className="ml-2 shrink-0 font-mono">
          {currentLength ?? 0}/{maxLength}
        </span>
      )}
    </div>
  );
}