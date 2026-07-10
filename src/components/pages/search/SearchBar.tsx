import { SearchBarField } from "@/components/shared/SearchBarField";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <SearchBarField
      value={value}
      onValueChange={onChange}
      onSubmit={onSubmit}
      onClear={() => onChange("")}
      placeholder="Rechercher services, réalisations, formations, articles, FAQ…"
    />
  );
}