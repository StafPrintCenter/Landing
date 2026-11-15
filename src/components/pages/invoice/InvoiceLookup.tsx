import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, FileText } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import type { APIResource } from "@/data/resources";
import { fetchResourcePayment, fetchResourceForPayment, type ResourcePayment } from "@/stores/useResourcesStore";
import { InvoiceLookupForm } from "./InvoiceLookupForm";
import { InvoicePaymentDetails } from "./InvoicePaymentDetails";

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

  const handleNewSearch = () => {
    verificationRequestRef.current += 1;
    setTransactionId("");
    setPayment(null);
    setResource(null);
    setIsVerifying(false);
    setVerificationError(null);
    setResourceError(null);
  };

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

          {!payment && (
            <InvoiceLookupForm
              transactionId={transactionId}
              isVerifying={isVerifying}
              onTransactionIdChange={(value) => {
                setTransactionId(value);
                setVerificationError(null);
                setResourceError(null);
              }}
              onSubmit={handleSubmit}
            />
          )}

          {verificationError && (
            <div role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{verificationError}</p>
            </div>
          )}

          {payment && (
            <InvoicePaymentDetails
              payment={payment}
              resource={resource}
              resourceError={resourceError}
              isLoadingResource={isVerifying && payment.payableType.toLowerCase() === "resource" && !resourceError}
              onNewSearch={handleNewSearch}
            />
          )}
        </div>
      </section>
    </SiteShell>
  );
}
