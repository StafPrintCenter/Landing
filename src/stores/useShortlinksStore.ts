import { type APIShortlink } from "@/data/shortlinks";

type ShortlinkResponse = { data: APIShortlink };

/**
 * Vérifie si un lien court existe déjà pour cette URL longue.
 * GET pur, sans effet de bord — safe à appeler de façon spéculative.
 * Retourne null si aucun lien court n'existe encore (404).
 */
export async function resolveShortlink(longUrl: string): Promise<APIShortlink | null> {
  const params = new URLSearchParams({ long_url: longUrl });
  const response = await fetch(`/api/public/shortlinks/resolve?${params.toString()}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("Erreur lors de la résolution du lien court");
  }
  const json: ShortlinkResponse = await response.json();
  return json.data;
}

/**
 * Crée un lien court pour cette URL longue. Le backend gère lui-même
 * la déduplication (rappelle un lien existant si déjà créé) — le client
 * n'a pas à vérifier l'existence avant d'appeler cette fonction.
 */
export async function createShortlink(longUrl: string, category: string): Promise<APIShortlink> {
  const formData = new FormData();
  formData.append("long_url", longUrl);
  formData.append("category", category);

  const response = await fetch(`/api/public/shortlinks/create`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du lien court");
  }
  const json: ShortlinkResponse = await response.json();
  return json.data;
}