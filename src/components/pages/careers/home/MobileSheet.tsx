import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface CareersMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function CareersHomeMobileSheet(props: CareersMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="Offre d'emploi" />;
}