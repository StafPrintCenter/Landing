import { useCallback, useEffect, useRef, useState } from "react";
import { saveDraft, restoreDraft, clearDraft, hasValidDraft, formatDraftAge } from "@/lib/drafts/draft-manager";
import type { DraftConfig } from "@/lib/drafts/types";

export interface UseFormDraftOptions<T extends Record<string, unknown>> extends DraftConfig {
  /** État courant du formulaire — surveillé pour déclencher la sauvegarde automatique */
  values: T;
  /** Désactive complètement la sauvegarde (ex: après soumission réussie) */
  enabled?: boolean;
  /** Délai de debounce avant sauvegarde après la dernière frappe (ms) */
  debounceMs?: number;
  /** Détermine si "values" est encore vierge — évite de sauvegarder un brouillon vide/bruité.
   * Par défaut : true si toutes les valeurs sont vides ("", null, undefined, tableau vide). */
  isEmpty?: (values: T) => boolean;
}

function defaultIsEmpty<T extends Record<string, unknown>>(values: T): boolean {
  return Object.values(values).every((v) => {
    if (v === null || v === undefined || v === "") return true;
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === "boolean") return v === false;
    return false;
  });
}

export function useFormDraft<T extends Record<string, unknown>>(options: UseFormDraftOptions<T>) {
  const { formId, version, ttlMs, excludeFields, values, enabled = true, debounceMs = 800, isEmpty } = options;

  const [draftAvailable, setDraftAvailable] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config: DraftConfig = { formId, version, ttlMs, excludeFields };

  // Vérifie la présence d'un brouillon valide une seule fois, au montage.
  useEffect(() => {
    setDraftAvailable(hasValidDraft(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  // Sauvegarde automatique, debouncée, tant que le formulaire n'est pas vide.
  useEffect(() => {
    if (!enabled) return;

    const checkEmpty = isEmpty ?? defaultIsEmpty;
    if (checkEmpty(values)) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      saveDraft(config, values);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, enabled, debounceMs]);

  const restore = useCallback((): Partial<T> | null => {
    const record = restoreDraft<T>(config);
    setDraftAvailable(false);
    return record?.data ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  const discard = useCallback(() => {
    clearDraft(formId);
    setDraftAvailable(false);
  }, [formId]);

  const getSavedAgeLabel = useCallback((): string | null => {
    const record = restoreDraft<T>(config);
    return record ? formatDraftAge(record.savedAt) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  return {
    /** true si un brouillon valide existe et n'a pas encore été restauré/ignoré */
    draftAvailable,
    /** Récupère les données du brouillon (à appliquer manuellement via reset()/setState) */
    restoreDraft: restore,
    /** Supprime le brouillon (ex: après soumission réussie, ou refus explicite de l'utilisateur) */
    discardDraft: discard,
    /** Texte relatif du moment de la dernière sauvegarde, pour affichage */
    getSavedAgeLabel,
  };
}