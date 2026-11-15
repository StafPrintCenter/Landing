import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, notFound, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { AlertCircle, ArrowLeft, BadgeCheck, Download, LoaderCircle, Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ResourceDetailNotFound, ResourceDetailSkeleton } from "@/components/pages/tools/resources/detail";
import { ResourceDownloadAction } from "@/components/pages/tools/resources/detail/DownloadAction";
import { formatResourcePrice, getResourceIcon } from "@/data/resources";
import { fetchResourceBySlug, fetchResourcePayment, getResourceCheckoutStorageKey, type ResourcePayment } from "@/stores/useResourcesStore";
import { SITE } from "@/data/site";

const paymentReturnSearchSchema = z.object({
  status: z.string().optional(),
  id: z.string().optional(),
  transaction: z.string().optional(),
});

export const Route = createFileRoute("/tools/ressources/$slug/look")({
  validateSearch: zodValidator(paymentReturnSearchSchema),
  pendingMs: 0,
  loader: async ({ params }) => {
    const resource = await fetchResourceBySlug(params.slug);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Résultat du paiement | ${SITE.name}` },
      { name: "description", content: loaderData?.resource.short ?? "Vérifiez votre paiement et téléchargez votre ressource." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResourcePaymentLookPage,
  pendingComponent: ResourceDetailSkeleton,
  notFoundComponent: ResourceDetailNotFound,
});

function isInternalTransactionId(value: string | undefined): value is string {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}

function ResourcePaymentLookPage() {
  const { resource } = Route.useLoaderData();
  const { id: callbackId, status: callbackStatus, transaction: transactionParam } = useSearch({ from: "/tools/ressources/$slug/look" });
  const [payment, setPayment] = useState<ResourcePayment | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [manualTransactionId, setManualTransactionId] = useState("");
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [manualError, setManualError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const storedId = window.localStorage.getItem(getResourceCheckoutStorageKey(resource.slug));
    const candidate = storedId || transactionParam || (isInternalTransactionId(callbackId) ? callbackId : "");

    if (!candidate) {
      setIsVerifying(false);
      return () => {
        cancelled = true;
      };
    }

    setTransactionId(candidate);
    setIsVerifying(true);
    fetchResourcePayment(candidate)
      .then((result) => {
        if (cancelled) return;
        if (result.payableType !== "resource") {
          setVerificationError("Cette transaction ne concerne pas l'achat d'une ressource.");
          return;
        }
        setPayment(result);
        setVerificationError(null);
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
    const id = manualTransactionId.trim();
    if (!id) return;

    setManualError(null);
    setIsVerifying(true);
    try {
      const result = await fetchResourcePayment(id);
      if (result.payableType !== "resource") {
        setManualError("Cette transaction ne concerne pas l'achat d'une ressource.");
        return;
      }
      setPayment(result);
      setTransactionId(result.id);
      window.localStorage.setItem(getResourceCheckoutStorageKey(resource.slug), result.id);
      setManualTransactionId("");
    } catch (error) {
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
            {isVerifying ? (
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle size={16} className="animate-spin" /> Vérification auprès du serveur…
              </p>
            ) : payment ? (
              <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">Statut</span>
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
                    <dt className="text-muted-foreground">Ressource</dt>
                    <dd className="mt-0.5 font-semibold">{resource.title}</dd>
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
              </div>
            ) : (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-muted-foreground">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                <p>{verificationError ?? (callbackStatus ? `Retour du prestataire : ${callbackStatus}.` : "Indiquez l'identifiant SPC de votre transaction pour vérifier le paiement.")}</p>
              </div>
            )}

            {!isApproved && (
              <form onSubmit={handleManualVerification} className="mt-6 space-y-3">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Identifiant de transaction SPC</span>
                  <input
                    type="text"
                    required
                    value={manualTransactionId}
                    onChange={(event) => setManualTransactionId(event.target.value)}
                    placeholder="Ex. 74ba4bf1-f3a6-4d7a-83d2-24932ab2af78"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 font-mono text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </label>
                {manualError && <p role="alert" className="text-sm text-destructive">{manualError}</p>}
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-wait disabled:opacity-60"
                >
                  {isVerifying ? <LoaderCircle size={16} className="animate-spin" /> : <Search size={16} />}
                  Vérifier ma transaction
                </button>
              </form>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <p className="text-sm text-muted-foreground">
                Prix de la ressource : <strong className="text-foreground">{formatResourcePrice(resource.price)}</strong>
              </p>
              {!isApproved && transactionId && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Actualiser le statut
                </button>
              )}
              {isApproved && (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-leaf">
                  <Download size={15} /> Téléchargement autorisé
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
