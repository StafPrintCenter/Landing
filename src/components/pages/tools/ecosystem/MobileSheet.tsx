import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface EcosystemMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function EcosystemMobileSheet(props: EcosystemMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="plateforme" />;
}