import { useEffect, useState, type FormEvent } from "react";
import { BadgeCheck, LoaderCircle, Search } from "lucide-react";
import { BaseModal } from "@/components/modal/BaseModal";
import type { APIResource } from "@/data/resources";
import { fetchResourcePayment, type ResourcePayment } from "@/stores/useResourcesStore";
import { ResourceDownloadAction } from "./DownloadAction";

interface VerifyPaymentModalProps {
  resource: APIResource;
  isOpen: boolean;
  onClose: () => void;
  initialPayment?: ResourcePayment | null;
  onApproved: (payment: ResourcePayment) => void;
}

export function VerifyPaymentModal({
  resource,
  isOpen,
  onClose,
  initialPayment,
  onApproved,
}: VerifyPaymentModalProps) {
  const [transactionId, setTransactionId] = useState(initialPayment?.id ?? "");
  const [payment, setPayment] = useState<ResourcePayment | null>(initialPayment ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isApproved = payment?.status.toLowerCase() === "approved" && payment.payableType === "resource";

  useEffect(() => {
    if (!initialPayment) return;
    setPayment(initialPayment);
    setTransactionId(initialPayment.id);
  }, [initialPayment]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = transactionId.trim();
    if (!id) return;

    setError(null);
    setIsSubmitting(true);
    try {
      const verifiedPayment = await fetchResourcePayment(id);
      if (verifiedPayment.payableType !== "resource") {
        setPayment(null);
        setError("Cette transaction ne correspond pas à l'achat d'une ressource.");
      } else {
        setPayment(verifiedPayment);
        if (verifiedPayment.status.toLowerCase() === "approved") onApproved(verifiedPayment);
      }
    } catch (verificationError) {
      setPayment(null);
      setError(verificationError instanceof Error ? verificationError.message : "La vérification du paiement a échoué.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setError(null);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} variant="center" maxWidthClassName="max-w-lg">
      <div className="max-h-[85vh] overflow-y-auto p-6">
        <h2 className="font-display text-xl font-bold">{isApproved ? "Paiement approuvé" : "Vérifier mon paiement"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Saisissez l’identifiant de transaction SPC indiqué sur le reçu FedaPay.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <label className="block">
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
          {error && <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting || !transactionId.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <Search size={16} />}
            Vérifier
          </button>
        </form>

        {payment && (
          <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold">{resource.title}</span>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isApproved ? "bg-leaf/15 text-leaf" : "bg-amber-500/10 text-amber-600"}`}>
                <BadgeCheck size={14} /> {payment.status}
              </span>
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Montant</dt>
                <dd className="mt-0.5 font-semibold">{payment.amount.toLocaleString("fr-FR")} {payment.currency}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Type</dt>
                <dd className="mt-0.5 font-semibold">{payment.payableType}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Description</dt>
                <dd className="mt-0.5">{payment.description}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Identifiant SPC</dt>
                <dd className="mt-0.5 break-all font-mono text-xs">{payment.id}</dd>
              </div>
              {payment.paidAt && (
                <div className="sm:col-span-2">
                  <dt className="text-muted-foreground">Payé le</dt>
                  <dd className="mt-0.5">{new Date(payment.paidAt).toLocaleString("fr-FR")}</dd>
                </div>
              )}
            </dl>
            {isApproved ? (
              <ResourceDownloadAction key={payment.id} slug={resource.slug} transactionId={payment.id} />
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Le téléchargement sera disponible dès que le paiement sera approuvé.
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-border pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="cursor-pointer rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
