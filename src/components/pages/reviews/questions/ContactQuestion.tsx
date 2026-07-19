import type { ReviewQuestionType } from "@/data/reviews";

interface ContactQuestionProps {
  type: Extract<ReviewQuestionType, "email" | "phone">;
  value: string;
  onChange: (value: string) => void;
}

export function ContactQuestion({ type, value, onChange }: ContactQuestionProps) {
  return (
    <input
      type={type === "email" ? "email" : "tel"}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={type === "email" ? "vous@exemple.com" : "+229 …"}
      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
    />
  );
}