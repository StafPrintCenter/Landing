import { createFileRoute } from "@tanstack/react-router";
import { InvoiceLookup } from "@/components/pages/invoice/InvoiceLookup";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/invoice/$id")({
  head: () => ({
    meta: [
      { title: `Télécharger ma facture | ${SITE.name}` },
      { name: "description", content: "Récupérez votre facture de paiement avec votre identifiant de transaction SPC." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InvoiceByIdPage,
});

function InvoiceByIdPage() {
  const { id } = Route.useParams();
  return <InvoiceLookup initialId={id} />;
}
