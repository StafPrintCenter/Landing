import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { useUI } from "@/store/ui";
import logo from "@/assets/logos.json";
import { SearchDialog } from "@/components/modal";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { mobileOpen, toggleMobile, setMobileOpen } = useUI();
  const { pathname, hash } = useRouterState({ select: (s) => s.location });
  const isLinkActive = (to: string) => {
    if (to === "/") return pathname === "/" && !hash;
    if (to.startsWith("/#")) return pathname === "/" && hash === to.slice(2);
    return pathname === to || pathname.startsWith(to + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <img src={logo.dc} alt="Logo SPC" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => {
            const active = isLinkActive(l.to);
            const cls = `text-sm font-medium transition-colors ${active ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"}`;
            return l.to.startsWith("/#") ? (
              <a key={l.to} href={l.to} className={cls}>{l.label}</a>
            ) : (
              <Link key={l.to} to={l.to} className={cls}>{l.label}</Link>
            );
          })}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Rechercher"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition hover:bg-muted hover:text-primary"
          >
            <Search size={18} />
          </button>
          <a href="/#contact" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90">
            Demander un devis
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Rechercher"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground/80"
          >
            <Search size={18} />
          </button>
          <button aria-label="Menu" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background" onClick={toggleMobile}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Arrière-plan (Overlay) qui détecte le clic dans le vide */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Contenu du menu mobile */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative z-50 border-t border-border bg-background md:hidden"
            >
              <div className="container-x flex flex-col gap-1 py-4">
                {NAV_LINKS.map((l) => {
                  const active = isLinkActive(l.to);
                  const cls = `rounded-md px-3 py-3 text-base font-medium ${active ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`;
                  return l.to.startsWith("/#") ? (
                    <a key={l.to} href={l.to} className={cls} onClick={() => setMobileOpen(false)}>{l.label}</a>
                  ) : (
                    <Link key={l.to} to={l.to} className={cls} onClick={() => setMobileOpen(false)}>{l.label}</Link>
                  );
                })}
                <a href="/#contact" className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground" onClick={() => setMobileOpen(false)}>
                  Demander un devis
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}