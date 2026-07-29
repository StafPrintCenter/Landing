import { SearchBarInput } from "@/components/shared/SearchBarInput";

interface FormationSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function FormationHomeSearchBar({ value, onChange }: FormationSearchBarProps) {
  return <SearchBarInput value={value}
    onChange={onChange}
    placeholder="Rechercher une formation…" />;
}