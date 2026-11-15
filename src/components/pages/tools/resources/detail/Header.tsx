import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, CreditCard, Download, Eye, FileCheck2, Layers3, MessageCircle, MonitorCheck, Share2, ShieldCheck, Sparkles } from "lucide-react";
import { formatResourcePrice, getResourceIcon, type APIResource } from "@/data/resources";
import { ShareModal } from "@/components/modal";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { getResourceCheckoutStorageKey } from "@/stores/useResourcesStore";
import type { ResourcePayment } from "@/stores/useResourcesStore";
import { ResourceCheckoutModal } from "./CheckoutModal";
import { ResourceDownloadAction } from "./DownloadAction";
import { VerifyPaymentModal } from "./VerifyPaymentModal";

interface ResourceDetailHeaderProps {
  resource: APIResource;
}

export function ResourceDetailHeader({ resource }: ResourceDetailHeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [verifiedPayment, setVerifiedPayment] = useState<ResourcePayment | null>(null);
  const Icon = getResourceIcon(resource);
  const isFree = resource.price === 0;
  const discount = resource.discountPercentage > 0 ? resource.discountPercentage : null;
  const originalPrice = discount !== null && resource.originalPrice !== null ? formatResourcePrice(resource.originalPrice) : null;
  const shareUrl = buildShareUrl(`/tools/ressources/${resource.slug}`);

  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary text-secondary-foreground">
      {resource.cover && (
        <img
          src={resource.cover}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-secondary/75" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-x relative py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            to="/tools/ressources"
            className="inline-flex items-center gap-2 text-sm font-medium text-secondary-foreground/70 transition hover:text-accent"
          >
            <ArrowLeft size={14} /> Toutes les ressources
          </Link>
          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-secondary-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Share2 size={14} /> Partager
          </button>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-secondary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                {resource.category}
              </span>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isFree ? "bg-leaf/20 text-secondary-foreground" : "bg-accent text-accent-foreground"}`}>
                {isFree ? <Download size={13} /> : <Sparkles size={13} />}
                {isFree ? "Ressource gratuite" : "Ressource premium"}
              </span>
            </div>
            <div className="mt-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-xl">
              <Icon size={30} />
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">{resource.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary-foreground/75">{resource.description ?? resource.short}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-secondary-foreground/65">
              <span className="inline-flex items-center gap-2"><FileCheck2 size={16} className="text-accent" />{resource.format}</span>
              <span className="inline-flex items-center gap-2"><Layers3 size={16} className="text-accent" />{resource.meta}</span>
              <span className="inline-flex items-center gap-2"><BadgeCheck size={16} className="text-accent" />{resource.status}</span>
              <span className="inline-flex items-center gap-2"><Eye size={16} className="text-accent" />{resource.viewsCount} vues</span>
            </div>
          </div>

          <aside className="rounded-3xl border border-secondary-foreground/15 bg-background/5 p-6 shadow-2xl backdrop-blur-sm md:p-8">
            <p className="text-sm text-secondary-foreground/60">{isFree ? "Accès libre" : originalPrice ? "Prix promotionnel" : "Prix de la ressource"}</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-3">
              <p className="font-display text-4xl font-bold">{formatResourcePrice(resource.price)}</p>
              {originalPrice && (
                <>
                  <s className="text-lg text-secondary-foreground/50">{originalPrice}</s>
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">-{discount}%</span>
                </>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/60">
              {isFree
                ? "Préparez un lien sécurisé pour télécharger le fichier."
                : "Le paiement est sécurisé par FedaPay. Le lien de téléchargement sera disponible après vérification."}
            </p>
            {isFree ? (
              <ResourceDownloadAction slug={resource.slug} />
            ) : verifiedPayment ? (
              <button
                type="button"
                onClick={() => setIsVerifyOpen(true)}
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Download size={18} /> Voir le téléchargement
              </button>
            ) : (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  <CreditCard size={18} /> Payer avec FedaPay
                </button>
                <button
                  type="button"
                  onClick={() => setIsVerifyOpen(true)}
                  className="mt-3 w-full cursor-pointer text-center text-xs text-secondary-foreground/60 underline-offset-4 transition hover:text-accent hover:underline"
                >
                  J'ai déjà payé
                </button>
              </div>
            )}
            <div className="mt-5 space-y-3 border-t border-secondary-foreground/15 pt-5 text-xs text-secondary-foreground/65">
              <p className="flex items-center gap-2"><MessageCircle size={14} className="text-accent" />Réponse de l'équipe STAF PRINT CENTER</p>
              <p className="flex items-center gap-2"><ShieldCheck size={14} className="text-accent" />Licence d'utilisation incluse</p>
              <p className="flex items-center gap-2"><MonitorCheck size={14} className="text-accent" />Fichier numérique, aucun envoi physique</p>
              <p className="flex items-center gap-2"><Download size={14} className="text-accent" />{resource.downloadsCount} téléchargements</p>
            </div>
          </aside>
        </div>
      </div>
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        title={resource.title}
        text={resource.short}
        shortlinkCategory="other"
      />
      {!isFree && (
        <>
          <ResourceCheckoutModal
            resource={resource}
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
          <VerifyPaymentModal
            resource={resource}
            isOpen={isVerifyOpen}
            onClose={() => setIsVerifyOpen(false)}
            initialPayment={verifiedPayment}
            onApproved={(payment) => {
              try {
                window.localStorage.setItem(getResourceCheckoutStorageKey(resource.slug), payment.id);
              } catch {
                // Payment verification and download remain available without local storage.
              }
              setVerifiedPayment(payment);
            }}
          />
        </>
      )}
    </section>
  );
}
