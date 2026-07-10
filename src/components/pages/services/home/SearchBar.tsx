import { SearchBarInput } from "@/components/shared/SearchBarInput";

interface ServiceSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceHomeSearchBar({ value, onChange }: ServiceSearchBarProps) {
  return <SearchBarInput value={value}
    onChange={onChange}
    placeholder="Rechercher un service…" />;
}