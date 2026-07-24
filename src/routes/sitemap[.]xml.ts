import { createFileRoute } from "@tanstack/react-router";
import type { } from "@tanstack/react-start";
import { fetchPublicServices } from "@/stores/useServicesStore";
import { fetchPublicFormations } from "@/stores/useTrainingsStore";
import { fetchPublicArticles } from "@/stores/useArticlesStore";

const BASE_URL = import.meta.env.VITE_SITE_URL;

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "weekly", priority: "0.8" },
          { path: "/projects", changefreq: "weekly", priority: "0.8" },
          { path: "/trainings", changefreq: "weekly", priority: "0.8" },
          { path: "/articles", changefreq: "weekly", priority: "0.7" },
          { path: "/legal/mentions", changefreq: "yearly", priority: "0.2" },
          { path: "/legal/cgv", changefreq: "yearly", priority: "0.2" },
          { path: "/legal/privacy", changefreq: "yearly", priority: "0.2" },
        ];

        // Récupération dynamique depuis l'API — perPage élevé pour tout couvrir
        const [servicesRes, formationsRes, articlesRes] = await Promise.all([
          fetchPublicServices({ perPage: 500 }),
          fetchPublicFormations({ perPage: 500 }),
          fetchPublicArticles({ perPage: 500 }),
        ]);

        for (const s of servicesRes.data) {
          entries.push({ path: `/services/${s.slug}`, changefreq: "monthly", priority: "0.7" });
        }
        for (const f of formationsRes.data) {
          entries.push({ path: `/trainings/${f.id}`, changefreq: "monthly", priority: "0.7" });
        }
        for (const a of articlesRes.data) {
          entries.push({ path: `/articles/${a.slug}`, changefreq: "monthly", priority: "0.6" });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});