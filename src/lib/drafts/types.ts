export interface DraftConfig {
  /** Identifiant unique du formulaire (ex: "contact-form", "review-{formId}") */
  formId: string;
  /** Incrémenter cette valeur invalide automatiquement les anciens brouillons
   * quand la structure du formulaire change (nouveau champ, champ retiré...) */
  version?: number;
  /** Durée de vie du brouillon en millisecondes avant expiration automatique */
  ttlMs?: number;
  /** Clés à ne jamais sauvegarder (en plus des champs de consentement, exclus par défaut) */
  excludeFields?: string[];
}

export interface DraftRecord<T> {
  version: number;
  savedAt: number;
  expiresAt: number;
  data: Partial<T>;
  /** true si un ou plusieurs champs (ex: fichiers) ont dû être retirés à la sauvegarde */
  hadStrippedFields: boolean;
}

export interface DraftMeta {
  savedAt: number;
  expiresAt: number;
  hadStrippedFields: boolean;
}
