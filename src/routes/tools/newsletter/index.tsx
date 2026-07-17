import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import {
  NewsletterHeader,
  NewsletterBenefits,
  NewsletterSubscribeForm
} from "@/components/pages/tools/newsletter/home";

export const Route = createFileRoute("/tools/newsletter/")({
  head: () => ({
    meta: [
      { title: `Newsletter | ${SITE.name}` },
      { name: "description", content: "Recevez chaque mois nos conseils design, impression et digital, plus les offres exclusives de STAF PRINT CENTER." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NewsletterPage,
});

function NewsletterPage() {
  return (
    <SiteShell>
      <section className="container-x max-w-5xl py-16">
        <NewsletterHeader />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <NewsletterBenefits />

          <div className="rounded-2xl border border-border bg-card p-6">
            <NewsletterSubscribeForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}