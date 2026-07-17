import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, AlertCircle, Check, User } from "lucide-react";
import { CategoryCheckboxList } from "./CategoryCheckboxList";
import { UnsubscribeSection } from "./UnsubscribeSection";
import { fetchNewsletterPreferences, updateNewsletterPreferences } from "@/stores/useNewsletterStore";
import type { APINewsletterSubscription } from "@/data/newsletter";

interface PreferencesFormProps {
  token: string;
}

type LoadState = "loading" | "loaded" | "not-found" | "error";

export function PreferencesForm({ token }: PreferencesFormProps) {
  const [state, setState] = useState<LoadState>("loading");
  const [subscription, setSubscription] = useState<APINewsletterSubscription | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState("loading");

    fetchNewsletterPreferences(token)
      .then((sub) => {
        if (cancelled) return;
        setSubscription(sub);
        setSelected(sub.categories.map((c) => c.id));
        setState("loaded");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const toggle = (categoryId: string) => {
    setSaved(false);
    setSelected((prev) => (prev.includes(categoryId) ? prev.filter((x) => x !== categoryId) : [...prev, categoryId]));
  };

  const handleSave = async () => {
    setSaveError(null);
    setIsSaving(true);
    try {
      const updated = await updateNewsletterPreferences({ token, categoryIds: selected });
      setSubscription(updated);
      setSaved(true);
      toast.success("Préférences enregistrées", {
        description: updated.categories.length > 0
          ? `Vous recevrez désormais des contenus sur ${updated.categories.map((c) => c.name).join(", ")}.`
          : "Vous ne recevrez plus de contenu par sujet spécifique.",
      });
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaveError("Une erreur est survenue lors de l'enregistrement. Merci de réessayer.");
      toast.error("Échec de l'enregistrement", {
        description: "Merci de réessayer dans quelques instants.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center text-sm text-muted-foreground">
        <Loader2 size={24} className="animate-spin" />
        Chargement de vos préférences…
      </div>
    );
  }

  if (state === "not-found" || state === "error") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle size={28} />
        </div>
        <h2 className="font-display text-xl font-bold">Lien invalide ou expiré</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Ce lien de gestion des préférences n'est plus valide. Utilisez le lien le plus récent reçu dans nos emails.
        </p>
      </div>
    );
  }

  if (!subscription) return null;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold">
            {subscription.firstName ? `${subscription.firstName} ${subscription.lastName ?? ""}`.trim() : subscription.email}
          </p>
          <p className="text-xs text-muted-foreground">{subscription.email}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-medium">Sujets qui vous intéressent</p>
        <CategoryCheckboxList selected={selected} onToggle={toggle} />
      </div>

      {saveError && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <p>{saveError}</p>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Enregistrement…
          </>
        ) : saved ? (
          <>
            <Check size={16} /> Préférences enregistrées
          </>
        ) : (
          "Enregistrer mes préférences"
        )}
      </button>

      <UnsubscribeSection token={token} />
    </div>
  );
}