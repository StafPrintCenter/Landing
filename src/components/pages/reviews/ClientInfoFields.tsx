import { SITE } from "@/data/site";
import { Link } from "@tanstack/react-router";

interface ClientInfoFieldsProps {
  clientName: string;
  onClientNameChange: (v: string) => void;
  clientEmail: string;
  onClientEmailChange: (v: string) => void;
  allowPublication: boolean;
  onAllowPublicationChange: (v: boolean) => void;
  privacyAccepted: boolean;
  onPrivacyAcceptedChange: (v: boolean) => void;
  errors: Record<string, string>;
  readOnlyIdentity?: boolean;
}

export function ClientInfoFields({
  clientName,
  onClientNameChange,
  clientEmail,
  onClientEmailChange,
  allowPublication,
  onAllowPublicationChange,
  privacyAccepted,
  onPrivacyAcceptedChange,
  errors,
  readOnlyIdentity = false,
}: ClientInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Votre nom {!readOnlyIdentity && <span className="text-destructive">*</span>}</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
          readOnly={readOnlyIdentity}
          disabled={readOnlyIdentity}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground"
        />
        {errors.clientName && <p className="mt-1 text-xs text-destructive">{errors.clientName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Votre email {!readOnlyIdentity && <span className="text-destructive">*</span>}</label>
        <input
          type="email"
          value={clientEmail}
          onChange={(e) => onClientEmailChange(e.target.value)}
          readOnly={readOnlyIdentity}
          disabled={readOnlyIdentity}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground"
        />
        {errors.clientEmail && <p className="mt-1 text-xs text-destructive">{errors.clientEmail}</p>}
      </div>

      {readOnlyIdentity && (
        <p className="text-[11px] text-muted-foreground">
          Votre nom et votre email ne sont plus modifiables lors de la mise à jour d'un avis.
        </p>
      )}

      <div className="space-y-3 border-t border-border pt-4">
        <label className="flex items-start gap-2 text-xs text-foreground/70 cursor-pointer">
          <input
            type="checkbox"
            checked={allowPublication}
            onChange={(e) => onAllowPublicationChange(e.target.checked)}
            className="mt-0.5 cursor-pointer"
          />
          <span>J'accepte que mon avis soit publié publiquement sur le site {SITE.name}.</span>
        </label>

        {!readOnlyIdentity && (
          <label className="flex items-start gap-2 text-xs text-foreground/70 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => onPrivacyAcceptedChange(e.target.checked)}
              className="mt-0.5 cursor-pointer"
            />
            <span>
              J'accepte la{" "}
              <Link
                to="/legal/mentions"
                onClick={(e) => e.stopPropagation()}
                className="text-primary hover:underline"
              >
                politique de confidentialité
              </Link>{" "}
              de {SITE.name}. <span className="text-destructive">*</span>
            </span>
          </label>
        )}
        {errors.privacyAccepted && <p className="text-xs text-destructive">{errors.privacyAccepted}</p>}
      </div>
    </div>
  );
}