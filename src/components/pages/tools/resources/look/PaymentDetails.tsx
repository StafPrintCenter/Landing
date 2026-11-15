import { AlertCircle, BadgeCheck, Download } from "lucide-react";
import type { APIResource } from "@/data/resources";
import { formatResourcePrice } from "@/data/resources";
import type { ResourcePayment } from "@/stores/useResourcesStore";
import { ResourceDownloadAction } from "../detail/DownloadAction";

interface PaymentDetailsProps {
  resource: APIResource;
  payment: ResourcePayment | null;
  isApproved: boolean;
  message?: string | null;
}

export function PaymentDetails({ resource, payment, isApproved, message }: PaymentDetailsProps) {
  if (!payment) {
    return (
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-muted-foreground">
        <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
        <p>{message ?? "Indiquez l'identifiant SPC de votre transaction pour vérifier le paiement."}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">Statut</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isApproved ? "bg-leaf/15 text-leaf" : "bg-amber-500/10 text-amber-600"}`}>
          <BadgeCheck size={14} /> {payment.status}
        </span>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Montant payé</dt>
          <dd className="mt-0.5 font-semibold">{payment.amount.toLocaleString("fr-FR")} {payment.currency}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Ressource</dt>
          <dd className="mt-0.5 font-semibold">{resource.title}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Description</dt>
          <dd className="mt-0.5">{payment.description}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Identifiant de transaction SPC</dt>
          <dd className="mt-0.5 break-all font-mono text-xs">{payment.id}</dd>
        </div>
        {payment.paidAt && (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Payé le</dt>
            <dd className="mt-0.5 font-medium">{new Date(payment.paidAt).toLocaleString("fr-FR")}</dd>
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
      <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
        Prix de la ressource : <strong className="text-foreground">{formatResourcePrice(resource.price)}</strong>
        {isApproved && <span className="ml-3 inline-flex items-center gap-1 font-semibold text-leaf"><Download size={14} /> Paiement confirmé</span>}
      </p>
    </div>
  );
}
