import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface SearchMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function SearchMobileSheet(props: SearchMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="Résultats" />;
}