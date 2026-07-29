import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface FormationMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function FormationHomeMobileSheet(props: FormationMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="Formation" />;
}