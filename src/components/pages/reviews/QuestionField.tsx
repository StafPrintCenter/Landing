interface QuestionFieldProps {
  title: string;
  description?: string | null;
  isRequired: boolean;
  error?: string;
  children: React.ReactNode;
}

export function QuestionField({ title, description, isRequired, error, children }: QuestionFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium">
        {title} {isRequired && <span className="text-destructive">*</span>}
      </label>
      {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}