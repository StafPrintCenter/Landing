import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { TopicsSelector } from "./TopicsSelector";
import { NewsletterSuccessScreen } from "./SuccessScreen";
import { subscribeNewsletter } from "@/stores/useNewsletterStore";
import type { APINewsletterSubscription } from "@/data/newsletter";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";

export function NewsletterSubscribeForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ subscription: APINewsletterSubscription; alreadySubscribed: boolean } | null>(null);

  const toggle = (categoryId: string) =>
    setSelected((prev) => (prev.includes(categoryId) ? prev.filter((x) => x !== categoryId) : [...prev, categoryId]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setError(null);
    setIsSubmitting(true);
    try {
      const res = await subscribeNewsletter({
        email,
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        categoryIds: selected,
        acceptedTerms: consent,
      });
      setResult(res);
    } catch {
      setError("Une erreur est survenue lors de l'inscription. Merci de réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return <NewsletterSuccessScreen subscription={result.subscription} alreadySubscribed={result.alreadySubscribed} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Prénom</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Optionnel"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Nom</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Optionnel"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
        />
      </div>

      <TopicsSelector selected={selected} onToggle={toggle} />

      <label className="flex items-start gap-2 text-xs text-foreground/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 cursor-pointer"
        />
        <span>J'accepte de recevoir la newsletter {SITE.name} et je peux me désabonner à tout moment.</span>
      </label>

      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!email || !consent || isSubmitting}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Inscription…
          </>
        ) : (
          "S'inscrire"
        )}
      </button>
    </form>
  );
}