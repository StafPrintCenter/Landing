import type { APIReviewQuestion } from "@/data/reviews";

interface ChoiceQuestionProps {
  question: APIReviewQuestion;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export function ChoiceQuestion({ question, value, onChange }: ChoiceQuestionProps) {
  const options = question.options ?? [];

  if (question.type === "select") {
    return (
      <select
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer rounded-lg border border-border bg-background px-4 py-3 text-sm"
      >
        <option value="">— Choisir —</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  }

  if (question.type === "single_choice") {
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              type="button"
              key={o.value}
              onClick={() => onChange(o.value)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }

  // multiple_choice
  const selectedValues = Array.isArray(value) ? value : [];
  const toggle = (v: string) => {
    onChange(selectedValues.includes(v) ? selectedValues.filter((x) => x !== v) : [...selectedValues, v]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selectedValues.includes(o.value);
        return (
          <button
            type="button"
            key={o.value}
            onClick={() => toggle(o.value)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
              }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}