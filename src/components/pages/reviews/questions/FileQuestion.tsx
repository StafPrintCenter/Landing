import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import type { APIReviewQuestion } from "@/data/reviews";

interface FileQuestionProps {
  question: APIReviewQuestion;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function FileQuestion({ question, value, onChange, error: externalError }: FileQuestionProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const maxSizeKb = question.settings?.max_size_kb;

  const applyFile = (file: File | null) => {
    setLocalError(null);

    if (file && maxSizeKb && file.size / 1024 > maxSizeKb) {
      setLocalError(`Fichier trop volumineux (max ${(maxSizeKb / 1024).toFixed(1)} Mo).`);
      onChange(null);
      // Réinitialise l'input pour permettre de resélectionner un autre fichier immédiatement
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    onChange(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0] ?? null);
  };

  const handleRemove = () => {
    onChange(null);
    setLocalError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes("Files")) {
      dragCounter.current += 1;
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] ?? null;
    applyFile(file);
  };

  return (
    <div>
      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm">
          <FileText size={16} className="shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate">{value.name}</p>
            <p className="text-[11px] text-muted-foreground">{formatFileSize(value.size)}</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Retirer le fichier"
            className="shrink-0 text-muted-foreground hover:text-destructive cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed px-4 py-6 text-sm transition-colors ${
            isDragging
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-background text-muted-foreground hover:bg-muted/40"
          }`}
        >
          <Upload size={18} className={isDragging ? "text-primary" : "text-muted-foreground"} />
          <span>
            {isDragging ? "Déposez le fichier ici" : "Glissez-déposez un fichier ou cliquez pour parcourir"}
          </span>
          {maxSizeKb && (
            <span className="text-[11px] text-muted-foreground/80">
              Taille max : {(maxSizeKb / 1024).toFixed(1)} Mo
            </span>
          )}
          <input ref={inputRef} type="file" onChange={handleChange} className="hidden" />
        </label>
      )}
      {(localError || externalError) && <p className="mt-1 text-xs text-destructive">{localError ?? externalError}</p>}
    </div>
  );
}