import { useState, type FormEvent } from "react";
import { LoaderCircle, Search } from "lucide-react";
import { BaseModal } from "@/components/modal/BaseModal";
import { fetchResourcePayment } from "@/stores/useResourcesStore";

interface VerifyPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApproved: (transactionId: string) => void;
}

export function VerifyPaymentModal({ isOpen, onClose, onApproved }: VerifyPaymentModalProps) {
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = transactionId.trim();
    if (!id) return;

    setError(null);
    setIsSubmitting(true);
    try {
      const payment = await fetchResourcePayment(id);
      if (payment.payableType !== "resource") {
        setError("Cette transaction ne correspond pas à l'achat d'une ressource.");
      } else if (payment.status.toLowerCase() !== "approved") {
        setError(`Le paiement n'est pas encore approuvé (statut : ${payment.status}).`);
      } else {
        onApproved(payment.id);
        setTransactionId("");
        onClose();
      }
    } catch (verificationError) {
      setError(verificationError instanceof Error ? verificationError.message : "La vérification du paiement a échoué.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setTransactionId("");
    setError(null);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} variant="center" maxWidthClassName="max-w-lg">
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="font-display text-xl font-bold">Vérifier mon paiement</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Saisissez l’identifiant de transaction SPC indiqué sur le reçu FedaPay.
        </p>
        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm font-medium">Identifiant de transaction</span>
          <input
            type="text"
            autoComplete="off"
            required
            value={transactionId}
            onChange={(event) => setTransactionId(event.target.value)}
            placeholder="Ex. xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx"
            className="h-10 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </label>
        {error && <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
          <button type="button" onClick={handleClose} disabled={isSubmitting} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-50 cursor-pointer">
            Annuler
          </button>
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-wait disabled:opacity-60 cursor-pointer">
            {isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <Search size={16} />}
            Vérifier
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
