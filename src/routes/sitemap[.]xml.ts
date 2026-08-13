import { createFileRoute } from "@tanstack/react-router";
import type { } from "@tanstack/react-start";
import { fetchPublicServices } from "@/stores/useServicesStore";
import { fetchPublicFormations } from "@/stores/useTrainingsStore";
import { fetchPublicArticles } from "@/stores/useArticlesStore";
import { fetchPublicJobOffers } from "@/stores/useJobsStore";

const RAW_URL = import.meta.env.VITE_FRONTEND_URL || "https://stafprint.com";
const BASE_URL = RAW_URL.replace(/\/$/, "");

const TODAY = new Date().toISOString().split("T")[0];

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return TODAY;
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch {
    return TODAY;
  }
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // 2. Pages statiques avec <lastmod>
        const entries: SitemapEntry[] = [
          { path: "/", lastmod: TODAY, changefreq: "weekly", priority: "1.0" },
          { path: "/services", lastmod: TODAY, changefreq: "weekly", priority: "0.8" },
          { path: "/projects", lastmod: TODAY, changefreq: "weekly", priority: "0.8" },
          { path: "/trainings", lastmod: TODAY, changefreq: "weekly", priority: "0.8" },
          { path: "/articles", lastmod: TODAY, changefreq: "weekly", priority: "0.7" },
          { path: "/faqs", lastmod: TODAY, changefreq: "weekly", priority: "0.7" },
          { path: "/careers/offers", lastmod: TODAY, changefreq: "weekly", priority: "0.7" },
          { path: "/tools/appointment", lastmod: TODAY, changefreq: "yearly", priority: "0.2" },
          { path: "/tools/newsletter", lastmod: TODAY, changefreq: "yearly", priority: "0.2" },
          { path: "/legal/mentions", lastmod: TODAY, changefreq: "yearly", priority: "0.2" },
          { path: "/legal/cgv", lastmod: TODAY, changefreq: "yearly", priority: "0.2" },
          { path: "/legal/privacy", lastmod: TODAY, changefreq: "yearly", priority: "0.2" },
        ];

        // Récupération dynamique depuis l'API
        const [servicesRes, formationsRes, articlesRes, jobsRes] = await Promise.all([
          fetchPublicServices({ perPage: 500 }),
          fetchPublicFormations({ perPage: 500 }),
          fetchPublicArticles({ perPage: 500 }),
          fetchPublicJobOffers({ perPage: 500 }),
        ]);

        // 3. Traitement des entités dynamiques + dates réelles de modification
        for (const s of servicesRes.data) {
          entries.push({
            path: `/services/${s.slug}`,
            lastmod: formatDate(s.updatedAt || s.createdAt),
            changefreq: "monthly",
            priority: "0.7",
          });
        }

        for (const f of formationsRes.data) {
          // Utilise le slug SEO si disponible, sinon fallback sur l'id
          const formationIdentifier = f.slug || f.id;
          entries.push({
            path: `/trainings/${formationIdentifier}`,
            lastmod: formatDate(f.updatedAt || f.createdAt),
            changefreq: "monthly",
            priority: "0.7",
          });
        }

        for (const a of articlesRes.data) {
          entries.push({
            path: `/articles/${a.slug}`,
            lastmod: formatDate(a.updatedAt || a.publishedAt || a.createdAt),
            changefreq: "monthly",
            priority: "0.6",
          });
        }

        for (const j of jobsRes.data) {
          // Correction du slash manquant avant le slug
          const jobPath = j.slug.startsWith("/") ? j.slug : `/${j.slug}`;
          entries.push({
            path: `/careers/offers${jobPath}`,
            lastmod: formatDate(j.updatedAt || j.createdAt),
            changefreq: "monthly",
            priority: "0.6",
          });
        }

        // 4. Génération du balisage XML propre
        const urls = entries.map((e) => {
          const cleanPath = e.path.startsWith("/") ? e.path : `/${e.path}`;
          const fullUrl = `${BASE_URL}${cleanPath}`;

          return [
            `  <url>`,
            `    <loc>${fullUrl}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          },
        });
      },
    },
  },
});