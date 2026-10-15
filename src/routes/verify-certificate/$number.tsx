import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { useCertificateVerification } from "@/stores/useCertificatesStore";
import {
  CertificateHeader,
  CertificateResultCard,
  CertificateNotFoundState,
} from "@/components/pages/certificates";

export const Route = createFileRoute("/verify-certificate/$number")({
  head: () => ({
    meta: [
      { title: `Vérification de certificat | ${SITE.name}` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VerifyCertificatePage,
});

function VerifyCertificatePage() {
  const { number } = Route.useParams();
  const { certificate, isLoading, isError, refetch } = useCertificateVerification(number);

  return (
    <SiteShell>
      <section className="container-x max-w-3xl py-16">
        <CertificateHeader />

        <div className="mt-10">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-sm text-muted-foreground">
              <Loader2 size={24} className="animate-spin" />
              Vérification en cours…
            </div>
          ) : isError ? (
            <CertificateNotFoundState number={number} isError onRetry={() => refetch()} />
          ) : !certificate ? (
            <CertificateNotFoundState number={number} />
          ) : (
            <CertificateResultCard number={number} certificate={certificate} />
          )}
        </div>
      </section>
    </SiteShell>
  );
}