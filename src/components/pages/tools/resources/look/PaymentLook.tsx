import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import type { APIResource } from "@/data/resources";
import { getResourceIcon } from "@/data/resources";
import { fetchResourcePayment, getResourceCheckoutId, storeResourceCheckoutId, type ResourcePayment } from "@/stores/useResourcesStore";
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

export function PaymentLook({ resource, callbackId, callbackStatus, transactionParam }: PaymentLookProps) {
  const [payment, setPayment] = useState<ResourcePayment | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [manualError, setManualError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const candidate = getResourceCheckoutId(resource.slug)
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
      storeResourceCheckoutId(resource.slug, result.id);
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

        <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="bg-secondary text-secondary-foreground">
              {resource.cover ? (
                <div className="aspect-video overflow-hidden md:aspect-[4/3]">
                  <img
                    src={resource.cover}
                    alt={resource.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center bg-background/5 md:aspect-[4/3]">
                  <Icon size={64} strokeWidth={1.1} className="text-accent" />
                </div>
              )}
              <div className="px-6 py-8 md:px-8">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon size={24} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Votre ressource</p>
                    <h1 className="mt-2 font-display text-2xl font-bold leading-tight md:text-3xl">{resource.title}</h1>
                    <p className="mt-2 text-sm text-secondary-foreground/70">{resource.category} <span aria-hidden="true">·</span> {resource.format} <span aria-hidden="true">·</span> {resource.meta}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-prose text-sm leading-relaxed text-secondary-foreground/75">{resource.description ?? resource.short}</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h2 className="font-display text-xl font-bold">Vérification du paiement</h2>
              {isVerifying && !payment ? (
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <LoaderCircle size={16} className="animate-spin" /> Ceci ne devrait que durer qu'un petit moment
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
        </div>
      </section>
    </SiteShell>
  );
}
