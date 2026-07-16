import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode } from "react";
import appCss from "../styles.css?url";
import { SITE } from "@/data/site";
import logo from "@/assets/logos.json";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { NotFoundComponent, ErrorComponent } from "@/components/errors";

const DEFAULT_TITLE = `${SITE.name} - ${SITE.activity}`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const canonicalUrl = buildShareUrl("/");

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: DEFAULT_TITLE },
        { name: "description", content: "Studio de design graphique, impression numérique, web et formations créatives à Porto-Novo, Bénin." },
        { name: "author", content: `${SITE.manager}` },
        { name: "keywords", content: "graphiste, Porto-Novo, Bénin, impression, numérique, web, formation, créatives, logo, carte, visite, flyer, affiche, site, web, développement, web, formation, graphisme, photographie, Steve, Aster, Afovo, Stafast, Staf, print, center, artistique, studio, photo, événementiel, corporate" },
        { property: "og:title", content: DEFAULT_TITLE },
        { property: "og:description", content: `${SITE.slogan}, ${SITE.activity}` },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: `${SITE.name}` },
        { property: "og:image", content: `${logo.meta}` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: `${SITE.name} - ${SITE.activity}` },
        { property: "og:url", content: canonicalUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${logo.meta}` },
        { name: "twitter:title", content: `${SITE.name} - ${SITE.activity}` },
        { name: "twitter:description", content: `${SITE.slogan}, ${SITE.activity}` },
        { name: "twitter:site", content: "@StafPrintCenter" },
        { name: "google-site-verification", content: "OdKxHpVkBSxk0mj4vD4OTmZPdVi5pWzyCu4QPIMHy9A" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: SITE.name,
            image: "https://stafprint.netlify.app/logo.png",
            url: SITE.url,
            alternateName: 'SPC',
            description: "Studio de design graphique, impression numérique, web et formations créatives à Porto-Novo, Bénin.",
            founder: { "@type": "Person", name: SITE.manager },
            telephone: SITE.phone.replace(/\s/g, ""),
            email: SITE.email,
            areaServed: [
              { "@type": "AdministrativeArea", "name": "Porto-Novo" },
              { "@type": "AdministrativeArea", "name": "Cotonou" },
              { "@type": "AdministrativeArea", "name": "Abomey-Calavi" },
              { "@type": "AdministrativeArea", "name": "Adjarra" },
              { "@type": "AdministrativeArea", "name": "Bénin" }
            ],
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              addressLocality: SITE.city,
              streetAddress: "Malanhoui Tanmey",
              addressRegion: "Ouémé",
              addressCountry: "BJ"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "6.5333",
              "longitude": "2.6833"
            },
            knowsAbout: [
              "Impression numérique",
              "Grand format",
              "Conception graphique",
              "Création de sites web",
              "Montage vidéo"
            ]
          }),
        },
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
    </QueryClientProvider>
  );
}
