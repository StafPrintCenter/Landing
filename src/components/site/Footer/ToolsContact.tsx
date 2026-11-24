import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE, FOOTER_ACTION_LINKS } from "@/data/site";
import { WhatsAppIcon } from "../icons";

export function FooterToolsContact() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
          Outils
        </h4>
        <div className="mt-4 flex flex-col gap-1">
          {FOOTER_ACTION_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="group inline-flex items-center gap-2.5 text-xs font-medium text-secondary-foreground/90 hover:text-accent transition-colors w-fit"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon size={13} />
                </span>
                <span className="group-hover:underline underline-offset-4">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
          Contact
        </h4>
        <ul className="mt-4 space-y-3 text-xs">
          <li className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 text-accent shrink-0" />
            <a
              href={SITE.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {SITE.city}
            </a>
          </li>
          <li className="flex items-start gap-2">
            <Phone size={16} className="mt-0.5 text-accent shrink-0" />
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
              {SITE.phone}
            </a>
          </li>
          <li className="flex items-start gap-2">
            <WhatsAppIcon size={16} className="mt-0.5 text-accent shrink-0" />
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {SITE.whatsapp}
            </a>
          </li>
          <li className="flex items-start gap-2">
            <Mail size={16} className="mt-0.5 text-accent shrink-0" />
            <a href={`mailto:${SITE.email}`} className="hover:text-accent transition-colors break-all">
              {SITE.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
