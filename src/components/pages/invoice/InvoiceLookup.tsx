import { useState, type FormEvent } from "react";
import { FileText } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { InvoiceDownloadButton } from "./InvoiceDownloadButton";

export function InvoiceLookup({ initialId = "" }: { initialId?: string }) {
  const [transactionId, setTransactionId] = useState(initialId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-20">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileText size={28} />
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold md:text-4xl">Télécharger ma facture</h1>
            <p className="mt-3 text-muted-foreground">
              Saisissez l’identifiant de transaction SPC indiqué sur le reçu FedaPay pour récupérer votre facture.
              Elle est disponible en ligne pendant 7 jours après le paiement.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <label htmlFor="invoice-transaction-id" className="block text-sm font-medium">
              Identifiant de transaction SPC
            </label>
            <input
              id="invoice-transaction-id"
              type="text"
              required
              autoComplete="off"
              value={transactionId}
              onChange={(event) => setTransactionId(event.target.value)}
              placeholder="Ex. xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx"
              className="input w-full font-mono"
            />
            <InvoiceDownloadButton transactionId={transactionId} />
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
