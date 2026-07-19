import { Star } from "lucide-react";

interface RatingQuestionProps {
  value: number;
  onChange: (value: number) => void;
}

export function RatingQuestion({ value, onChange }: RatingQuestionProps) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => onChange(n)}
          aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
          className="cursor-pointer"
        >
          <Star size={28} className={n <= value ? "fill-primary text-primary" : "text-muted-foreground/40"} />
        </button>
      ))}
    </div>
  );
}