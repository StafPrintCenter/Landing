import { useState } from "react";
import { Facebook, Linkedin, Twitter, Share2, Link2, Check, Loader2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/icons/WhatsAppIcon";
import { useShortUrl } from "@/hooks/use-short-url";
import { QrCodeAutoPanel } from "./QrCodeAutoPanel";
import { BaseModal, ModalHeader } from "./";
import type { ShortlinkCategory } from "@/data/shortlinks";
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
  shortlinkCategory?: ShortlinkCategory;
}

export function ShareModal({ url, title, text, isOpen, onClose, shortlinkCategory }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const { displayUrl, alias, isLoading } = useShortUrl(url, shortlinkCategory);

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
    { name: "WhatsApp", icon: <WhatsAppIcon size={20} />, href: buildWhatsAppShareLink(content), className: "bg-[#25D366] text-white" },
    { name: "Facebook", icon: <Facebook size={20} />, href: buildFacebookShareLink(content), className: "bg-[#1877F2] text-white" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: buildLinkedInShareLink(content), className: "bg-[#0A66C2] text-white" },
    { name: "Twitter / X", icon: <Twitter size={20} />, href: buildTwitterShareLink(content), className: "bg-black text-white" },
  ];

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose} maxWidthClassName="max-w-md">
        <div className="p-6">
          <ModalHeader title="Partager" icon={Share2} onClose={onClose} />

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
            {isLoading ? (
              <span className="h-4 flex-1 animate-pulse rounded bg-muted-foreground/20" />
            ) : (
              <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{displayUrl}</span>
            )}
            <button
              onClick={handleCopy}
              disabled={isLoading}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={13} className="animate-spin" />
              ) : copied ? (
                <Check size={13} />
              ) : (
                <Link2 size={13} />
              )}
              {isLoading ? "Traitement…" : copied ? "Copié" : "Copier"}
            </button>
          </div>

          <button
            onClick={handleOther}
            disabled={isLoading}
            className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Share2 size={14} /> Autres applications…
          </button>
        </div>
      </BaseModal >

      {isOpen && <QrCodeAutoPanel alias={alias} />}
    </>
  );
}