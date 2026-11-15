import type { FormEvent } from "react";
import { LoaderCircle, Search } from "lucide-react";

interface TransactionLookupFormProps {
  transactionId: string;
  onTransactionIdChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string | null;
  hidden?: boolean;
}

export function TransactionLookupForm({
  transactionId,
  onTransactionIdChange,
  onSubmit,
  isLoading,
  error,
  hidden = false,
}: TransactionLookupFormProps) {
  if (hidden) return null;

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Identifiant de transaction SPC</span>
        <input
          type="text"
          required
          value={transactionId}
          onChange={(event) => onTransactionIdChange(event.target.value)}
          placeholder="Ex. xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx"
          className="h-10 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </label>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={isLoading || !transactionId.trim()}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-wait disabled:opacity-60"
      >
        {isLoading ? <LoaderCircle size={16} className="animate-spin" /> : <Search size={16} />}
        Vérifier ma transaction
      </button>
    </form>
  );
}
