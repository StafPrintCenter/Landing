import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface FaqMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function FaqHomeMobileSheet(props: FaqMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="FAQ" />;
}