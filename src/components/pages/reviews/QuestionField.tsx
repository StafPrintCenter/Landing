import { ConstraintHint } from "./ConstraintHint";
import type { APIReviewQuestion } from "@/data/reviews";

interface QuestionFieldProps {
  question: APIReviewQuestion;
  error?: string;
  children: React.ReactNode;
}

export function QuestionField({ question, error, children }: QuestionFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {question.title} {question.isRequired && <span className="text-destructive">*</span>}
      </label>
      {question.description && <p className="mt-0.5 text-xs text-muted-foreground">{question.description}</p>}
      <div className="mt-2">{children}</div>
      <ConstraintHint question={question} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}