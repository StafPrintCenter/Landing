import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SITE } from "@/data/site";
import { SiteShell } from "@/components/site/SiteShell";
import {
  Hero,
  Stats,
  ServicesPreview,
  WhyUs,
  ProjectsPreview,
  FormationsPreview,
  Testimonials,
  BlogPreview,
  Contact,
} from "@/components/pages/home";

// Cibler un service précis et préremplir une demande de devis depuis une carte de service.
const homeSearchSchema = z.object({
  quote: z.string().optional(),
  service: z.string().optional(),
  custom: z.string().optional(),
  details: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: homeSearchSchema,
  head: () => ({
    meta: [
      { title: `Design, Impression & Formations à Porto-Novo | ${SITE.name}` },
      { name: "description", content: "Studio créatif béninois : design graphique, impression numérique, sites web, montage vidéo et formations. Devis rapide sur WhatsApp." },
      { property: "og:title", content: `Design, Impression & Formations à Porto-Novo | ${SITE.name}` },
      { property: "og:description", content: "Donnez vie à vos idées avec un studio créatif basé à Porto-Novo." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Stats />
      <ServicesPreview />
      <WhyUs />
      <ProjectsPreview />
      <FormationsPreview />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </SiteShell>
  );
}
