/**
 * Type aligné sur la réponse de l'API publique /testimonials
 */
export type APITestimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
};

/**
 * Retourne les initiales (max 2 lettres) à partir d'un nom complet
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}