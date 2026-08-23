import { SearchBarInput } from "@/components/shared/SearchBarInput";

interface EcosystemSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function EcosystemSearchBar({ value, onChange }: EcosystemSearchBarProps) {
  return (
    <SearchBarInput
      value={value}
      onChange={onChange}
      placeholder="Rechercher un outil, un projet ou une technologie…"
    />
  );
}