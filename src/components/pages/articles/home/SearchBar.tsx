import { SearchBarInput } from "@/components/shared/SearchBarInput";

interface ArticleSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ArticleHomeSearchBar({ value, onChange }: ArticleSearchBarProps) {
  return <SearchBarInput value={value}
    onChange={onChange}
    placeholder="Rechercher un article…" />;
}