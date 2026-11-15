import type { FormEvent } from "react";
import { LoaderCircle, Search } from "lucide-react";

interface InvoiceLookupFormProps {
  transactionId: string;
  isVerifying: boolean;
  onTransactionIdChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function InvoiceLookupForm({
  transactionId,
  isVerifying,
  onTransactionIdChange,
  onSubmit,
}: InvoiceLookupFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <label htmlFor="invoice-transaction-id" className="block text-sm font-medium">
        Identifiant de transaction SPC
      </label>
      <input
        id="invoice-transaction-id"
        type="text"
        required
        autoComplete="off"
        disabled={isVerifying}
        value={transactionId}
        onChange={(event) => onTransactionIdChange(event.target.value)}
        placeholder="Ex. xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx"
        className="input w-full font-mono"
      />
      <button
        type="submit"
        disabled={!transactionId.trim() || isVerifying}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-wait disabled:opacity-60"
      >
        {isVerifying ? <LoaderCircle size={16} className="animate-spin" /> : <Search size={16} />}
        {isVerifying ? "Vérification…" : "Vérifier la transaction"}
      </button>
    </form>
  );
}
