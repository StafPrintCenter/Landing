import { Ban, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ApplyErrorBannerProps {
  message: string;
  status?: number;
  slug: string;
}

export function ApplyErrorBanner({ message, status, slug }: ApplyErrorBannerProps) {
  const isAlreadyApplied = status === 409;

  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <Ban size={16} className="mt-0.5 shrink-0" />
      <div>
        <p className="font-medium">{message}</p>
        {isAlreadyApplied && (
          <Link
            to="/careers/check-offer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-2"
          >
            <ArrowLeft size={11} /> Suivre ma candidature existante
          </Link>
        )}
      </div>
    </div>
  );
}