export interface ShareContent {
  url: string;
  title: string;
  text?: string;
}

export function buildWhatsAppShareLink({ url, title, text }: ShareContent) {
  const message = [text ?? title, url].filter(Boolean).join("\n\n");
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function buildFacebookShareLink({ url }: ShareContent) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function buildLinkedInShareLink({ url }: ShareContent) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

export function buildTwitterShareLink({ url, title }: ShareContent) {
  const params = new URLSearchParams({ url, text: title });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function canUseNativeShare() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function nativeShare({ url, title, text }: ShareContent) {
  if (!canUseNativeShare()) return false;
  try {
    await navigator.share({ url, title, text });
    return true;
  } catch {
    // L'utilisateur a annulé, ou l'API a échoué silencieusement
    return false;
  }
}

export async function copyShareLink(url: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      // fallback ci-dessous
    }
  }
  if (typeof document === "undefined") return false;
  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
  return success;
}