import { BadgeCheck, RotateCcw } from "lucide-react";
import type { APIResource } from "@/data/resources";
import type { ResourcePayment } from "@/stores/useResourcesStore";
import { InvoiceDownloadButton } from "./InvoiceDownloadButton";
import { InvoiceResourceDetails } from "./InvoiceResourceDetails";

interface InvoicePaymentDetailsProps {
  payment: ResourcePayment;
  resource: APIResource | null;
  resourceError: string | null;
  isLoadingResource: boolean;
  onNewSearch: () => void;
}

export function InvoicePaymentDetails({
  payment,
  resource,
  resourceError,
  isLoadingResource,
  onNewSearch,
}: InvoicePaymentDetailsProps) {
  const isApproved = payment.status.toLowerCase() === "approved";

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className={`flex flex-col items-center gap-3 px-6 py-8 text-center ${isApproved ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${isApproved ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"}`}>
          <BadgeCheck size={26} />
        </span>
        <h2 className="font-display text-xl font-bold">
          {isApproved ? "Paiement approuvé" : "Paiement non approuvé"}
        </h2>
        <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
          {payment.status}
        </span>
      </div>

      <dl className="divide-y divide-border">
        <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:justify-between">
          <dt className="text-sm text-muted-foreground">Montant</dt>
          <dd className="font-medium">{payment.amount.toLocaleString("fr-FR")} {payment.currency}</dd>
        </div>
        <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:justify-between">
          <dt className="text-sm text-muted-foreground">Type de paiement</dt>
          <dd className="font-medium">{payment.payableType}</dd>
        </div>
        <div className="flex flex-col gap-1 px-6 py-4">
          <dt className="text-sm text-muted-foreground">Description</dt>
          <dd className="font-medium">{payment.description}</dd>
        </div>
        <div className="flex flex-col gap-1 px-6 py-4">
          <dt className="text-sm text-muted-foreground">Identifiant de transaction SPC</dt>
          <dd className="break-all font-mono text-sm">{payment.id}</dd>
        </div>
        {payment.paidAt && (
          <div className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:justify-between">
            <dt className="text-sm text-muted-foreground">Payé le</dt>
            <dd className="font-medium">{new Date(payment.paidAt).toLocaleString("fr-FR")}</dd>
          </div>
        )}
      </dl>

      {payment.payableType.toLowerCase() === "resource" && (
        <section className="border-t border-border px-6 py-5">
          <h3 className="font-display text-lg font-semibold">Ressource achetée</h3>
          <InvoiceResourceDetails resource={resource} error={resourceError} isLoading={isLoadingResource} />
        </section>
      )}

      <div className="space-y-3 border-t border-border p-6">
        {isApproved ? (
          <>
            <p className="text-sm text-muted-foreground">
              Facture disponible en ligne pendant 7 jours après le paiement.
            </p>
            <InvoiceDownloadButton transactionId={payment.id} />
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            La facture sera disponible une fois le paiement approuvé.
          </p>
        )}
        <button
          type="button"
          onClick={onNewSearch}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:bg-muted"
        >
          <RotateCcw size={16} /> Effectuer une nouvelle recherche
        </button>
      </div>
    </div>
  );
}
