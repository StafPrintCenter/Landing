import type { DraftConfig, DraftMeta, DraftRecord } from "./types";

const STORAGE_PREFIX = "spc:draft:";
const DEFAULT_VERSION = 1;
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24; // 24h par défaut si non précisé par l'appelant

/**
 * Clés de champs jamais restaurées silencieusement, quel que soit le formulaire —
 * un consentement/une case légale doit toujours être reconfirmé(e) explicitement
 * par l'utilisateur, jamais réappliqué automatiquement depuis un brouillon.
 */
const ALWAYS_EXCLUDED_PATTERN = /consent|privacy|accepted|programRead/i;

function storageKey(formId: string): string {
  return `${STORAGE_PREFIX}${formId}`;
}

function isFileLike(value: unknown): boolean {
  return typeof File !== "undefined" && value instanceof File;
}

/**
 * Nettoie un objet de formulaire avant sauvegarde :
 * - retire les fichiers (non sérialisables) et les clés exclues explicitement/implicitement
 * - reste volontairement simple (un seul niveau + tableaux de primitives), suffisant
 *   pour les formulaires de ce projet (pas d'objets imbriqués complexes)
 */
function sanitizeForStorage<T extends Record<string, unknown>>(
  data: T,
  excludeFields: string[]
): { data: Partial<T>; hadStrippedFields: boolean } {
  const cleaned: Partial<T> = {};
  let hadStrippedFields = false;

  for (const [key, value] of Object.entries(data)) {
    if (excludeFields.includes(key) || ALWAYS_EXCLUDED_PATTERN.test(key)) {
      continue;
    }

    if (isFileLike(value)) {
      hadStrippedFields = true;
      continue;
    }

    if (Array.isArray(value)) {
      const filtered = value.filter((v) => !isFileLike(v));
      if (filtered.length !== value.length) hadStrippedFields = true;
      (cleaned as Record<string, unknown>)[key] = filtered;
      continue;
    }

    (cleaned as Record<string, unknown>)[key] = value;
  }

  return { data: cleaned, hadStrippedFields };
}

/**
 * Sauvegarde l'état courant d'un formulaire comme brouillon.
 * Échoue silencieusement (log console) en cas de quota localStorage dépassé —
 * un brouillon perdu ne doit jamais faire planter le formulaire.
 */
export function saveDraft<T extends Record<string, unknown>>(config: DraftConfig, data: T): void {
  if (typeof window === "undefined") return;

  const version = config.version ?? DEFAULT_VERSION;
  const ttlMs = config.ttlMs ?? DEFAULT_TTL_MS;
  const now = Date.now();

  const { data: cleaned, hadStrippedFields } = sanitizeForStorage(data, config.excludeFields ?? []);

  const record: DraftRecord<T> = {
    version,
    savedAt: now,
    expiresAt: now + ttlMs,
    data: cleaned,
    hadStrippedFields,
  };

  try {
    window.localStorage.setItem(storageKey(config.formId), JSON.stringify(record));
  } catch {
    // Quota dépassé ou stockage indisponible (navigation privée stricte, etc.) —
    // le brouillon est un confort, pas une garantie ; on ignore sans bloquer l'utilisateur.
  }
}

/**
 * Restaure un brouillon s'il existe, correspond à la version attendue, et n'a pas expiré.
 * Nettoie automatiquement (supprime) tout brouillon invalide rencontré au passage.
 */
export function restoreDraft<T extends Record<string, unknown>>(config: DraftConfig): DraftRecord<T> | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(storageKey(config.formId));
  if (!raw) return null;

  let record: DraftRecord<T>;
  try {
    record = JSON.parse(raw);
  } catch {
    clearDraft(config.formId);
    return null;
  }

  const expectedVersion = config.version ?? DEFAULT_VERSION;
  const isExpired = Date.now() > record.expiresAt;
  const isWrongVersion = record.version !== expectedVersion;

  if (isExpired || isWrongVersion) {
    clearDraft(config.formId);
    return null;
  }

  return record;
}

export function clearDraft(formId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKey(formId));
}

/**
 * Vérifie l'existence d'un brouillon valide sans le charger en entier —
 * utile pour afficher une bannière "Reprendre où vous en étiez ?" au montage.
 */
export function hasValidDraft(config: DraftConfig): boolean {
  return restoreDraft(config) !== null;
}

export function getDraftMeta(config: DraftConfig): DraftMeta | null {
  const record = restoreDraft(config);
  if (!record) return null;
  return {
    savedAt: record.savedAt,
    expiresAt: record.expiresAt,
    hadStrippedFields: record.hadStrippedFields,
  };
}

/** Formatte un timestamp de sauvegarde en texte relatif lisible ("il y a 3 minutes") */
export function formatDraftAge(savedAt: number): string {
  const diffMs = Date.now() - savedAt;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "à l'instant";
  if (diffMin < 60) return `il y a ${diffMin} minute${diffMin > 1 ? "s" : ""}`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH} heure${diffH > 1 ? "s" : ""}`;
  const diffDays = Math.floor(diffH / 24);
  return `il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
}
