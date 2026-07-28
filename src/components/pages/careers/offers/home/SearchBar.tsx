import { SearchBarInput } from "@/components/shared/SearchBarInput";

interface CareersSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function CareersHomeSearchBar({ value, onChange }: CareersSearchBarProps) {
  return (
    <SearchBarInput
      value={value}
      onChange={onChange}
      placeholder="Rechercher par titre, département, ville, mot-clé…"
    />
  );
}