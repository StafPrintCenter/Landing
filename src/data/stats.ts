/**
 * Type aligné sur la réponse de l'API publique /stats
 */
export type APIStat = {
  id: string;
  key: string;
  value: number;
  suffix: string;
  label: string;
};