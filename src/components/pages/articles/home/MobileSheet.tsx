import { FilterMobileSheet } from "@/components/shared/FilterMobileSheet";

interface ArticleMobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

export function ArticleHomeMobileSheet(props: ArticleMobileSheetProps) {
  return <FilterMobileSheet {...props} unitLabel="Article" />;
}