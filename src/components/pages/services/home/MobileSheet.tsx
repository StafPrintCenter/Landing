import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface ServiceMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function ServiceHomeMobileSheet(props: ServiceMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="service" />;
}