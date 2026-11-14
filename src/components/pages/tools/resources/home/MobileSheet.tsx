import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface ResourceMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function ResourceHomeMobileSheet(props: ResourceMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="Ressource" />;
}
