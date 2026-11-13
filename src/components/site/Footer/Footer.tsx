import type { APIService } from "@/data/services";
import type { APIEcosystemSite } from "@/data/ecosystem";
import { useServicesStore } from "@/stores/useServicesStore";
import { useEcosystemSitesStore } from "@/stores/useEcosystemSitesStore";
import { FooterBrand } from "./FooterBrand";
import { FooterCopyright } from "./FooterCopyright";
import { FooterResourceColumns } from "./FooterResourceColumns";
import { FooterToolsContact } from "./FooterToolsContact";

const PRIORITY_NAMES = [
  "SPC Intelligence",
  "SPC Interactive Brief",
  "SPC Creative Toolkit",
  "SPC 3D Studio",
  "SPC Site Builder",
  "SPC Arcade",
];
const EXCLUDED_NAMES = ["Site vitrine", "Documentation officielle"];

function getFooterServices(services: APIService[]): APIService[] {
  return [
    ...services.filter((service) => service.featured),
    ...services.filter((service) => !service.featured),
  ].slice(0, 6);
}

function getFooterEcosystems(sites: APIEcosystemSite[]): APIEcosystemSite[] {
  const filteredSites = sites.filter(
    (site) => site.status === "available" && !EXCLUDED_NAMES.includes(site.name)
  );
  const prioritySites = PRIORITY_NAMES.map((name) =>
    filteredSites.find((site) => site.name === name)
  ).filter((site): site is APIEcosystemSite => Boolean(site));
  const otherSites = filteredSites
    .filter((site) => !PRIORITY_NAMES.includes(site.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...prioritySites, ...otherSites].slice(0, 6);
}

export function Footer() {
  const { services } = useServicesStore({ perPage: 100 });
  const { sites } = useEcosystemSitesStore({ perPage: 100 });
  const footerServices = getFooterServices(services);
  const footerEcosystems = getFooterEcosystems(sites);
  const availableEcosystemCount = sites.filter(
    (site) => site.status === "available" && !EXCLUDED_NAMES.includes(site.name)
  ).length;

  return (
    <footer className="mt-24 border-t border-border bg-secondary text-secondary-foreground">
      <div className="container-x grid gap-12 py-14 md:grid-cols-6">
        <FooterBrand />
        <div className="md:col-span-4 flex flex-col gap-10">
          <FooterResourceColumns
            services={footerServices}
            ecosystems={footerEcosystems}
            hasMoreServices={services.length > 6}
            hasMoreEcosystems={availableEcosystemCount > 6}
          />
          <div className="border-t border-white/10" />
          <FooterToolsContact />
        </div>
      </div>
      <FooterCopyright />
    </footer>
  );
}
