import { SearchBarInput } from "@/components/shared/SearchBarInput";

interface ResourceSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ResourceHomeSearchBar({ value, onChange }: ResourceSearchBarProps) {
  return <SearchBarInput value={value} onChange={onChange} placeholder="Rechercher une ressource…" />;
}
