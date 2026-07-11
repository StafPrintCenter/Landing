import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Facebook, Linkedin, Twitter, X, Share2, Link2, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/icons/WhatsAppIcon";
import { useShortUrl } from "@/hooks/use-short-url";
import {
  buildWhatsAppShareLink,
  buildFacebookShareLink,
  buildLinkedInShareLink,
  buildTwitterShareLink,
  copyShareLink,
  canUseNativeShare,
  nativeShare,
  type ShareContent,
} from "@/lib/share/share-links";

interface ShareModalProps extends ShareContent {
  isOpen: boolean;
  onClose: () => void;
  /**
   * Catégorie du lien court côté API (ex: "blog", "project", "training", "service", "faq").
   * Si omise, le lien long d'origine est affiché tel quel, sans raccourcissement.
   */
  shortlinkCategory?: string;
}

export function ShareModal({ url, title, text, isOpen, onClose, shortlinkCategory }: ShareModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  const { shortUrl } = useShortUrl(url, shortlinkCategory ?? "", !!shortlinkCategory);
  const displayUrl = shortlinkCategory ? shortUrl : url;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const content: ShareContent = { url: displayUrl, title, text };

  const handleCopy = async () => {
    const ok = await copyShareLink(displayUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOther = async () => {
    const shared = canUseNativeShare() ? await nativeShare(content) : false;
    if (!shared) await handleCopy();
  };

  const socials = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon size={20} />,
      href: buildWhatsAppShareLink(content),
      className: "bg-[#25D366] text-white",
    },
    {
      name: "Facebook",
      icon: <Facebook size={20} />,
      href: buildFacebookShareLink(content),
      className: "bg-[#1877F2] text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      href: buildLinkedInShareLink(content),
      className: "bg-[#0A66C2] text-white",
    },
    {
      name: "Twitter / X",
      icon: <Twitter size={20} />,
      href: buildTwitterShareLink(content),
      className: "bg-black text-white",
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl border border-border bg-card p-6 md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Share2 size={18} className="text-primary" /> Partager
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-1 truncate text-sm text-muted-foreground">{title}</p>

        <div className="mt-6 grid grid-cols-4 gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-90 ${s.className}`}
              >
                {s.icon}
              </span>
              <span className="text-center text-xs text-muted-foreground">{s.name}</span>
            </a>
          ))}
        </div>

        <div className="my-5 h-px bg-border" />

        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2.5">
          <Link2 size={16} className="shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-sm text-muted-foreground">{displayUrl}</span>
          <button
            onClick={handleCopy}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 "
          >
            {copied ? <Check size={13} /> : <Link2 size={13} />}
            {copied ? "Copié" : "Copier"}
          </button>
        </div>

        <button
          onClick={handleOther}
          className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <Share2 size={14} /> Autres applications…
        </button>
      </div>
    </div >,
    document.body
  );
}