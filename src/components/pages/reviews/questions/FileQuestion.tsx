import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import type { APIReviewQuestion } from "@/data/reviews";

interface FileQuestionProps {
  question: APIReviewQuestion;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function FileQuestion({ question, value, onChange, error: externalError }: FileQuestionProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const maxSizeKb = question.settings?.max_size_kb;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLocalError(null);

    if (file && maxSizeKb && file.size / 1024 > maxSizeKb) {
      setLocalError(`Fichier trop volumineux (max ${(maxSizeKb / 1024).toFixed(1)} Mo).`);
      onChange(null);
      return;
    }

    onChange(file);
  };

  return (
    <div>
      {value ? (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm">
          <span className="truncate">{value.name}</span>
          <button type="button" onClick={() => onChange(null)} className="ml-2 shrink-0 text-muted-foreground hover:text-destructive cursor-pointer">
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-4 text-sm text-muted-foreground hover:bg-muted/40">
          <Upload size={16} />
          Choisir un fichier
          <input type="file" onChange={handleChange} className="hidden" />
        </label>
      )}
      {(localError || externalError) && <p className="mt-1 text-xs text-destructive">{localError ?? externalError}</p>}
    </div>
  );
}