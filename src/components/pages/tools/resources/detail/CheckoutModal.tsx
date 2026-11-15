import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { BaseModal } from "@/components/modal/BaseModal";
import { createResourceCheckout, getResourceCheckoutStorageKey } from "@/stores/useResourcesStore";
import type { APIResource } from "@/data/resources";

interface ResourceCheckoutModalProps {
  resource: APIResource;
  isOpen: boolean;
  onClose: () => void;
}

export function ResourceCheckoutModal({ resource, isOpen, onClose }: ResourceCheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const checkout = await createResourceCheckout(resource.slug, { email, firstName, lastName });
      if (!checkout.paymentUrl) {
        throw new Error("Le lien de paiement n'a pas été fourni.");
      }

      try {
        window.localStorage.setItem(getResourceCheckoutStorageKey(resource.slug), checkout.id);
      } catch {
        // Continue to payment even if this browser blocks local storage.
      }
      window.location.assign(checkout.paymentUrl);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Impossible de démarrer le paiement.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setEmail("");
    setFirstName("");
    setLastName("");
    setError(null);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      variant="center"
      maxWidthClassName="max-w-lg"
      backdropClassName="bg-background/80 backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div>
          <h2 className="font-display text-xl font-bold">Acheter cette ressource</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Votre adresse e-mail est nécessaire pour démarrer le paiement et retrouver votre transaction.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Adresse e-mail <span className="text-destructive">*</span></span>
            <span className="relative block">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="vous@exemple.com"
                className="h-10 w-full rounded-md border border-input bg-background px-3 pl-10 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </span>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Prénom <span className="text-muted-foreground">(facultatif)</span></span>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Nom <span className="text-muted-foreground">(facultatif)</span></span>
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </label>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
          <button type="button" onClick={handleClose} disabled={isSubmitting} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted disabled:opacity-50">
            Annuler
          </button>
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} />}
            {isSubmitting ? "Préparation…" : "Continuer vers le paiement"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
