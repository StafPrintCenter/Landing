import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { CertificateHeader } from "@/components/pages/certificates";

export const Route = createFileRoute("/verify-certificate/")({
  head: () => ({
    meta: [
      { title: `Vérification de certificat | ${SITE.name}` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VerifyCertificateLookupPage,
});

function VerifyCertificateLookupPage() {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const certificateNumber = number.trim();
    if (!certificateNumber) return;

    navigate({
      to: "/verify-certificate/$number",
      params: { number: certificateNumber },
    });
  };

  return (
    <SiteShell>
      <section className="container-x max-w-3xl py-16">
        <CertificateHeader />
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <label htmlFor="certificate-number" className="block text-sm font-medium">
            Numéro du certificat
          </label>
          <input
            id="certificate-number"
            type="text"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            required
            autoComplete="off"
            className="input w-full font-mono"
            placeholder="Saisissez le code du certificat"
          />
          <button
            type="submit"
            disabled={!number.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60 cursor-pointer"
          >
            <Search size={16} /> Vérifier le certificat
          </button>
        </form>
      </section>
    </SiteShell>
  );
}
