import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, BadgeCheck, FileText, LoaderCircle, Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { getResourceIcon, type APIResource } from "@/data/resources";
import { fetchResourcePayment, fetchResourceForPayment, type ResourcePayment } from "@/stores/useResourcesStore";
import { InvoiceDownloadButton } from "./InvoiceDownloadButton";

export function InvoiceLookup({ initialId = "" }: { initialId?: string }) {
  const [transactionId, setTransactionId] = useState(initialId);
  const [payment, setPayment] = useState<ResourcePayment | null>(null);
  const [resource, setResource] = useState<APIResource | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [resourceError, setResourceError] = useState<string | null>(null);
  const verificationRequestRef = useRef(0);

  const verifyPayment = useCallback(async (id: string) => {
    const normalizedId = id.trim();
    if (!normalizedId) return;

    const requestId = verificationRequestRef.current + 1;
    verificationRequestRef.current = requestId;
    setIsVerifying(true);
    setVerificationError(null);
    setResourceError(null);
    setPayment(null);
    setResource(null);
    try {
      const verifiedPayment = await fetchResourcePayment(normalizedId);
      if (requestId !== verificationRequestRef.current) return;
      setPayment(verifiedPayment);

      if (verifiedPayment.payableType.toLowerCase() === "resource") {
        try {
          const linkedResource = await fetchResourceForPayment(verifiedPayment.payableId);
          if (requestId !== verificationRequestRef.current) return;
          if (linkedResource) {
            setResource(linkedResource);
          } else {
            setResourceError("Les détails de la ressource liée à ce paiement sont introuvables.");
          }
        } catch (error) {
          if (requestId !== verificationRequestRef.current) return;
          setResourceError(error instanceof Error ? error.message : "Impossible de récupérer les détails de la ressource.");
        }
      }
    } catch (error) {
      if (requestId !== verificationRequestRef.current) return;
      setVerificationError(error instanceof Error ? error.message : "La vérification du paiement a échoué.");
    } finally {
      if (requestId === verificationRequestRef.current) setIsVerifying(false);
    }
  }, []);

  useEffect(() => {
    if (!initialId) return;
    setTransactionId(initialId);
    void verifyPayment(initialId);
  }, [initialId, verifyPayment]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void verifyPayment(transactionId);
  };

  const isApproved = payment?.status.toLowerCase() === "approved";
  const ResourceIcon = resource ? getResourceIcon(resource) : null;

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-20">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileText size={28} />
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold md:text-4xl">Télécharger ma facture</h1>
            <p className="mt-3 text-muted-foreground">
              Saisissez l’identifiant de transaction SPC indiqué sur le reçu FedaPay pour récupérer votre facture.
              Elle est disponible en ligne pendant 7 jours après le paiement.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
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
              onChange={(event) => {
                setTransactionId(event.target.value);
                setPayment(null);
                setResource(null);
                setVerificationError(null);
                setResourceError(null);
              }}
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

          {verificationError && (
            <div role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{verificationError}</p>
            </div>
          )}

          {payment && (
            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold">Détails du paiement</h2>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isApproved ? "bg-leaf/15 text-leaf" : "bg-amber-500/10 text-amber-600"}`}>
                  <BadgeCheck size={14} /> {payment.status}
                </span>
              </div>
              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Montant</dt>
                  <dd className="mt-1 font-semibold">{payment.amount.toLocaleString("fr-FR")} {payment.currency}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Type</dt>
                  <dd className="mt-1 font-semibold">{payment.payableType}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-muted-foreground">Description</dt>
                  <dd className="mt-1">{payment.description}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-muted-foreground">Identifiant de transaction SPC</dt>
                  <dd className="mt-1 break-all font-mono text-xs">{payment.id}</dd>
                </div>
                {payment.paidAt && (
                  <div className="sm:col-span-2">
                    <dt className="text-muted-foreground">Payé le</dt>
                    <dd className="mt-1">{new Date(payment.paidAt).toLocaleString("fr-FR")}</dd>
                  </div>
                )}
              </dl>

              {payment.payableType.toLowerCase() === "resource" && (
                <div className="mt-6 border-t border-border pt-5">
                  <h3 className="font-display text-lg font-semibold">Ressource achetée</h3>
                  {resource ? (
                    <div className="mt-3 flex items-start gap-4">
                      {resource.cover ? (
                        <img src={resource.cover} alt="" className="h-20 w-28 shrink-0 rounded-lg object-cover" />
                      ) : (
                        <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          {ResourceIcon && <ResourceIcon size={28} />}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{resource.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{resource.category} · {resource.format}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{resource.short}</p>
                      </div>
                    </div>
                  ) : resourceError ? (
                    <p role="status" className="mt-2 text-sm text-muted-foreground">{resourceError}</p>
                  ) : (
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <LoaderCircle size={15} className="animate-spin" /> Chargement de la ressource…
                    </p>
                  )}
                </div>
              )}

              {isApproved ? (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="mb-3 text-sm text-muted-foreground">
                    Facture disponible en ligne pendant 7 jours après le paiement.
                  </p>
                  <InvoiceDownloadButton transactionId={payment.id} />
                </div>
              ) : (
                <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
                  La facture sera disponible une fois le paiement approuvé.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
