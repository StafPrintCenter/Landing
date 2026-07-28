import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { InternshipRequestForm, InternshipSidebar } from "@/components/pages/careers/internships";

export const Route = createFileRoute("/careers/internship/")({
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
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar Sticky sur la gauche */}
          <InternshipSidebar />

          {/* Formulaire principal sur la droite */}
          <main className="lg:col-span-8">
            <InternshipRequestForm />
          </main>
        </div>
      </div>
    </SiteShell>
  );
}