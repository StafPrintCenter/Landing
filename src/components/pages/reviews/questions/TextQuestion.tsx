import type { APIReviewQuestion } from "@/data/reviews";

interface TextQuestionProps {
  question: APIReviewQuestion;
  value: string;
  onChange: (value: string) => void;
}

export function TextQuestion({ question, value, onChange }: TextQuestionProps) {
  const maxLength = question.validationRules?.max_length;

  if (question.type === "long_text") {
    return (
      <div>
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
        />
        {maxLength && (
          <p className="mt-1 text-right text-[11px] text-muted-foreground">{(value ?? "").length}/{maxLength}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
      />
      {maxLength && (
        <p className="mt-1 text-right text-[11px] text-muted-foreground">{(value ?? "").length}/{maxLength}</p>
      )}
    </div>
  );
}