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
}: ClientInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Votre nom <span className="text-destructive">*</span></label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
        />
        {errors.clientName && <p className="mt-1 text-xs text-destructive">{errors.clientName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Votre email <span className="text-destructive">*</span></label>
        <input
          type="email"
          value={clientEmail}
          onChange={(e) => onClientEmailChange(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
        />
        {errors.clientEmail && <p className="mt-1 text-xs text-destructive">{errors.clientEmail}</p>}
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        <label className="flex items-start gap-2 text-xs text-foreground/70 cursor-pointer">
          <input
            type="checkbox"
            checked={allowPublication}
            onChange={(e) => onAllowPublicationChange(e.target.checked)}
            className="mt-0.5 cursor-pointer"
          />
          <span>
            J'accepte la{" "}
            <Link
              to="/legal/mentions"
              onClick={(e) => e.stopPropagation()}
              className="text-primary underline transition-colors hover:text-primary/80"
            >
              politique de confidentialité
            </Link>{" "}
            de {SITE.name}. <span className="text-destructive">*</span>
          </span>
        </label>

        <label className="flex items-start gap-2 text-xs text-foreground/70 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => onPrivacyAcceptedChange(e.target.checked)}
            className="mt-0.5 cursor-pointer"
          />
          <span>J'accepte la politique de confidentialité de {SITE.name}. <span className="text-destructive">*</span></span>
        </label>
        {errors.privacyAccepted && <p className="text-xs text-destructive">{errors.privacyAccepted}</p>}
      </div>
    </div>
  );
}