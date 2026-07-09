import { Search as SearchIcon, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm"
    >
      <SearchIcon size={18} className="shrink-0 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher…"
        className="h-10 w-full bg-transparent outline-none placeholder:text-muted-foreground"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Effacer"
          className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <X size={16} />
        </button>
      )}
      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Rechercher
      </button>
    </form>
  );
}