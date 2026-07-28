// src/components/pages/careers/check/CheckErrorState.tsx
import { AlertTriangle, RotateCcw, Briefcase } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface CheckErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function CheckErrorState({ message, onRetry }: CheckErrorStateProps) {
  return (
    <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 md:p-8 text-center space-y-6 shadow-xs">
      <div className="inline-flex items-center justify-center p-3 rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle size={32} />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-bold text-foreground">
          Impossible de trouver votre candidature
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
        >
          <RotateCcw size={15} /> Réessayer
        </button>

        <Link
          to="/careers/offers"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
        >
          <Briefcase size={15} /> Voir les offres
        </Link>
      </div>
    </div>
  );
}