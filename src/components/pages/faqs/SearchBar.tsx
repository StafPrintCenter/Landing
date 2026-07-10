import { SearchBarInput } from "@/components/shared/SearchBarInput";

interface FaqSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function FaqHomeSearchBar({ value, onChange }: FaqSearchBarProps) {
  return <SearchBarInput value={value}
    onChange={onChange}
    placeholder="Rechercher une question…" />;
}