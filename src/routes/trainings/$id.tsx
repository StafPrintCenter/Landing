import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { type APIFormation } from "@/data/trainings";
import { fetchFormationById, useFormationsStore } from "@/stores/useTrainingsStore";
import { SITE } from "@/data/site";
import {
  FormationDetailHeader,
  FormationDetailSkeleton,
  FormationDetailProgram,
  FormationDetailSidebar,
  FormationDetailRelated,
  FormationDetailNotFound,
  FormationDetailError,
} from "@/components/pages/training/detail";

export const Route = createFileRoute("/trainings/$id")({
  pendingMs: 0,

  loader: async ({ params }) => {
    const formation = await fetchFormationById(params.id);
    if (!formation) throw notFound();
    return { formation };
  },

  head: ({ loaderData, params }) => {
    const f = loaderData?.formation;
    const title = f ? `${f.title} | Formation ${SITE.name}` : `Formation ${SITE.name}`;
    const desc = f ? `${f.short} — ${f.duration}, niveau ${f.level}. ${f.price} à Porto-Novo.` : "";
    const url = `/training/${params.id}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: f
        ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: f.title,
              description: f.short,
              provider: {
                "@type": "Organization",
                name: SITE.name,
                sameAs: SITE.socials.facebook,
              },
              educationalLevel: f.level,
              timeRequired: f.duration,
              offers: {
                "@type": "Offer",
                price: String(f.price),
                priceCurrency: "XOF",
                category: "Paid",
                availability: "https://schema.org/InStock",
              },
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "onsite",
                location: { "@type": "Place", name: "Porto-Novo, Bénin" },
              },
            }),
          },
        ]
        : [],
    };
  },
  component: FormationDetail,

  pendingComponent: FormationDetailSkeleton,
  notFoundComponent: FormationDetailNotFound,
  errorComponent: FormationDetailError,
});

function FormationDetail() {
  const data = Route.useLoaderData() as { formation: APIFormation };
  const f = data.formation;

  // Formations liées : mêmes thème, hors formation courante
  const { formations: relatedRaw } = useFormationsStore({ category: f.theme, perPage: 3 });
  const related = relatedRaw.filter((x) => x.id !== f.id).slice(0, 2);

  return (
    <SiteShell>
      <FormationDetailHeader formation={f} />

      <section className="container-x grid gap-12 py-16 md:grid-cols-3">
        <FormationDetailProgram formation={f} />
        <FormationDetailSidebar formation={f} />
      </section>

      <FormationDetailRelated related={related} />
    </SiteShell>
  );
}
