import { useState } from "react";
import { Check, Upload, X } from "lucide-react";

interface FileUploadFieldProps {
  label: string;
  description: string;
  prompt: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  removeTitle?: string;
}

export function FileUploadField({
  label,
  description,
  prompt,
  file,
  onChange,
  required = false,
  removeTitle = "Supprimer le fichier",
}: FileUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) onChange(droppedFile);
  };

  return (
    <div className="space-y-1.5">
      <span className="block text-xs font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}{" "}
        <span className="font-normal text-muted-foreground">{description}</span>
      </span>
      {file ? (
        <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
          <div className="flex items-center gap-2.5 truncate">
            <Check size={16} className="text-primary shrink-0" />
            <span className="truncate font-medium text-foreground">{file.name}</span>
            <span className="text-xs text-muted-foreground">
              ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="ml-2 shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
            title={removeTitle}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${isDragging
            ? "border-primary bg-primary/10"
            : "border-border bg-background hover:border-primary/50 hover:bg-muted/30"
            }`}
        >
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Upload size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">{prompt}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Formats acceptés : PDF, DOC, DOCX</p>
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => onChange(event.target.files?.[0] ?? null)}
            className="hidden"
            required={required}
          />
        </label>
      )}
    </div>
  );
}
