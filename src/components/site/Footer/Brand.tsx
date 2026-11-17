import { Link } from "@tanstack/react-router";
import { SITE, FOOTER_LEGAL_LINKS } from "@/data/site";
import logo from "@/assets/logos.json";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon, XIcon } from "../icons";

const SOCIAL_LINKS = [
  { href: SITE.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: SITE.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SITE.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SITE.socials.x, label: "X (Twitter)", Icon: XIcon },
  { href: SITE.socials.tiktok, label: "TikTok", Icon: TiktokIcon },
];

export function FooterBrand() {
  return (
    <div className="md:col-span-2 flex flex-col justify-between">
      <div>
        <Link to="/" className="flex items-center">
          <img src={logo.dw} alt={`LOGO ${SITE.name}`} className="h-14 w-auto" />
        </Link>
        <p className="mt-4 max-w-sm text-sm text-secondary-foreground/70 leading-relaxed">
          Depuis 2019, nous accompagnons votre vision jusqu'à ce qu'elle devienne visible.
        </p>

        <div className="mt-6 flex gap-3">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <span className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-secondary-foreground/60">
        {FOOTER_LEGAL_LINKS.map((link, index) => {
          const linkKey = "to" in link ? link.to : link.href;
          const isExternal = "href" in link;

          return (
            <span key={linkKey || index} className="inline-flex items-center gap-3">
              {isExternal ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link to={link.to} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              )}
              {index < FOOTER_LEGAL_LINKS.length - 1 && (
                <span className="h-3 w-px bg-secondary-foreground/20 inline-block" aria-hidden />
              )}
            </span>
          );
        })}
      </span>
    </div>
  );
}
