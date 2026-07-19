import type { ReviewQuestionType } from "@/data/reviews";

interface DateQuestionProps {
  type: Extract<ReviewQuestionType, "date" | "datetime">;
  value: string;
  onChange: (value: string) => void;
}

export function DateQuestion({ type, value, onChange }: DateQuestionProps) {
  return (
    <input
      type={type === "date" ? "date" : "datetime-local"}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
    />
  );
}