// src/lib/file-url.ts
export function resolveStorageUrl(url: string | null): string | null {
  if (!url) return null;

  // Remplace http://localhost:8000/storage ou https://mon-backend.com/storage par /storage
  return url.replace(/^https?:\/\/[^\/]+\/storage\//, "/storage/");
}