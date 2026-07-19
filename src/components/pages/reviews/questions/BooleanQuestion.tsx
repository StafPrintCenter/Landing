interface BooleanQuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export function BooleanQuestion({ value, onChange }: BooleanQuestionProps) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition ${value === true ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
          }`}
      >
        Oui
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition ${value === false ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
          }`}
      >
        Non
      </button>
    </div>
  );
}