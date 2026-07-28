// src/components/pages/careers/check/CheckForm.tsx
import { Search, Loader2, Mail, KeyRound } from "lucide-react";

interface CheckFormProps {
  email: string;
  onEmailChange: (v: string) => void;
  token: string;
  onTokenChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error?: string | null;
}

export function CheckForm({
  email,
  onEmailChange,
  token,
  onTokenChange,
  onSubmit,
  isLoading,
  error,
}: CheckFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xs">
      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive font-medium">
          {error}
        </div>
      )}

      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
          <Mail size={14} /> Adresse Email
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="input w-full"
          placeholder="vous@exemple.com"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
          <KeyRound size={14} /> Clé / Code de suivi
        </span>
        <input
          type="text"
          required
          value={token}
          onChange={(e) => onTokenChange(e.target.value)}
          className="input w-full font-mono text-sm"
          placeholder="Ex: 6b4e4224-3c72..."
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 cursor-pointer transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Recherche en cours…
          </>
        ) : (
          <>
            <Search size={16} /> Vérifier ma candidature
          </>
        )}
      </button>
    </form>
  );
}