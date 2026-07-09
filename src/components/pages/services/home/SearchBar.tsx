import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface ServiceSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceHomeSearchBar({ value, onChange }: ServiceSearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(localValue.trim());
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full gap-2 items-center">
      <div className="relative flex-grow">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Rechercher un service…"
          className="input pl-9 pr-10 w-full"
        />
        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground p-0.5 rounded-full hover:bg-muted transition"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl bg-primary px-5 h-[42px] text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-xs transition cursor-pointer"
      >
        Rechercher
      </button>
    </form>
  );
}