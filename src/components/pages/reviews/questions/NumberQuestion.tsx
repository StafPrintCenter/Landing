import type { APIReviewQuestion } from "@/data/reviews";

interface NumberQuestionProps {
  question: APIReviewQuestion;
  value: string;
  onChange: (value: string) => void;
}

export function NumberQuestion({ question, value, onChange }: NumberQuestionProps) {
  return (
    <input
      type="number"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      min={question.validationRules?.min}
      max={question.validationRules?.max}
      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
    />
  );
}