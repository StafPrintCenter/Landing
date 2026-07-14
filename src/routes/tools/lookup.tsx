import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Loader2, AlertCircle, Mail, Tag, Calendar, MessageSquare, Ticket } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { trackContactRequest } from "@/stores/useContactStore";
import { CONTACT_STATUS_LABELS, CONTACT_STATUS_COLORS, type APIContactRequest } from "@/data/contact";

export const Route = createFileRoute("/tools/lookup")({
  head: () => ({
    meta: [
      { title: `Suivre ma demande | ${SITE.name}` },
      { name: "description", content: "Suivez l'état de votre demande de contact envoyée à STAF PRINT CENTER à l'aide de votre email et de votre numéro de ticket." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LookupPage,
});

type LookupState = "idle" | "loading" | "found" | "not-found" | "error";

function LookupPage() {
  const [email, setEmail] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [state, setState] = useState<LookupState>("idle");
  const [result, setResult] = useState<APIContactRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !ticketNumber.trim()) return;

    setState("loading");
    try {
      const found = await trackContactRequest({ email: email.trim(), ticketNumber: ticketNumber.trim() });
      if (found) {
        setResult(found);
        setState("found");
      } else {
        setResult(null);
        setState("not-found");
      }
    } catch {
      setResult(null);
      setState("error");
    }
  };

  return (
    <SiteShell>
      <section className="container-x py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Suivi de demande</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">Où en est ma demande ?</h1>
          <p className="mt-3 text-muted-foreground">
            Entrez l'adresse email utilisée et le numéro de ticket reçu après l'envoi de votre message
            pour connaître l'état de son traitement.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Adresse email</span>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input w-full pl-10"
                placeholder="vous@exemple.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Numéro de ticket</span>
            <div className="relative flex items-center">
              <Ticket size={16} className="absolute left-3 text-muted-foreground" />
              <input
                type="text"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
                required
                className="input w-full pl-10 font-mono"
                placeholder="SPC-20260713_165450-ZDZ2"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={state === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60 cursor-pointer"
          >
            {state === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Recherche...
              </>
            ) : (
              <>
                <Search size={16} /> Rechercher
              </>
            )}
          </button>

          {state === "not-found" && (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>Aucune demande ne correspond à cette adresse email et à ce numéro de ticket. Vérifiez ces informations et réessayez.</p>
            </div>
          )}

          {state === "error" && (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>Une erreur est survenue lors de la recherche. Merci de réessayer dans quelques instants.</p>
            </div>
          )}
        </form>

        {state === "found" && result && (
          <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-sm font-semibold text-foreground">{result.ticketNumber}</span>
              <span
                className={[
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                  CONTACT_STATUS_COLORS[result.status],
                ].join(" ")}
              >
                {CONTACT_STATUS_LABELS[result.status]}
              </span>
            </div>

            <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <Tag size={15} className="mt-0.5 shrink-0" />
                <span>
                  Service : <span className="font-medium text-foreground">{result.customService ?? result.service}</span>
                </span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Calendar size={15} className="mt-0.5 shrink-0" />
                <span>
                  Envoyée le{" "}
                  <span className="font-medium text-foreground">
                    {new Date(result.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>
                </span>
              </div>
              {result.handledAt && (
                <div className="flex items-start gap-2 text-muted-foreground">
                  <Calendar size={15} className="mt-0.5 shrink-0" />
                  <span>
                    Traitée le{" "}
                    <span className="font-medium text-foreground">
                      {new Date(result.handledAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                    </span>
                  </span>
                </div>
              )}
              <div className="flex items-start gap-2 text-muted-foreground">
                <MessageSquare size={15} className="mt-0.5 shrink-0" />
                <p className="leading-relaxed">{result.message}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </SiteShell>
  );
}