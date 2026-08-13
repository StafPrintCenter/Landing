import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";
import { SITE } from "@/data/site";
import logo from "@/assets/logos.json";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { NotFoundComponent, ErrorComponent } from "@/components/errors";

// Titre & Description
const OPTIMIZED_TITLE = `${SITE.name} | Studio Créatif, Imprimerie & Web à Porto-Novo ⚡`;
const OPTIMIZED_DESC = "Impression numérique (bâches, badges, cartes), design graphique, création web & formations pratiques à Porto-Novo. Devis sous 24h & livraison rapide au Bénin !";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const canonicalUrl = buildShareUrl("/");

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
        { title: OPTIMIZED_TITLE },
        { name: "description", content: OPTIMIZED_DESC },
        { name: "author", content: `${SITE.manager}` },
        {
          name: "keywords",
          content: "imprimerie Porto-Novo, impression bâche Bénin, badge professionnel, formation InDesign, création site web Porto-Novo, graphiste Bénin, STAF PRINT CENTER, studio graphique, Géré par Steve Aster Afovo Devis gratuit sous 24H"
        },

        /* Open Graph / Facebook / WhatsApp */
        { property: "og:title", content: OPTIMIZED_TITLE },
        { property: "og:description", content: OPTIMIZED_DESC },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: `${SITE.name}` },
        { property: "og:image", content: `${logo.meta}` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: `${SITE.name} - ${SITE.activity}` },
        { property: "og:url", content: canonicalUrl },
        { property: "og:locale", content: "fr_BJ" },

        /* Twitter / X */
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${logo.meta}` },
        { name: "twitter:title", content: OPTIMIZED_TITLE },
        { name: "twitter:description", content: OPTIMIZED_DESC },
        { name: "twitter:site", content: "@StafPrintCenter" },

        /* Google Verification */
        { name: "google-site-verification", content: "OdKxHpVkBSxk0mj4vD4OTmZPdVi5pWzyCu4QPIMHy9A" },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      ],
      scripts: [
        /* 1. Schéma LocalBusiness */
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PrintShop",
            "@id": `${SITE.url}/#organization`,
            name: SITE.name,
            alternateName: ["SPC", "STAF PRINT"],
            image: logo.meta,
            logo: logo.meta,
            url: SITE.url,
            description: OPTIMIZED_DESC,
            founder: { "@type": "Person", name: SITE.manager },
            telephone: SITE.phone.replace(/\s/g, ""),
            email: SITE.email,
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Porto-Novo",
              streetAddress: "Malanhoui Tanmey",
              addressRegion: "Ouémé",
              addressCountry: "BJ"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 6.4969,
              longitude: 2.6283
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "19:00"
              }
            ],
            areaServed: [
              { "@type": "City", name: "Porto-Novo" },
              { "@type": "City", name: "Cotonou" },
              { "@type": "City", name: "Abomey-Calavi" },
              { "@type": "Country", name: "Bénin" }
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Services d'Impression & Design",
              itemListElement: [
                { "@type": "Offer", name: "Impression Bâches & Kakémonos" },
                { "@type": "Offer", name: "Impression Badges & Cartes de visite" },
                { "@type": "Offer", name: "Création de Sites Web & SEO" },
                { "@type": "Offer", name: "Formations Graphisme & Motion Design" }
              ]
            }
          }),
        },
        /* 2. Schéma WebSite (Favorise l'apparition des Sitelinks sur Google) */
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE.url}/#website`,
            url: SITE.url,
            name: SITE.name,
            publisher: { "@id": `${SITE.url}/#organization` },
            inLanguage: "fr-BJ"
          }),
        }
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster richColors position="bottom-left" closeButton />
    </QueryClientProvider>
  );
}
