import { SearchBarInput } from "@/components/shared/SearchBarInput";

interface RealisationSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function RealisationHomeSearchBar({ value, onChange }: RealisationSearchBarProps) {
  return <SearchBarInput value={value}
    onChange={onChange}
    placeholder="Rechercher un projet ou un client…" />;
}