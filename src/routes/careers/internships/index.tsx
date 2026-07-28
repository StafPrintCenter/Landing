import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import { InternshipRequestForm } from "@/components/pages/careers/internships";

export const Route = createFileRoute("/careers/internships/")({
  head: () => ({
    meta: [
      { title: `Demande de stage | ${SITE.name}` },
      { name: "description", content: `Déposez votre demande de stage chez ${SITE.name} en quelques minutes.` },
    ],
  }),
  component: InternshipsPage,
});

function InternshipsPage() {
  return (
    <SiteShell>
      <section className="container-x max-w-2xl py-16">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Stages</p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold">Demandez un stage</h1>
            <p className="mt-3 text-muted-foreground">
              Étudiant(e) à la recherche d'un stage académique ou professionnel ? Déposez votre demande, nous
              revenons vers vous rapidement.
            </p>
          </div>
        </Reveal>

        <div className="mt-8">
          <InternshipRequestForm />
        </div>
      </section>
    </SiteShell>
  );
}