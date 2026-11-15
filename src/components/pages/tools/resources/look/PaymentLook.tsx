import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import type { APIResource } from "@/data/resources";
import { getResourceIcon } from "@/data/resources";
import { fetchResourcePayment, getResourceCheckoutStorageKey, type ResourcePayment } from "@/stores/useResourcesStore";
import { PaymentDetails } from "./PaymentDetails";
import { TransactionLookupForm } from "./TransactionLookupForm";

interface PaymentLookProps {
  resource: APIResource;
  callbackId?: string;
  callbackStatus?: string;
  transactionParam?: string;
}

function isInternalTransactionId(value: string | undefined): value is string {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}

function getStoredTransactionId(slug: string): string | null {
  try {
    return window.localStorage.getItem(getResourceCheckoutStorageKey(slug));
  } catch {
    return null;
  }
}

function storeTransactionId(slug: string, transactionId: string) {
  try {
    window.localStorage.setItem(getResourceCheckoutStorageKey(slug), transactionId);
  } catch {
    // The verified transaction remains usable for the current page without local storage.
  }
}

export function PaymentLook({ resource, callbackId, callbackStatus, transactionParam }: PaymentLookProps) {
  const [payment, setPayment] = useState<ResourcePayment | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [manualError, setManualError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const candidate = getStoredTransactionId(resource.slug)
      || transactionParam
      || (isInternalTransactionId(callbackId) ? callbackId : "");

    setPayment(null);
    setVerificationError(null);
    setTransactionId(candidate);
    if (!candidate) {
      setIsVerifying(false);
      return () => {
        cancelled = true;
      };
    }

    setIsVerifying(true);
    fetchResourcePayment(candidate)
      .then((result) => {
        if (cancelled) return;
        if (result.payableType !== "resource") {
          setVerificationError("Cette transaction ne concerne pas l'achat d'une ressource.");
          return;
        }
        setPayment(result);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setVerificationError(error instanceof Error ? error.message : "La vérification du paiement a échoué.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsVerifying(false);
      });

    return () => {
      cancelled = true;
    };
  }, [callbackId, resource.slug, transactionParam]);

  const handleManualVerification = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = transactionId.trim();
    if (!id) return;

    setManualError(null);
    setVerificationError(null);
    setIsVerifying(true);
    try {
      const result = await fetchResourcePayment(id);
      if (result.payableType !== "resource") {
        setPayment(null);
        setManualError("Cette transaction ne concerne pas l'achat d'une ressource.");
        return;
      }
      setPayment(result);
      setTransactionId(result.id);
      storeTransactionId(resource.slug, result.id);
    } catch (error) {
      setPayment(null);
      setManualError(error instanceof Error ? error.message : "La vérification du paiement a échoué.");
    } finally {
      setIsVerifying(false);
    }
  };

  const Icon = getResourceIcon(resource);
  const isApproved = payment?.status.toLowerCase() === "approved" && payment.payableType === "resource";

  return (
    <SiteShell>
      <section className="container-x py-12 md:py-16">
        <Link
          to="/tools/ressources/$slug"
          params={{ slug: resource.slug }}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft size={15} /> Retour à la ressource
        </Link>

        <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="bg-secondary px-6 py-8 text-secondary-foreground md:px-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon size={24} />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Votre ressource</p>
                <h1 className="mt-1 font-display text-2xl font-bold md:text-3xl">{resource.title}</h1>
                <p className="mt-2 text-sm text-secondary-foreground/70">{resource.category} · {resource.format}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-secondary-foreground/75">{resource.short}</p>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="font-display text-xl font-bold">Vérification du paiement</h2>
            {isVerifying && !payment ? (
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle size={16} className="animate-spin" /> Vérification auprès du serveur…
              </p>
            ) : (
              <PaymentDetails
                resource={resource}
                payment={payment}
                isApproved={isApproved}
                message={verificationError ?? (callbackStatus ? `Retour du prestataire : ${callbackStatus}.` : undefined)}
              />
            )}

            <TransactionLookupForm
              transactionId={transactionId}
              onTransactionIdChange={setTransactionId}
              onSubmit={handleManualVerification}
              isLoading={isVerifying}
              error={manualError}
              hidden={isApproved}
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
