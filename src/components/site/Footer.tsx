import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { SITE, NAV_LINKS, FOOTER_LINKS } from "@/data/site";
import { useServicesStore } from "@/stores/useServicesStore";
import logo from "@/assets/logos.json";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function Footer() {
  const { services } = useServicesStore({ perPage: 100 });

  const footerServices = [
    ...(services || []).filter((s) => s.featured),
    ...(services || []).filter((s) => !s.featured),
  ].slice(0, 5);

  return (
    <footer className="mt-24 border-t border-border bg-secondary text-secondary-foreground">
      {/* Modification ici : md:grid-cols-5 pour garder des proportions équilibrées avec le col-span-2 */}
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center">
            <img src={logo.dw} alt={`LOGO ${SITE.name}`} className="h-14 w-auto" />
          </Link>
          <p className="mt-3 text-sm text-secondary-foreground/70">
            Depuis 2019, nous accompagnons votre vision jusqu'à ce qu'elle devienne visible.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Navigation</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <a href={l.to} className="hover:text-accent">{l.label}</a>
              </li>
            ))}
            <li><Link to="/" hash="contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        {/* ── Services dynamiques ── */}
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
            {footerServices.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/"
                  hash="services"
                  search={{ service: s.slug }}
                  className="hover:text-accent transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/services"
                search={{ category: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
                className="hover:text-accent"
              >
                Plus ...
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Contact</h4>

          {/* ── Contacts ── */}
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-accent" />
              <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{SITE.city}</a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-accent shrink-0" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <WhatsAppIcon size={16} className="mt-0.5 text-accent" />
              <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{SITE.whatsapp}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-accent shrink-0" />
              <a href={`mailto:${SITE.email}`} className="hover:text-accent transition-colors">
                {SITE.email}
              </a>
            </li>
          </ul>

          {/* ── Liens sociaux ── */}
          <div className="mt-4 flex gap-3">
            <a href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground"><Facebook size={16} /></a>
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground"><Instagram size={16} /></a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground"><Linkedin size={16} /></a>
            <a href={SITE.socials.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground"><Twitter size={16} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-center gap-3 py-5 text-xs text-secondary-foreground/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()}  {SITE.name} - Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {FOOTER_LINKS.map((l, i) => (
              <span key={l.to} className="flex items-center gap-4">
                <Link to={l.to} className="hover:text-accent transition-colors">
                  {l.label}
                </Link>
                {i < FOOTER_LINKS.length - 1 && (
                  <span className="hidden h-3 w-px bg-secondary-foreground/20 md:inline-block" aria-hidden />
                )}
              </span>
            ))}
          </div>
          <p>{SITE.slogan}</p>
        </div>
      </div>
    </footer>
  );
}