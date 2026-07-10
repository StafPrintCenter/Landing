import { Search, X } from "lucide-react";

interface SearchBarFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  placeholder: string;
}

export function SearchBarField({ value, onValueChange, onSubmit, onClear, placeholder }: SearchBarFieldProps) {
  return (
    <form onSubmit={onSubmit} className="relative flex w-full gap-2 items-center">
      <div className="relative grow">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className="input pl-9 pr-10 w-full"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground p-0.5 rounded-full hover:bg-muted transition"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl bg-primary px-5 h-10.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-xs transition cursor-pointer"
      >
        Rechercher
      </button>
    </form>
  );
}