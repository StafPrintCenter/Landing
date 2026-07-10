import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface RealisationMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function RealisationHomeMobileSheet(props: RealisationMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="Realisation" />;
}